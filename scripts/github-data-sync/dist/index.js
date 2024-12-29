"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const csv_parse_1 = require("csv-parse");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = require("dotenv");
// Load environment variables
(0, dotenv_1.config)();
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) {
    console.error('Please set GITHUB_TOKEN in .env file');
    process.exit(1);
}
// Types
const COLUMN_INDICES = {
    ORG_NAME: 0,
    ORG_TAG: 1,
    PROJECT_NAME: 2,
    PROJECT_TAG: 3,
    BUILDER_NAME: 4,
    BUILDER_TAG: 5
};
const stats = {
    total: 0,
    successful: 0,
    failed: 0,
    byEndpoint: new Map()
};
// Add developers array to global scope
const developers = [];
// Helper function to extract endpoint from URL
function getEndpoint(url) {
    // Convert URL like '/repos/owner/repo' to '/repos'
    return '/' + url.split('/')[1];
}
// Helper function to print stats
function printStats() {
    console.log('\n=== GitHub API Request Statistics ===');
    console.log(`Total requests: ${stats.total}`);
    console.log(`Successful requests: ${stats.successful}`);
    console.log(`Failed requests: ${stats.failed}`);
    console.log('\nRequests by endpoint:');
    stats.byEndpoint.forEach((count, endpoint) => {
        console.log(`  ${endpoint}: ${count} requests`);
    });
    console.log('==================================\n');
}
// Helper function to extract username/org name from GitHub URL
function extractGithubName(url) {
    if (!url)
        return null;
    const match = url.match(/github\.com\/([^\/]+)/);
    return match ? match[1] : null;
}
// Helper function to extract repo full name from GitHub URL
function extractRepoFullName(url) {
    if (!url)
        return null;
    const match = url.match(/github\.com\/([^\/]+\/[^\/]+)/);
    return match ? match[1] : null;
}
// GitHub API client with rate limiting
const github = axios_1.default.create({
    baseURL: 'https://api.github.com',
    headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
    },
});
// Add rate limit tracking
let requestCount = 0;
const MAX_REQUESTS_PER_HOUR = 5000;
const RATE_LIMIT_BUFFER = 100; // Buffer to prevent hitting the limit
// Add rate limiting constants
const CONCURRENT_REQUESTS = 5; // 增加到5个并发请求
const REQUEST_DELAY = 200; // 减少到200毫秒
// Add semaphore for concurrency control
class Semaphore {
    constructor(permits) {
        this.queue = [];
        this.permits = permits;
    }
    async acquire() {
        if (this.permits > 0) {
            this.permits--;
            return Promise.resolve();
        }
        return new Promise(resolve => {
            this.queue.push(resolve);
        });
    }
    release() {
        if (this.queue.length > 0) {
            const resolve = this.queue.shift();
            resolve();
        }
        else {
            this.permits++;
        }
    }
}
const semaphore = new Semaphore(CONCURRENT_REQUESTS);
// Helper function to add delay between requests
async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// Helper function to track rate limits
async function checkRateLimit() {
    try {
        const response = await github.get('/rate_limit');
        const { remaining, reset, limit } = response.data.rate;
        console.log(`\n=== Rate Limit Status ===`);
        console.log(`Total limit: ${limit}`);
        console.log(`Remaining: ${remaining}`);
        console.log(`Reset time: ${new Date(reset * 1000).toLocaleString()}`);
        console.log(`========================\n`);
        if (remaining < RATE_LIMIT_BUFFER) {
            const waitTime = (reset * 1000) - Date.now();
            console.log(`Rate limit low. Waiting ${Math.ceil(waitTime / 1000)} seconds...`);
            await new Promise(resolve => setTimeout(resolve, waitTime + 1000));
        }
    }
    catch (error) {
        console.error('Error checking rate limit:', error);
    }
}
// Helper function to handle rate limiting
async function githubRequest(url) {
    await semaphore.acquire();
    const endpoint = getEndpoint(url);
    stats.total++;
    stats.byEndpoint.set(endpoint, (stats.byEndpoint.get(endpoint) || 0) + 1);
    console.log(`[Request #${stats.total}] ${url}`);
    try {
        // Check rate limit every 100 requests
        if (++requestCount % 100 === 0) {
            await checkRateLimit();
        }
        const response = await github.get(url);
        stats.successful++;
        console.log(`[Success] ${url}`);
        // Add delay between requests
        await delay(REQUEST_DELAY);
        return response.data;
    }
    catch (error) {
        stats.failed++;
        // Log the complete error response
        console.error('\n=== Error Details ===');
        console.error('URL:', url);
        console.error('Status:', error.response?.status);
        console.error('Status Text:', error.response?.statusText);
        console.error('Headers:', JSON.stringify(error.response?.headers, null, 2));
        console.error('Error Message:', error.message);
        console.error('Response Data:', JSON.stringify(error.response?.data, null, 2));
        console.error('===================\n');
        if (error.response?.status === 403) {
            // Check if it's actually a rate limit error
            if (error.response?.data?.message?.includes('rate limit')) {
                const resetTime = error.response.headers['x-ratelimit-reset'];
                const remaining = error.response.headers['x-ratelimit-remaining'];
                const limit = error.response.headers['x-ratelimit-limit'];
                console.log(`\n=== Rate Limit Hit ===`);
                console.log(`Total limit: ${limit}`);
                console.log(`Remaining: ${remaining}`);
                console.log(`Reset time: ${new Date(parseInt(resetTime) * 1000).toLocaleString()}`);
                const waitTime = (parseInt(resetTime) * 1000) - Date.now();
                console.log(`Waiting ${Math.ceil(waitTime / 1000)} seconds...`);
                console.log(`========================\n`);
                // Wait for the full reset time
                await new Promise(resolve => setTimeout(resolve, waitTime + 1000));
                semaphore.release();
                return githubRequest(url);
            }
            else {
                // If it's a different kind of 403 error
                console.error('403 Error but not rate limit:', error.response?.data?.message);
                throw error;
            }
        }
        throw error;
    }
    finally {
        semaphore.release();
    }
}
// Batch request helper
async function batchRequests(urls, batchSize = 10) {
    const results = [];
    for (let i = 0; i < urls.length; i += batchSize) {
        const batch = urls.slice(i, i + batchSize);
        const batchResults = await Promise.all(batch.map(url => githubRequest(url).catch(error => {
            console.error(`Error fetching ${url}:`, error);
            return null;
        })));
        results.push(...batchResults.filter(result => result !== null));
    }
    return results;
}
// Helper function to merge ecosystems
function mergeEcosystems(existing, newEcosystem) {
    const ecosystems = new Set(existing);
    if (newEcosystem && newEcosystem !== '') {
        ecosystems.add(newEcosystem);
    }
    return Array.from(ecosystems);
}
async function fetchRepoInfo(repoFullName, ecosystem, existingData) {
    // Process requests sequentially instead of using Promise.all
    const repo = await githubRequest(`/repos/${repoFullName}`);
    await delay(REQUEST_DELAY);
    let contributors = [];
    try {
        const response = await githubRequest(`/repos/${repoFullName}/contributors?per_page=5`);
        // 确保 response 是数组
        contributors = Array.isArray(response) ? response : [];
        // 获取每个贡献者的详细信息并添加到 developers 列表
        for (const contributor of contributors) {
            try {
                const userInfo = await fetchUserInfo(contributor.login, ecosystem);
                if (userInfo) {
                    developers.push(userInfo);
                }
            }
            catch (error) {
                console.error(`Error fetching info for contributor ${contributor.login}:`, error);
            }
        }
    }
    catch (error) {
        if (error.response?.status === 403 &&
            error.response?.data?.message?.includes('too large to list contributors')) {
            console.log(`[Warning] Repository ${repoFullName} is too large to fetch contributors list. Skipping contributors.`);
            contributors = [];
        }
        else {
            console.error(`Error fetching contributors for ${repoFullName}:`, error.response?.data?.message || error.message);
            contributors = [];
        }
    }
    // Parse existing ecosystems if available
    const existingEcosystems = existingData?.ecosystems ? JSON.parse(existingData.ecosystems) : [];
    const updatedEcosystems = mergeEcosystems(existingEcosystems, ecosystem);
    try {
        return {
            repoUrl: `https://github.com/${repoFullName}`,
            repoName: repo.full_name,
            name: repo.name,
            description: repo.description,
            languages: JSON.stringify([repo.language]),
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            topics: JSON.stringify(repo.topics || []),
            contributors: JSON.stringify(contributors.map(c => ({
                login: c.login,
                avatar_url: c.avatar_url
            })) || []),
            updated_at: repo.updated_at,
            created_at: existingData?.created_at || new Date().toISOString(),
            ecosystems: JSON.stringify(updatedEcosystems),
            sectors: existingData?.sectors || '[]'
        };
    }
    catch (error) {
        console.error(`Error creating repo info object for ${repoFullName}:`, error);
        throw error;
    }
}
async function fetchUserInfo(username, ecosystem, existingData) {
    // Process requests sequentially
    const user = await githubRequest(`/users/${username}`);
    await delay(REQUEST_DELAY);
    const repos = await githubRequest(`/users/${username}/repos?sort=stars&per_page=100`);
    // Calculate total stars
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    // Get most popular repo
    const popularRepo = repos[0];
    let languages = [];
    if (popularRepo) {
        await delay(REQUEST_DELAY);
        const popularRepoLanguages = await githubRequest(`/repos/${popularRepo.full_name}/languages`);
        // Calculate language percentages
        const totalBytes = Object.values(popularRepoLanguages).reduce((a, b) => a + b, 0);
        languages = Object.entries(popularRepoLanguages)
            .map(([name, bytes]) => ({
            name,
            percentage: Math.round((bytes / totalBytes) * 100)
        }))
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 3);
    }
    // Parse existing ecosystems if available
    const existingEcosystems = existingData?.ecosystems ? JSON.parse(existingData.ecosystems) : [];
    const updatedEcosystems = mergeEcosystems(existingEcosystems, ecosystem);
    return {
        html_url: user.html_url,
        avatar_url: user.avatar_url,
        login: user.login,
        name: user.name,
        bio: user.bio,
        company: user.company,
        location: user.location,
        email: user.email,
        twitter_username: user.twitter_username,
        followers: user.followers,
        following: user.following,
        public_repos: user.public_repos,
        total_stars: totalStars,
        popular_repo: JSON.stringify(popularRepo ? {
            html_url: `https://github.com/${popularRepo.full_name}`,
            name: popularRepo.name,
            description: popularRepo.description,
            languages
        } : null),
        created_at: existingData?.created_at || user.created_at,
        updated_at: user.updated_at,
        ecosystems: JSON.stringify(updatedEcosystems),
        sectors: existingData?.sectors || '[]'
    };
}
function generateProjectSql(projects) {
    const values = projects.map(project => {
        return `(
      '${project.repoUrl}',
      '${project.repoName}',
      '${project.name.replace(/'/g, "''")}',
      ${project.description ? `'${project.description.replace(/'/g, "''")}'` : 'NULL'},
      '${project.languages}',
      ${project.stargazers_count},
      ${project.forks_count},
      '${project.topics}',
      '${project.contributors}',
      '${project.updated_at}',
      '${project.created_at}',
      '${project.ecosystems}',
      '${project.sectors}',
      NOW(),
      NOW()
    )`;
    }).join(',\n');
    return `
INSERT INTO operationProject (
  repoUrl,
  repoName,
  name,
  description,
  languages,
  stargazers_count,
  forks_count,
  topics,
  contributors,
  updated_at,
  created_at,
  ecosystems,
  sectors,
  createdAt,
  updatedAt
) VALUES 
${values}
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  description = VALUES(description),
  languages = VALUES(languages),
  stargazers_count = VALUES(stargazers_count),
  forks_count = VALUES(forks_count),
  topics = VALUES(topics),
  contributors = VALUES(contributors),
  updated_at = VALUES(updated_at),
  ecosystems = JSON_MERGE_PRESERVE(ecosystems, VALUES(ecosystems)),
  updatedAt = NOW();
`;
}
function generateDeveloperSql(developers) {
    const values = developers.map(dev => {
        return `(
      '${dev.html_url}',
      '${dev.avatar_url}',
      '${dev.login}',
      ${dev.name ? `'${dev.name.replace(/'/g, "''")}'` : 'NULL'},
      ${dev.bio ? `'${dev.bio.replace(/'/g, "''")}'` : 'NULL'},
      ${dev.company ? `'${dev.company.replace(/'/g, "''")}'` : 'NULL'},
      ${dev.location ? `'${dev.location.replace(/'/g, "''")}'` : 'NULL'},
      ${dev.email ? `'${dev.email}'` : 'NULL'},
      ${dev.twitter_username ? `'${dev.twitter_username}'` : 'NULL'},
      ${dev.followers},
      ${dev.following},
      ${dev.public_repos},
      ${dev.total_stars},
      '${dev.popular_repo}',
      '${dev.created_at}',
      '${dev.updated_at}',
      '${dev.ecosystems}',
      '${dev.sectors}',
      NOW(),
      NOW()
    )`;
    }).join(',\n');
    return `
INSERT INTO operationDeveloper (
  html_url,
  avatar_url,
  login,
  name,
  bio,
  company,
  location,
  email,
  twitter_username,
  followers,
  following,
  public_repos,
  total_stars,
  popular_repo,
  created_at,
  updated_at,
  ecosystems,
  sectors,
  createdAt,
  updatedAt
) VALUES 
${values}
ON DUPLICATE KEY UPDATE
  avatar_url = VALUES(avatar_url),
  name = VALUES(name),
  bio = VALUES(bio),
  company = VALUES(company),
  location = VALUES(location),
  email = VALUES(email),
  twitter_username = VALUES(twitter_username),
  followers = VALUES(followers),
  following = VALUES(following),
  public_repos = VALUES(public_repos),
  total_stars = VALUES(total_stars),
  popular_repo = VALUES(popular_repo),
  updated_at = VALUES(updated_at),
  ecosystems = JSON_MERGE_PRESERVE(ecosystems, VALUES(ecosystems)),
  updatedAt = NOW();
`;
}
function generateRankingTagsSql(tags) {
    const values = Array.from(tags).map(tag => {
        return `(
      '${tag.replace(/'/g, "''")}',
      'ECOSYSTEM',
      NULL,
      NOW(),
      NOW()
    )`;
    });
    // If no tags, add a placeholder comment
    if (values.length === 0) {
        return `
-- No ranking tags to insert
-- INSERT INTO rankingTags (name, type, description, createdAt, updatedAt)
-- VALUES ... would go here
`;
    }
    return `
INSERT INTO rankingTags (
  name,
  type,
  description,
  createdAt,
  updatedAt
) VALUES 
${values.join(',\n')}
ON DUPLICATE KEY UPDATE
  updatedAt = NOW();
`;
}
async function processOrganization(orgName, ecosystem) {
    console.log(`Processing organization: ${orgName}`);
    const repos = await githubRequest(`/orgs/${orgName}/repos?per_page=100`);
    // 使用批量处理而不是串行处理
    const repoInfos = [];
    const batchSize = 5; // 每批处理5个仓库
    for (let i = 0; i < repos.length; i += batchSize) {
        const batch = repos.slice(i, i + batchSize);
        const batchResults = await Promise.all(batch.map(async (repo) => {
            try {
                return await fetchRepoInfo(repo.full_name, ecosystem);
            }
            catch (error) {
                console.error(`Error processing repo ${repo.full_name}:`, error);
                return null;
            }
        }));
        repoInfos.push(...batchResults.filter(result => result !== null));
    }
    return repoInfos;
}
async function main() {
    console.log('Starting GitHub data sync...\n');
    // Create SQL output directory
    const sqlOutputDir = path.join(process.cwd(), 'sql_output');
    if (!fs.existsSync(sqlOutputDir)) {
        fs.mkdirSync(sqlOutputDir);
    }
    // Check initial rate limit status
    try {
        const response = await github.get('/rate_limit');
        const { resources } = response.data;
        console.log('\n=== Initial Rate Limit Status ===');
        console.log('Core API:');
        console.log(`  Total limit: ${resources.core.limit}`);
        console.log(`  Remaining: ${resources.core.remaining}`);
        console.log(`  Reset time: ${new Date(resources.core.reset * 1000).toLocaleString()}`);
        console.log('\nSearch API:');
        console.log(`  Total limit: ${resources.search.limit}`);
        console.log(`  Remaining: ${resources.search.remaining}`);
        console.log(`  Reset time: ${new Date(resources.search.reset * 1000).toLocaleString()}`);
        console.log('===============================\n');
        if (resources.core.remaining < 100) {
            console.error('Token has insufficient remaining requests. Please wait until the reset time or use a different token.');
            process.exit(1);
        }
    }
    catch (error) {
        console.error('Error checking initial rate limit:', error);
        process.exit(1);
    }
    const csvFile = process.argv[2];
    if (!csvFile) {
        console.error('Please provide CSV file path as argument');
        process.exit(1);
    }
    // Read the CSV file content
    const fileContent = fs.readFileSync(path.resolve(csvFile), 'utf-8');
    console.log('CSV file content preview:');
    console.log(fileContent.split('\n').slice(0, 3).join('\n'));
    const parser = fs.createReadStream(path.resolve(csvFile)).pipe((0, csv_parse_1.parse)({
        columns: false,
        skip_empty_lines: true,
        trim: true,
        relaxColumnCount: true // 添加这个选项以处理可能的列数不一致
    }));
    const projects = [];
    const processedUrls = new Set();
    const processedUsers = new Set(); // 添加用户去重
    const ecosystemTags = new Set();
    let isFirstLine = true;
    for await (const row of parser) {
        // Skip header row
        if (isFirstLine) {
            isFirstLine = false;
            continue;
        }
        // Debug: 打印每行的内容
        console.log('Processing row:', row);
        // 收集所有的标签
        const rowTags = [
            row[COLUMN_INDICES.ORG_TAG],
            row[COLUMN_INDICES.PROJECT_TAG],
            row[COLUMN_INDICES.BUILDER_TAG]
        ].filter(tag => tag && tag.trim() !== '');
        rowTags.forEach(tag => {
            ecosystemTags.add(tag.trim());
        });
        try {
            // 并行处理组织、项目和用户
            const orgName = extractGithubName(row[COLUMN_INDICES.ORG_NAME]);
            const projectFullName = extractRepoFullName(row[COLUMN_INDICES.PROJECT_NAME]);
            const username = extractGithubName(row[COLUMN_INDICES.BUILDER_NAME]);
            // 使用对应的标签
            const [orgRepoInfos, projectInfo, userInfo] = await Promise.all([
                orgName ? processOrganization(orgName, row[COLUMN_INDICES.ORG_TAG] || '').catch(error => {
                    console.error(`Error processing organization ${orgName}:`, error);
                    return [];
                }) : Promise.resolve([]),
                projectFullName ? fetchRepoInfo(projectFullName, row[COLUMN_INDICES.PROJECT_TAG] || row[COLUMN_INDICES.ORG_TAG] || '').catch(error => {
                    console.error(`Error processing project ${projectFullName}:`, error);
                    return null;
                }) : Promise.resolve(null),
                username ? fetchUserInfo(username, row[COLUMN_INDICES.BUILDER_TAG] || row[COLUMN_INDICES.ORG_TAG] || '').catch(error => {
                    console.error(`Error processing user ${username}:`, error);
                    return null;
                }) : Promise.resolve(null)
            ]);
            // 处理组织的仓库
            for (const repoInfo of orgRepoInfos) {
                if (!processedUrls.has(repoInfo.repoName)) {
                    projects.push(repoInfo);
                    processedUrls.add(repoInfo.repoName);
                }
            }
            // 处理单个项目
            if (projectInfo && !processedUrls.has(projectInfo.repoName)) {
                projects.push(projectInfo);
                processedUrls.add(projectInfo.repoName);
            }
            // 处理用户
            if (userInfo && !processedUsers.has(userInfo.login)) {
                developers.push(userInfo);
                processedUsers.add(userInfo.login);
            }
        }
        catch (error) {
            console.error(`Error processing row:`, row, error);
        }
    }
    // Print final statistics
    printStats();
    // 去重 developers
    const uniqueDevelopers = Array.from(new Map(developers.map(dev => [dev.login, dev])).values());
    // Generate and save SQL files
    if (projects.length > 0) {
        const projectSql = generateProjectSql(projects);
        fs.writeFileSync(path.join(sqlOutputDir, 'projects.sql'), projectSql);
        console.log(`\nGenerated SQL for ${projects.length} projects`);
    }
    if (uniqueDevelopers.length > 0) {
        const developerSql = generateDeveloperSql(uniqueDevelopers);
        fs.writeFileSync(path.join(sqlOutputDir, 'developers.sql'), developerSql);
        console.log(`Generated SQL for ${uniqueDevelopers.length} developers (including contributors)`);
    }
    // Always generate ranking tags SQL, even if there are no tags
    const tagsSql = generateRankingTagsSql(ecosystemTags);
    fs.writeFileSync(path.join(sqlOutputDir, 'ranking_tags.sql'), tagsSql);
    console.log(`Generated SQL for ${ecosystemTags.size} ecosystem tags`);
    // Generate a combined SQL file
    const combinedSql = [
        '-- Projects SQL',
        projects.length > 0 ? generateProjectSql(projects) : '',
        '\n-- Developers SQL',
        developers.length > 0 ? generateDeveloperSql(developers) : '',
        '\n-- Ranking Tags SQL',
        tagsSql
    ].join('\n');
    fs.writeFileSync(path.join(sqlOutputDir, 'combined.sql'), combinedSql);
    console.log('Generated combined SQL file');
    console.log('\nSQL files have been saved to:', sqlOutputDir);
    console.log('\nSync completed!');
}
main().catch(console.error);
