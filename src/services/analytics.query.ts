import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAnalyticsData } from "./analytics";

export function useFetchAnalyticsData(challengeId: number, roleId?: string) {
  return useQuery({
    queryKey: ["analytics", challengeId, roleId],
    enabled: !!roleId,
    queryFn: async () => {
      return getAnalyticsData(challengeId);
    },
  });
}
