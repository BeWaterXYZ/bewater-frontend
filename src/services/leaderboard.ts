import { agentAuthed } from "./agent";

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
    full_name: string;
    description: string;
    stargazers_count: number;
  }[];
}

export async function getLeaderboardProject(limit: number) {
  const { data } = await agentAuthed.get<LeaderboardProject[]>(
    `/billboard/project-list?limit=${limit}`
  );
  return data;
}

export async function getLeaderboardDeveloper(limit: number, language: string) {
  const { data } = await agentAuthed.get<LeaderboardDeveloper[]>(
    `/billboard/developer-list?limit=${limit}&language=${language}`
  );
  return data;
}
