import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSummary } from "./summary";

export function useFetchSummary(roleId?: string) {
  return useQuery({
    queryKey: ["summary", roleId],
    enabled: !!roleId,
    queryFn: async () => {
      return getSummary();
    },
  });
}
