import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAnalyticsData } from "./analytics";

export function useFetchAnalyticsData(challengeId: number) {
  return useQuery({
    queryKey: ["analytics", challengeId],
    queryFn: async () => {
      return getAnalyticsData(challengeId);
    },
  });
}
