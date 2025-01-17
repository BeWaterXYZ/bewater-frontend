import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getBuilderboardDeveloper,
  getBuilderboardProject,
  getLeaderboardDeveloper,
  getLeaderboardProject,
  getRankingTags,
  importGithubProject,
  RankingTagType,
} from "./leaderboard";

export function useRankingTags(type?: RankingTagType) {
  const { data: allTags = [], ...rest } = useQuery({
    queryKey: ["RankingTags"],
    queryFn: getRankingTags,
    // staleTime: 24 * 60 * 60 * 1000,
    // cacheTime: 24 * 60 * 60 * 1000,
  });

  const filteredTags = type
    ? allTags.filter((tag) => tag.type === type)
    : allTags;

  return {
    ...rest,
    data: filteredTags,
  };
}

export function useLeaderboardProject(limit: number) {
  return useQuery({
    queryKey: ["LeaderboardProject", limit],
    queryFn: async () => {
      return getLeaderboardProject(limit);
    },
  });
}

export function useLeaderboardDeveloper(limit: number, language: string) {
  return useQuery({
    queryKey: ["LeaderboardDeveloper", limit, language],
    queryFn: async () => {
      return getLeaderboardDeveloper(limit, encodeURIComponent(language));
    },
  });
}

export function useBuilderboardDeveloper(
  limit: number,
  ecosystem: string,
  sector: string,
) {
  return useQuery({
    queryKey: ["BuilderboardDeveloper", limit, ecosystem, sector],
    queryFn: async () => {
      return getBuilderboardDeveloper(limit, ecosystem, sector);
    },
  });
}

export function useBuilderboardProject(
  limit: number,
  ecosystem: string,
  sector: string,
) {
  return useQuery({
    queryKey: ["BuilderboardProject", limit, ecosystem, sector],
    queryFn: async () => {
      return getBuilderboardProject(limit, ecosystem, sector);
    },
  });
}

export function useImportGithubProject() {
  return useMutation({
    mutationFn: async (repoUrl: string) => {
      return importGithubProject(repoUrl);
    },
  });
}
