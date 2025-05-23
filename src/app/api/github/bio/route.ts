import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

// 缓存实现
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 1000 * 60 * 60; // 1小时缓存

// 获取 GitHub token
const getGitHubToken = () => {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.warn('GitHub token not found in environment variables');
  }
  return token;
};

// 解析地址信息
const parseGrantAddress = (text: string): { bio: string; addresses: any[] } | null => {
  try {
    const regex = /bewater:grant:([^|]+(?:\|[^|]+)*)/;
    const match = text.match(regex);
    if (match) {
      const chainAddresses = match[1].split('|').map(pair => {
        const [chain, address] = pair.split(':');
        return { chain, address };
      });

      if (chainAddresses.length > 0) {
        return {
          bio: text,
          addresses: chainAddresses
        };
      }
    }
    return null;
  } catch (error) {
    console.error('Error parsing grant address:', error);
    return null;
  }
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  const type = searchParams.get('type') || 'bio';

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  // 生成缓存键
  const cacheKey = `${username}-${type}`;

  // 检查缓存
  const cachedData = cache.get(cacheKey);
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
    return NextResponse.json(cachedData.data);
  }

  try {
    let url: string;
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
    };

    // 添加 GitHub token 到请求头
    const token = getGitHubToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    let result: any;

    if (type === 'bio') {
      // 获取用户/组织信息
      const response = await fetch(`https://api.github.com/users/${username}`, { headers });
      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }
      const data = await response.json();
      
      if (data.type === 'Organization') {
        // 获取组织的 README 文件
        const readmeResponse = await fetch(
          `https://api.github.com/repos/${username}/${username}/readme`,
          { headers }
        );
        
        let bio = data.description || '';
        let addresses = null;

        if (readmeResponse.ok) {
          const readmeData = await readmeResponse.json();
          const readmeContent = Buffer.from(readmeData.content, 'base64').toString();
          const parsedAddresses = parseGrantAddress(readmeContent);
          if (parsedAddresses) {
            addresses = parsedAddresses.addresses;
          }
        }

        result = {
          type: 'organization',
          name: data.name,
          avatar_url: data.avatar_url,
          description: data.description,
          blog: data.blog,
          location: data.location,
          email: data.email,
          twitter_username: data.twitter_username,
          public_repos: data.public_repos,
          followers: data.followers,
          following: data.following,
          created_at: data.created_at,
          bio: bio,
          addresses: addresses
        };
      } else {
        result = {
          type: 'user',
          bio: data.bio || '',
          name: data.name,
          avatar_url: data.avatar_url,
          location: data.location,
          company: data.company,
          blog: data.blog,
          twitter_username: data.twitter_username,
          public_repos: data.public_repos,
          followers: data.followers,
          following: data.following,
          created_at: data.created_at
        };
      }
    } else if (type === 'repo') {
      const repo = searchParams.get('repo');
      if (!repo) {
        return NextResponse.json({ error: 'Repo name is required for repo type' }, { status: 400 });
      }
      url = `https://api.github.com/repos/${username}/${repo}`;
      
      const response = await fetch(url, { headers });
      if (!response.ok) {
        throw new Error('Failed to fetch repo info');
      }
      const data = await response.json();
      
      result = {
        name: data.name,
        full_name: data.full_name,
        description: data.description,
        html_url: data.html_url,
        stargazers_count: data.stargazers_count,
        watchers_count: data.watchers_count,
        forks_count: data.forks_count,
        language: data.language,
        topics: data.topics,
        default_branch: data.default_branch,
        created_at: data.created_at,
        updated_at: data.updated_at,
        owner: {
          login: data.owner.login,
          type: data.owner.type,
          avatar_url: data.owner.avatar_url
        }
      };
    } else {
      return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    }

    // 更新缓存
    cache.set(cacheKey, { data: result, timestamp: Date.now() });

    return NextResponse.json(result);
  } catch (error) {
    console.error(`Error fetching GitHub ${type}:`, error);
    
    // 如果有缓存数据，即使过期也返回
    if (cachedData) {
      return NextResponse.json(cachedData.data);
    }

    return NextResponse.json({ error: `Failed to fetch GitHub ${type}` }, { status: 500 });
  }
} 