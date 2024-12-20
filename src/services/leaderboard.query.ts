import { useQuery } from "@tanstack/react-query";
import { getBuilderboardDeveloper, getBuilderboardProject, getLeaderboardDeveloper, getLeaderboardProject } from "./leaderboard";

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

export function useBuilderboardDeveloper(limit: number, language: string) {
  return useQuery({
    queryKey: ["BuilderboardDeveloper", limit, language],
    queryFn: async () => {
      return getBuilderboardDeveloper(limit, encodeURIComponent(language));
    },
  });
}

export function useBuilderboardProject(limit: number) {
  return useQuery({
    queryKey: ["BuilderboardProject", limit],
    queryFn: async () => {
      return getBuilderboardProject(limit);
    },
  });
}