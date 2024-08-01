import { useQuery } from "@tanstack/react-query";
import { getLeaderboardDeveloper, getLeaderboardProject } from "./leaderboard";

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
