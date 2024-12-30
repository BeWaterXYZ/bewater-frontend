import { parse } from 'csv-parse';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import { config } from 'dotenv';

// Load environment variables
config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  console.error('Please set GITHUB_TOKEN in .env file');
  process.exit(1);
}

// Types
const COLUMN_INDICES = {
  ORG_NAME: 0,
  ORG_TOPIC: 1,
  PROJECT_NAME: 2,
  PROJECT_TOPIC: 3,
  BUILDER_NAME: 4,
  BUILDER_TOPIC: 5
};

interface CsvRow {
  'Github Organizations': string;
  'Topics': string;
  'Github Projects': string;
  'Topics.1': string;
  'Github Builders': string;
  'Topics.2': string;
}

interface GithubRepo {
  full_name: string;
  name: string;
  description: string | null;
  language: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  contributors_url: string;
  archived: boolean;
  owner: {
    login: string;
  };
}

interface GithubUser {
  html_url: string;
  avatar_url: string;
  login: string;
  name: string | null;
  bio: string | null;
  company: string | null;
  location: string | null;
  email: string | null;
  twitter_username: string | null;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
  updated_at: string;
}

interface Developer extends GithubUser {
  total_stars: number;
  popular_repo: any | null;
  ecosystems: string[];
  sectors: string[];
}

interface Contributor {
  login: string;
  avatar_url: string;
}

// Add new interfaces
interface RankingTag {
  name: string;
  type: 'ECOSYSTEM' | 'SECTOR';
}

// Add request statistics
interface RequestStats {
  total: number;
  successful: number;
  failed: number;
  byEndpoint: Map<string, number>;
}

const stats: RequestStats = {
  total: 0,
  successful: 0,
  failed: 0,
  byEndpoint: new Map()
};

// Add developers array to global scope
const developers: any[] = [];

// Helper function to extract endpoint from URL
function getEndpoint(url: string): string {
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
function extractGithubName(url: string): string | null {
  if (!url) return null;
  const match = url.match(/github\.com\/([^\/]+)/);
  return match ? match[1] : null;
}

// Helper function to extract repo full name from GitHub URL
function extractRepoFullName(url: string): string | null {
  if (!url) return null;
  const match = url.match(/github\.com\/([^\/]+\/[^\/]+)/);
  return match ? match[1] : null;
}

// Add TokenManager class before the Types section
class TokenManager {
  private tokens: string[];
  private currentTokenIndex: number = 0;
  private tokenUsage: Map<string, number> = new Map();
  private tokenStatus: Map<string, boolean> = new Map();
  private rateLimitInfo: Map<string, {
    remaining: number;
    reset: number;
    lastCheck: number;
  }> = new Map();

  constructor(tokens: string[]) {
    this.tokens = tokens;
    tokens.forEach(token => {
      this.tokenUsage.set(token, 0);
      this.tokenStatus.set(token, true);
    });
  }

  private shouldCheckStatus(token: string): boolean {
    const info = this.rateLimitInfo.get(token);
    if (!info) return true;

    const now = Date.now();
    // 只在到达重置时间时才需要重新检查
    return now >= info.reset * 1000;
  }

  getCurrentToken(): string {
    return this.tokens[this.currentTokenIndex];
  }

  rotateToken(): string {
    const startIndex = this.currentTokenIndex;
    let attempts = 0;
    
    do {
      this.currentTokenIndex = (this.currentTokenIndex + 1) % this.tokens.length;
      attempts++;
      
      // If we've tried all tokens, reset their status and try again
      if (attempts === this.tokens.length) {
        console.log('Resetting all token statuses and trying again...');
        this.tokens.forEach(token => this.tokenStatus.set(token, true));
      }
      
      // If we've gone through all tokens twice, throw an error
      if (attempts >= this.tokens.length * 2) {
        throw new Error('All tokens are exhausted and reset attempt failed');
      }
    } while (!this.tokenStatus.get(this.getCurrentToken()) && attempts < this.tokens.length * 2);
    
    console.log(`Rotated to token: ${this.getCurrentToken().slice(0, 8)}...${this.getCurrentToken().slice(-8)}`);
    return this.getCurrentToken();
  }

  async handleRateLimitError(token: string): Promise<boolean> {
    console.log(`Checking rate limit status for token ${token.slice(0, 8)}...${token.slice(-8)}`);
    try {
      const response = await axios.get('https://api.github.com/rate_limit', {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });
      const { remaining, reset } = response.data.resources.core;
      const now = Date.now();

      // 更新缓存
      this.rateLimitInfo.set(token, {
        remaining,
        reset,
        lastCheck: now
      });

      const isValid = remaining > RATE_LIMIT_BUFFER;
      this.tokenStatus.set(token, isValid);

      const resetTime = new Date(reset * 1000);
      console.log(`Token ${token.slice(0, 8)}...${token.slice(-8)} has ${remaining} requests remaining, resets at ${resetTime.toLocaleString()}`);

      return isValid;
    } catch (error) {
      console.error(`Error checking token status: ${token.slice(0, 8)}...${token.slice(-8)}`, error);
      this.tokenStatus.set(token, false);
      return false;
    }
  }

  async getValidToken(): Promise<string> {
    const startIndex = this.currentTokenIndex;
    let attempts = 0;
    
    do {
      const currentToken = this.getCurrentToken();
      const info = this.rateLimitInfo.get(currentToken);
      
      // 如果有缓存的信息并且还没到重置时间，直接使用缓存的状态
      if (info && Date.now() < info.reset * 1000) {
        if (info.remaining > RATE_LIMIT_BUFFER) {
          return currentToken;
        }
      } else if (await this.handleRateLimitError(currentToken)) {
        return currentToken;
      }
      
      console.log(`Token ${currentToken.slice(0, 8)}...${currentToken.slice(-8)} is not valid, rotating...`);
      this.rotateToken();
      attempts++;
      
      // If we've tried all tokens, wait a bit before trying again
      if (attempts === this.tokens.length) {
        const nextReset = Math.min(...Array.from(this.rateLimitInfo.values()).map(info => info.reset * 1000));
        const waitTime = Math.max(0, nextReset - Date.now());
        if (waitTime > 0) {
          console.log(`All tokens exhausted, waiting ${Math.ceil(waitTime / 1000)} seconds until next reset...`);
          await new Promise(resolve => setTimeout(resolve, waitTime + 1000));
        }
      }
      
      // If we've tried too many times, throw an error
      if (attempts >= this.tokens.length * 2) {
        throw new Error('All tokens have reached their rate limits. Please wait or add more tokens.');
      }
    } while (attempts < this.tokens.length * 2);
    
    throw new Error('Failed to find a valid token after multiple attempts');
  }

  incrementTokenUsage(token: string) {
    const currentUsage = this.tokenUsage.get(token) || 0;
    this.tokenUsage.set(token, currentUsage + 1);
    
    // 更新剩余请求数的估计值
    const info = this.rateLimitInfo.get(token);
    if (info) {
      info.remaining = Math.max(0, info.remaining - 1);
    }
    
    // Log token usage every 100 requests
    if (currentUsage % 100 === 0) {
      console.log(`\nToken Usage Update (${new Date().toLocaleString()}):`);
      console.log(this.getTokenUsageStats());
    }
  }

  getTokenUsageStats(): string {
    return Array.from(this.tokenUsage.entries())
      .map(([token, usage]) => {
        const info = this.rateLimitInfo.get(token);
        const status = this.tokenStatus.get(token) ? 'valid' : 'exhausted';
        const remaining = info ? `${info.remaining} remaining` : '';
        return `${token.slice(0, 8)}...${token.slice(-8)}: ${usage} requests (${status}, ${remaining})`;
      })
      .join('\n');
  }
}

// Replace the single token initialization with multiple tokens
const tokens = (process.env.GITHUB_TOKENS || process.env.GITHUB_TOKEN || '').split(',').filter(Boolean);

if (tokens.length === 0) {
  console.error('Please set GITHUB_TOKENS (comma-separated) or GITHUB_TOKEN in .env file');
  process.exit(1);
}

const tokenManager = new TokenManager(tokens);

// Update the github axios instance to use token manager
const github = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
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
  private permits: number;
  private queue: Array<() => void> = [];

  constructor(permits: number) {
    this.permits = permits;
  }

  async acquire(): Promise<void> {
    if (this.permits > 0) {
      this.permits--;
      return Promise.resolve();
    }
    return new Promise<void>(resolve => {
      this.queue.push(resolve);
    });
  }

  release(): void {
    if (this.queue.length > 0) {
      const resolve = this.queue.shift()!;
      resolve();
    } else {
      this.permits++;
    }
  }
}

const semaphore = new Semaphore(CONCURRENT_REQUESTS);

// Helper function to add delay between requests
async function delay(ms: number): Promise<void> {
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
  } catch (error) {
    console.error('Error checking rate limit:', error);
  }
}

// Helper function to handle rate limiting
async function githubRequest<T>(url: string): Promise<T> {
  await semaphore.acquire();
  const endpoint = getEndpoint(url);
  stats.total++;
  stats.byEndpoint.set(endpoint, (stats.byEndpoint.get(endpoint) || 0) + 1);
  
  console.log(`[Request #${stats.total}] ${url}`);
  
  try {
    // Get a valid token before making the request
    const token = await tokenManager.getValidToken();
    
    const response = await github.get<T>(url, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    
    tokenManager.incrementTokenUsage(token);
    stats.successful++;
    console.log(`[Success] ${url}`);
    
    await delay(REQUEST_DELAY);
    return response.data;
  } catch (error: any) {
    stats.failed++;
    
    console.error('\n=== Error Details ===');
    console.error('URL:', url);
    console.error('Status:', error.response?.status);
    console.error('Status Text:', error.response?.statusText);
    console.error('Headers:', JSON.stringify(error.response?.headers, null, 2));
    console.error('Error Message:', error.message);
    console.error('Response Data:', JSON.stringify(error.response?.data, null, 2));
    console.error('===================\n');
    
    if (error.response?.status === 403) {
      if (error.response?.data?.message?.includes('rate limit')) {
        console.log('\n=== Rate Limit Hit ===');
        // Try to rotate to next token
        try {
          await tokenManager.rotateToken();
          semaphore.release();
          return githubRequest(url);
        } catch (tokenError) {
          const resetTime = error.response.headers['x-ratelimit-reset'];
          const waitTime = (parseInt(resetTime) * 1000) - Date.now();
          console.log(`All tokens exhausted. Waiting ${Math.ceil(waitTime / 1000)} seconds...`);
          await new Promise(resolve => setTimeout(resolve, waitTime + 1000));
          semaphore.release();
          return githubRequest(url);
        }
      } else {
        console.error('403 Error but not rate limit:', error.response?.data?.message);
        throw error;
      }
    }
    
    throw error;
  } finally {
    semaphore.release();
  }
}

// Batch request helper
async function batchRequests<T>(urls: string[], batchSize = 10): Promise<T[]> {
  const results: T[] = [];
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(url => githubRequest<T>(url).catch(error => {
        console.error(`Error fetching ${url}:`, error);
        return null;
      }))
    );
    results.push(...batchResults.filter(result => result !== null) as T[]);
  }
  return results;
}

// Helper function to merge ecosystems
function mergeEcosystems(existing: string[], newEcosystem: string): string[] {
  const ecosystems = new Set(existing);
  if (newEcosystem && newEcosystem !== '') {
    ecosystems.add(newEcosystem);
  }
  return Array.from(ecosystems);
}

async function fetchRepoInfo(repoFullName: string, ecosystem: string, existingData?: any) {
  // Process requests sequentially instead of using Promise.all
  const repo = await githubRequest<GithubRepo>(`/repos/${repoFullName}`);
  await delay(REQUEST_DELAY);
  
  let contributors: Contributor[] = [];
  try {
    const response = await githubRequest<Contributor[]>(`/repos/${repoFullName}/contributors?per_page=5`);
    // 确保 response 是数组
    contributors = Array.isArray(response) ? response : [];
    
    // 获取每个贡献者的详细信息并添加到 developers 列表
    for (const contributor of contributors) {
      try {
        const userInfo = await fetchUserInfo(contributor.login, ecosystem);
        if (userInfo) {
          developers.push(userInfo);
        }
      } catch (error) {
        console.error(`Error fetching info for contributor ${contributor.login}:`, error);
      }
    }
  } catch (error: any) {
    if (error.response?.status === 403 && 
        error.response?.data?.message?.includes('too large to list contributors')) {
      console.log(`[Warning] Repository ${repoFullName} is too large to fetch contributors list. Skipping contributors.`);
      contributors = [];
    } else {
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
  } catch (error) {
    console.error(`Error creating repo info object for ${repoFullName}:`, error);
    throw error;
  }
}

async function fetchUserInfo(username: string, ecosystem: string, existingData?: any) {
  // Process requests sequentially
  const user = await githubRequest<GithubUser>(`/users/${username}`);
  await delay(REQUEST_DELAY);
  const repos = await githubRequest<GithubRepo[]>(`/users/${username}/repos?sort=stars&per_page=100`);
  
  // Calculate total stars
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  
  // Get most popular repo
  const popularRepo = repos[0];
  let languages: Array<{ name: string; percentage: number }> = [];
  
  if (popularRepo) {
    await delay(REQUEST_DELAY);
    const popularRepoLanguages = await githubRequest<Record<string, number>>(`/repos/${popularRepo.full_name}/languages`);
    
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

function escapeSQLString(str: string | null): string {
  if (str === null || str === undefined || str === 'NULL') return 'NULL';
  if (str === 'NOW()') return str;

  // Handle JSON strings specially
  if (typeof str === 'string' && (str.startsWith('{') || str.startsWith('['))) {
    try {
      // Try to parse and re-stringify to ensure valid JSON
      const jsonObj = JSON.parse(str);
      return `'${JSON.stringify(jsonObj).replace(/'/g, "''")}'`;
    } catch (e) {
      console.error('Invalid JSON:', str);
      return 'NULL';
    }
  }

  // Convert to string and handle special characters
  return `'${String(str)
    .replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
      switch (char) {
        case "'": return "''";
        case "\0": return "\\0";
        case "\x08": return "\\b";
        case "\x09": return "\\t";
        case "\x1a": return "\\z";
        case "\n": return "\\n";
        case "\r": return "\\r";
        case "\"": return '\\"';
        case "\\": return "\\\\";
        case "%": return "\\%";
        default: return char;
      }
    })
    // Additional safety replacements
    .replace(/\?/g, "\\?")
    .replace(/`/g, "\\`")}'`;
}

function safeJsonStringify(obj: any): string {
  try {
    if (obj === null || obj === undefined) return 'NULL';
    return escapeSQLString(JSON.stringify(obj));
  } catch (e) {
    console.error('Failed to stringify JSON:', e);
    return 'NULL';
  }
}

function generateDevelopersSql(developers: Developer[]): string {
  const values = developers.map(dev => {
    try {
      // Handle JSON and array fields safely
      const popularRepo = dev.popular_repo ? safeJsonStringify(dev.popular_repo) : 'NULL';
      const ecosystems = Array.isArray(dev.ecosystems) ? safeJsonStringify(dev.ecosystems) : "'[]'";
      const sectors = Array.isArray(dev.sectors) ? safeJsonStringify(dev.sectors) : "'[]'";

      // Handle numeric fields with defaults
      const followers = typeof dev.followers === 'number' ? dev.followers : 0;
      const following = typeof dev.following === 'number' ? dev.following : 0;
      const public_repos = typeof dev.public_repos === 'number' ? dev.public_repos : 0;
      const total_stars = typeof dev.total_stars === 'number' ? dev.total_stars : 0;

      return `(
      ${escapeSQLString(dev.html_url)},
      ${escapeSQLString(dev.avatar_url)},
      ${escapeSQLString(dev.login)},
      ${escapeSQLString(dev.name)},
      ${escapeSQLString(dev.bio)},
      ${escapeSQLString(dev.company)},
      ${escapeSQLString(dev.location)},
      ${escapeSQLString(dev.email)},
      ${escapeSQLString(dev.twitter_username)},
      ${followers},
      ${following},
      ${public_repos},
      ${total_stars},
      ${popularRepo},
      ${escapeSQLString(dev.created_at)},
      ${escapeSQLString(dev.updated_at)},
      ${ecosystems},
      ${sectors},
      NOW(),
      NOW()
    )`;
    } catch (e) {
      console.error('Error generating SQL for developer:', dev.login, e);
      return null;
    }
  })
  .filter(Boolean) // Remove any failed records
  .join(',\n');

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

function generateProjectSql(projects: any[]) {
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

function generateRankingTagsSql(tags: Set<string>) {
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

async function processOrganization(orgName: string, ecosystem: string) {
  console.log(`Processing organization: ${orgName}`);
  const repos = await githubRequest<GithubRepo[]>(`/orgs/${orgName}/repos?per_page=100`);
  
  // Filter out archived repos
  const activeRepos = repos.filter(repo => !repo.archived);
  console.log(`Found ${repos.length} total repos, ${activeRepos.length} active repos in ${orgName}`);
  
  // 使用批量处理而不是串行处理
  const repoInfos = [];
  const batchSize = 5; // 每批处理5个仓库
  
  for (let i = 0; i < activeRepos.length; i += batchSize) {
    const batch = activeRepos.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(async repo => {
        try {
          return await fetchRepoInfo(repo.full_name, ecosystem);
        } catch (error) {
          console.error(`Error processing repo ${repo.full_name}:`, error);
          return null;
        }
      })
    );
    repoInfos.push(...batchResults.filter(result => result !== null));
  }
  
  return repoInfos;
}

async function main() {
  console.log('Starting GitHub data sync...\n');
  console.log(`Using ${tokens.length} GitHub tokens\n`);
  
  // Create SQL output directory
  const sqlOutputDir = path.join(process.cwd(), 'sql_output');
  if (!fs.existsSync(sqlOutputDir)) {
    fs.mkdirSync(sqlOutputDir);
  }

  // Check initial rate limit status for all tokens
  console.log('\n=== Initial Rate Limit Status ===');
  let hasValidToken = false;

  for (const token of tokens) {
    try {
      const response = await axios.get('https://api.github.com/rate_limit', {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
        }
      });
      const { resources } = response.data;
      const tokenPreview = `${token.slice(0, 8)}...${token.slice(-8)}`;
      
      console.log(`\nToken: ${tokenPreview}`);
      console.log('Core API:');
      console.log(`  Total limit: ${resources.core.limit}`);
      console.log(`  Remaining: ${resources.core.remaining}`);
      console.log(`  Reset time: ${new Date(resources.core.reset * 1000).toLocaleString()}`);
      console.log('Search API:');
      console.log(`  Total limit: ${resources.search.limit}`);
      console.log(`  Remaining: ${resources.search.remaining}`);
      console.log(`  Reset time: ${new Date(resources.search.reset * 1000).toLocaleString()}`);

      if (resources.core.remaining >= 100) {
        hasValidToken = true;
      }
    } catch (error: any) {
      console.error(`Error checking rate limit for token ${token.slice(0, 8)}...${token.slice(-8)}:`, error.message);
    }
  }
  console.log('===============================\n');

  if (!hasValidToken) {
    console.error('All tokens have insufficient remaining requests. Please wait until the reset time or use different tokens.');
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

  const parser = fs.createReadStream(path.resolve(csvFile)).pipe(
    parse({
      columns: false,
      skip_empty_lines: true,
      trim: true,
      relaxColumnCount: true // 添加这个选项以处理可能的列数不一致
    })
  );

  const projects: any[] = [];
  const processedUrls = new Set<string>();
  const processedUsers = new Set<string>(); // 添加用户去重
  const ecosystemTags = new Set<string>();

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
      row[COLUMN_INDICES.ORG_TOPIC],
      row[COLUMN_INDICES.PROJECT_TOPIC],
      row[COLUMN_INDICES.BUILDER_TOPIC]
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
        orgName ? processOrganization(orgName, row[COLUMN_INDICES.ORG_TOPIC] || '').catch(error => {
          console.error(`Error processing organization ${orgName}:`, error);
          return [];
        }) : Promise.resolve([]),
        
        projectFullName ? (async () => {
          const repoInfo = await githubRequest<GithubRepo>(`/repos/${projectFullName}`);
          if (repoInfo.archived) {
            console.log(`Skipping archived project: ${projectFullName}`);
            return null;
          }
          return fetchRepoInfo(projectFullName, row[COLUMN_INDICES.PROJECT_TOPIC] || row[COLUMN_INDICES.ORG_TOPIC] || '');
        })().catch(error => {
          console.error(`Error processing project ${projectFullName}:`, error);
          return null;
        }) : Promise.resolve(null),
        
        username ? fetchUserInfo(username, row[COLUMN_INDICES.BUILDER_TOPIC] || row[COLUMN_INDICES.ORG_TOPIC] || '').catch(error => {
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
      
    } catch (error) {
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
    const developerSql = generateDevelopersSql(uniqueDevelopers);
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
    developers.length > 0 ? generateDevelopersSql(developers) : '',
    '\n-- Ranking Tags SQL',
    tagsSql
  ].join('\n');
  
  fs.writeFileSync(path.join(sqlOutputDir, 'combined.sql'), combinedSql);
  console.log('Generated combined SQL file');
  
  console.log('\n=== Token Usage Statistics ===');
  console.log(tokenManager.getTokenUsageStats());
  console.log('============================\n');
  
  console.log('\nSQL files have been saved to:', sqlOutputDir);
  console.log('\nSync completed!');
}

main().catch(console.error); 