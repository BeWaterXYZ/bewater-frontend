export interface ProjectData {
  contributors: {
    avatar_url: string;
    login: string;
  }[];
  description: string;
  forks_count: number;
  language: string | null;
  stargazers_count: number;
  repoName: string;
  topics: string[];
}

export interface DeveloperData {
  avatar_url: string;
  totalStars: number;
  followers: number;
  name: string;
  login: string;
  projectArr: {
    name: string;
    description: string;
  }[];
  languageSum: {
    [lang: string]: number | undefined;
  };
}

export interface LanguageColors {
  [lang: string]:
    | {
        color: string | null;
        url: string;
      }
    | undefined;
}
