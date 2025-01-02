import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'csv-parse';
import { fileURLToPath } from 'node:url';
import axios from 'axios';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  console.error('Please set GITHUB_TOKEN in .env file');
  process.exit(1);
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

// Add rate limiting constants
const RATE_LIMIT_BUFFER = 100;
const REQUEST_DELAY = 200;

// extract endpoint from URL
function getEndpoint(url: string): string {
  return '/' + url.split('/')[1];
}

// print stats
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

//check rate limit
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

// Create axios instance for GitHub API
const github = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `token ${GITHUB_TOKEN}`,
  },
});

// Helper function to handle GitHub requests with rate limiting and stats
async function githubRequest<T>(url: string): Promise<T> {
  const endpoint = getEndpoint(url);
  stats.total++;
  stats.byEndpoint.set(endpoint, (stats.byEndpoint.get(endpoint) || 0) + 1);
  
  console.log(`[Request #${stats.total}] ${url}`);
  
  try {
    const response = await github.get<T>(url);
    stats.successful++;
    console.log(`[Success] ${url}`);
    
    await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY));
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
    
    if (error.response?.status === 403 && error.response?.data?.message?.includes('rate limit')) {
      console.log('\n=== Rate Limit Hit ===');
      const resetTime = error.response.headers['x-ratelimit-reset'];
      const waitTime = (parseInt(resetTime) * 1000) - Date.now();
      console.log(`Waiting ${Math.ceil(waitTime / 1000)} seconds...`);
      await new Promise(resolve => setTimeout(resolve, waitTime + 1000));
      return githubRequest(url);
    }
    
    throw error;
  }
}

interface Project {
  html_url: string;
  name: string;
  full_name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  contributors: any[];
  languages: any[];
  topics: string[];
  ecosystems: string[];
  sectors: string[];
}

interface Developer {
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
  total_stars: number;
  popular_repo: any | null;
  created_at: string;
  updated_at: string;
  ecosystems: string[];
  sectors: string[];
}

async function getRepoInfo(repoUrl: string): Promise<Project | null> {
  try {
    const [owner, repo] = repoUrl
      .replace('https://github.com/', '')
      .split('/');

    // Get basic repo info
    const data = await githubRequest<any>(`/repos/${owner}/${repo}`);
    
    // Get contributors
    const contributors = await githubRequest<any[]>(`/repos/${owner}/${repo}/contributors?per_page=5`);
    const contributorsInfo = contributors.map(c => ({
      login: c.login,
      avatar_url: c.avatar_url
    }));

    // Get languages
    const languagesData = await githubRequest<Record<string, number>>(`/repos/${owner}/${repo}/languages`);
    const totalBytes = Object.values(languagesData).reduce((a, b) => a + b, 0);
    const languages = Object.entries(languagesData)
      .map(([name, bytes]) => ({
        name,
        percentage: Math.round((bytes / totalBytes) * 100)
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 3);

    return {
      html_url: data.html_url,
      name: data.name,
      full_name: data.full_name,
      description: data.description,
      created_at: data.created_at,
      updated_at: data.updated_at,
      pushed_at: data.pushed_at,
      size: data.size,
      stargazers_count: data.stargazers_count,
      watchers_count: data.watchers_count,
      forks_count: data.forks_count,
      open_issues_count: data.open_issues_count,
      contributors: contributorsInfo,
      languages,
      topics: data.topics || [],
      ecosystems: [],
      sectors: [],
    };
  } catch (error) {
    console.error(`Error fetching repo info for ${repoUrl}:`, error);
    return null;
  }
}

async function getContributors(repoUrl: string): Promise<Developer[]> {
  try {
    const [owner, repo] = repoUrl
      .replace('https://github.com/', '')
      .split('/');

    const contributors = await githubRequest<any[]>(`/repos/${owner}/${repo}/contributors?per_page=5`);
    const developers: Developer[] = [];

    for (const contributor of contributors) {
      try {
        if (!contributor.login) continue;

        const user = await githubRequest<any>(`/users/${contributor.login}`);

        developers.push({
          html_url: user.html_url || '',
          avatar_url: user.avatar_url || '',
          login: user.login || '',
          name: user.name,
          bio: user.bio,
          company: user.company,
          location: user.location,
          email: user.email,
          twitter_username: user.twitter_username || null,
          followers: user.followers || 0,
          following: user.following || 0,
          public_repos: user.public_repos || 0,
          total_stars: 0,
          popular_repo: null,
          created_at: user.created_at || new Date().toISOString(),
          updated_at: user.updated_at || new Date().toISOString(),
          ecosystems: [],
          sectors: [],
        });
      } catch (error) {
        console.error(`Error fetching user info for ${contributor.login}:`, error);
      }
    }

    return developers;
  } catch (error: any) {
    if (error.response?.status === 403 && 
        error.response?.data?.message?.includes('too large to list contributors')) {
      console.log(`[Warning] Repository ${repoUrl} is too large to fetch contributors list. Skipping contributors.`);
      return [];
    }
    console.error(`Error fetching contributors for ${repoUrl}:`, error);
    return [];
  }
}

function escapeSQLString(str: string | null): string {
  if (!str) return 'NULL';
  return `'${str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
    switch (char) {
      case "'":
        return "''";
      case "\0":
        return "\\0";
      case "\x08":
        return "\\b";
      case "\x09":
        return "\\t";
      case "\x1a":
        return "\\z";
      case "\n":
        return "\\n";
      case "\r":
        return "\\r";
      case "\"":
        return '\\"';
      case "\\":
        return "\\\\";
      case "%":
        return "\\%";
      default:
        return char;
    }
  })}'`;
}

function generateProjectsSql(projects: Project[]): string {
  const values = projects.map(project => {
    const ecosystems = project.ecosystems?.length ? `'${JSON.stringify(project.ecosystems)}'` : "'[]'";
    const sectors = project.sectors?.length ? `'${JSON.stringify(project.sectors)}'` : "'[]'";
    const contributors = project.contributors?.length ? `'${JSON.stringify(project.contributors)}'` : "'[]'";
    const languages = project.languages?.length ? `'${JSON.stringify(project.languages)}'` : "'[]'";
    const topics = project.topics?.length ? `'${JSON.stringify(project.topics)}'` : "'[]'";

    return `(
      ${escapeSQLString(project.html_url)},
      ${escapeSQLString(project.full_name)},
      ${escapeSQLString(project.name)},
      ${escapeSQLString(project.description)},
      ${languages},
      ${project.stargazers_count},
      ${project.forks_count},
      ${topics},
      ${contributors},
      ${escapeSQLString(project.updated_at)},
      ${escapeSQLString(project.created_at)},
      ${ecosystems},
      ${sectors},
      NOW(),
      NOW()
    )`;
  });

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
${values.join(',\n')}
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  description = VALUES(description),
  languages = VALUES(languages),
  stargazers_count = VALUES(stargazers_count),
  forks_count = VALUES(forks_count),
  topics = VALUES(topics),
  contributors = VALUES(contributors),
  updated_at = VALUES(updated_at),
  ecosystems = JSON_ARRAY_APPEND(
    COALESCE(ecosystems, '[]'),
    '$',
    JSON_EXTRACT(VALUES(ecosystems), '$[0]')
  ),
  sectors = JSON_ARRAY_APPEND(
    COALESCE(sectors, '[]'),
    '$',
    JSON_EXTRACT(VALUES(sectors), '$[0]')
  ),
  updatedAt = NOW();
`;
}

function generateDevelopersSql(developers: Developer[]): string {
  const values = developers.map(dev => {
    const popularRepo = dev.popular_repo ? `'${JSON.stringify(dev.popular_repo)}'` : 'NULL';
    const ecosystems = dev.ecosystems?.length ? `'${JSON.stringify(dev.ecosystems)}'` : "'[]'";
    const sectors = dev.sectors?.length ? `'${JSON.stringify(dev.sectors)}'` : "'[]'";

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
      ${dev.followers || 0},
      ${dev.following || 0},
      ${dev.public_repos || 0},
      ${dev.total_stars || 0},
      ${popularRepo},
      ${escapeSQLString(dev.created_at)},
      ${escapeSQLString(dev.updated_at)},
      ${ecosystems},
      ${sectors},
      NOW(),
      NOW()
    )`;
  });

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
${values.join(',\n')}
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
  ecosystems = JSON_ARRAY_APPEND(
    COALESCE(ecosystems, '[]'),
    '$',
    JSON_EXTRACT(VALUES(ecosystems), '$[0]')
  ),
  sectors = JSON_ARRAY_APPEND(
    COALESCE(sectors, '[]'),
    '$',
    JSON_EXTRACT(VALUES(sectors), '$[0]')
  ),
  updatedAt = NOW();
`;
}

async function main() {
  console.log('Starting GitHub data sync...\n');
  
  // Check initial rate limit
  await checkRateLimit();

  // Get CSV file path and name
  const csvPath = path.join(__dirname, '../source/new_projects_1.csv');
  const csvFileName = path.basename(csvPath, '.csv');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outputDir = path.join(__dirname, '../sql_output', `${csvFileName}_${timestamp}`);
  fs.mkdirSync(outputDir, { recursive: true });

  const projects: Project[] = [];
  const allDevelopers: Developer[] = [];
  const processedUrls = new Set<string>();

  // Read and process CSV file
  const csvData = fs.readFileSync(csvPath, 'utf-8');
  console.log('CSV file content preview:');
  console.log(csvData.split('\n').slice(0, 3).join('\n'));

  const parser = parse(csvData, { columns: true, skip_empty_lines: true });

  for await (const record of parser) {
    console.log('\nProcessing record:', record);

    const repoUrl = record['Github Projects'];
    if (processedUrls.has(repoUrl)) {
      console.log(`Skipping duplicate repo: ${repoUrl}`);
      continue;
    }
    processedUrls.add(repoUrl);

    const project = await getRepoInfo(repoUrl);
    if (!project) continue;

    // Add ecosystem and sector data
    project.ecosystems = record.Ecosystem ? [record.Ecosystem] : [];
    project.sectors = record.Sector ? [record.Sector] : [];
    projects.push(project);
    console.log(`Added project: ${project.full_name}`);

    // Get and process contributors
    console.log(`Fetching contributors for ${project.full_name}...`);
    const contributors = await getContributors(repoUrl);
    console.log(`Found ${contributors.length} contributors`);

    for (const contributor of contributors) {
      contributor.ecosystems = project.ecosystems;
      contributor.sectors = project.sectors;
      allDevelopers.push(contributor);
    }

    // Check rate limit after each project
    await checkRateLimit();
  }

  // Generate and write SQL files
  console.log('\nGenerating SQL files...');
  
  fs.writeFileSync(
    path.join(outputDir, 'projects.sql'),
    generateProjectsSql(projects)
  );
  console.log(`Generated SQL for ${projects.length} projects`);

  fs.writeFileSync(
    path.join(outputDir, 'developers.sql'),
    generateDevelopersSql(allDevelopers)
  );
  console.log(`Generated SQL for ${allDevelopers.length} developers`);

  // Print final statistics
  printStats();

  console.log(`\nProcessing complete. SQL files have been written to ${outputDir}`);
}

main().catch(console.error);