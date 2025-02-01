import { useQuery, useMutation } from "@tanstack/react-query";
import {
  BuilderboardDeveloper,
  BuilderboardProject,
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
  limit?: number, 
  ecosystem?: string,
  sector?: string,
  subEcosystem?: string
) {
  return useQuery(
    ['builderboard', 'developer', limit, ecosystem, sector, subEcosystem],
    async () => {
      return getBuilderboardDeveloper(limit, ecosystem, sector, subEcosystem);
    },
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );
}

export function useBuilderboardProject(
  limit?: number, 
  ecosystem?: string,
  sector?: string,
  subEcosystem?: string
) {
  return useQuery(
    ['builderboard', 'project', limit, ecosystem, sector, subEcosystem],
    async () => {
      return getBuilderboardProject(limit, ecosystem, sector, subEcosystem);
    },
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );
}

export function useImportGithubProject() {
  return useMutation({
    mutationFn: async (params: { 
      repoUrl: string; 
      tags?: { 
        ecosystem?: string; 
        subEcosystem?: string; 
      }; 
    }) => {
      return importGithubProject(params);
    },
  });
}
