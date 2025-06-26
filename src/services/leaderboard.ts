import { agentAuthed, agentNext } from "./agent";

export interface LeaderboardProject {
  id: string;
  allow_forking: boolean;
  contributors: {
    type: string;
    login: string;
    avatar_url: string;
  }[];
  default_branch: string;
  description: string;
  fork: boolean;
  forks_count: number;
  language: string;
  languages: {
    [key: string]: number;
  };
  name: string;
  network_count: number;
  open_issues_count: number;
  owner: {
    type: string;
    login: string;
    avatar_url: string;
  };
  private: boolean;
  repoName: string;
  stargazers_count: number;
  subscribers_count: number;
  topics: string[];
  totalCommits: number;
  totalPullRequests: number;
  visibility: string;
  watchers_count: number;
  created_at: string;
  updated_at: string;
  developerId: string;
}

export interface LeaderboardDeveloper {
  id: string;
  login: string;
  type: string; // 类型：只返回个人
  name: string;
  bio: string;
  company: string;
  email: string;
  location: string;
  twitter_username: string;
  avatar_url: string;
  hireable: boolean;
  languageSum: {
    [key: string]: number;
  };
  projectArr: {
    fork: boolean;
    name: string;
    html_url: string;
    language: string;
    full_name: string;
    created_at: string;
    updated_at: string;
    visibility: string;
    description: string;
    forks_count: number;
    default_branch: string;
    watchers_count: number;
    stargazers_count: number;
  }[];
  followers: number;
  totalForksCount: number;
  totalOwnProjects: number;
  totalProjects: number;
  totalStars: number;
  totalWatchersCount: number;
  memberLength: number;
  created_at: string;
  updated_at: string;
  createdAt: string;
  updatedAt: string;
  repos?: {
    name: string;
    topics: string[];
    full_name: string;
    description: string;
    stargazers_count: number;
  }[];
}

export interface BuilderboardLanguage {
  name: string;
  percentage: number;
}

export interface BuilderboardDeveloper {
  html_url: string; // GitHub 个人主页链接
  avatar_url: string; // 头像 URL
  login: string; // GitHub 用户名
  total_stars: number; // 总 star 数
  followers: number; // 关注者数量
  bio: string | null; // 个人简介
  popular_repo: {
    // 最受欢迎的仓库
    html_url: string;
    name: string;
    description: string | null;
    languages: BuilderboardLanguage[]; // 仓库使用的语言列表
  };
}

export interface BuilderboardContributor {
  login: string;
  avatar_url: string;
}

export interface BuilderboardHackathon {
  name: string;
  url: string;
}

export interface BuilderboardProject {
  repoName: string; // 仓库全名 (owner/repo)
  name: string; // 仓库名称
  description: string; // 仓库描述
  languages: string[]; // 主要编程语言
  stargazers_count: number; // star 数量
  forks_count: number; // fork 数量
  topics: string[]; // 项目标签
  updated_at: string; // 最后更新时间
  contributors: BuilderboardContributor[]; // 贡献者列表
  tags: string[]; // 标签
  hackathons: BuilderboardHackathon[]; // 参与过的黑客松列表
}

export enum RankingTagType {
  ECOSYSTEM = "ECOSYSTEM",
  SECTOR = "SECTOR",
}

export interface RankingTag {
  id: number;
  name: string;
  type: RankingTagType;
  description?: string;
}

export async function getRankingTags() {
  const { data } = await agentAuthed.get<RankingTag[]>(
    `/billboard/ranking-tags`,
  );
  return data;
}

export async function getLeaderboardProject(limit: number) {
  const { data } = await agentAuthed.get<LeaderboardProject[]>(
    `/billboard/project-list?limit=${limit}`,
  );
  return data;
}

export async function getLeaderboardDeveloper(limit: number, language: string) {
  const { data } = await agentAuthed.get<LeaderboardDeveloper[]>(
    `/billboard/developer-list?limit=${limit}&language=${language}`,
  );
  return data;
}

export async function getBuilderboardDeveloper(
  limit?: number,
  ecosystem?: string,
  sector?: string,
  subEcosystem?: string,
): Promise<BuilderboardDeveloper[]> {
  try {
    const params = new URLSearchParams();
    if (limit) params.append("limit", limit.toString());
    if (ecosystem) params.append("ecosystem", ecosystem);
    if (sector) params.append("sector", sector);
    if (subEcosystem) params.append("subEcosystem", subEcosystem);

    const { data } = await agentAuthed.get<BuilderboardDeveloper[]>(
      `/billboard/operation/developer-list?${params.toString()}`,
    );
    return data || []; // 确保返回空数组而不是 undefined
  } catch (error) {
    console.error("Error fetching developer data:", error);
    return []; // 出错时返回空数组
  }
}

export async function getBuilderboardProject(
  limit?: number,
  ecosystem?: string,
  sector?: string,
  subEcosystem?: string,
): Promise<BuilderboardProject[]> {
  try {
    const params = new URLSearchParams();
    if (limit) params.append("limit", limit.toString());
    if (ecosystem) params.append("ecosystem", ecosystem);
    if (sector) params.append("sector", sector);
    if (subEcosystem) params.append("subEcosystem", subEcosystem);

    const { data } = await agentNext.get<BuilderboardProject[]>(
      `/api/billboard/operation/project-list?${params.toString()}`,
    );
    console.log(data);
    return data || []; // 确保返回空数组而不是 undefined
  } catch (error) {
    console.error("Error fetching project data:", error);
    return []; // 出错时返回空数组
  }
}

export async function importGithubProject(params: {
  repoUrl: string;
  tags?: {
    ecosystem?: string;
    subEcosystem?: string;
  };
}): Promise<any> {
  const { data } = await agentNext.post(
    "/api/billboard/import-github-project",
    params,
  );
  return data;
}
