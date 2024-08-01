import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  revokeGroupingRequest,
  acceptGroupingRequest,
  declineGroupingRequest,
  getAllOngoingNotifications,
} from "./notification";
import { getAllGroupingRequest } from "./notification";
import { UserID } from "./types";

export function useFetchGroupingRequest(userId?: UserID) {
  return useQuery({
    queryKey: ["user", "requests", userId],
    enabled: !!userId,
    queryFn: async () => {
      return getAllGroupingRequest();
    },
  });
}
export function useFetchOngoingNotifications(userId?: UserID) {
  return useQuery({
    queryKey: ["user", "notifications", userId],
    enabled: !!userId,
    queryFn: async () => {
      return getAllOngoingNotifications();
    },
  });
}
export function useRevokeGroupingRequest() {
  const queryClient = useQueryClient();
  return useMutation(revokeGroupingRequest, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["user", "requests"]);
    },
  });
}
export function useAcceptGroupingRequest() {
  const queryClient = useQueryClient();
  return useMutation(acceptGroupingRequest, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["user", "requests"]);
    },
  });
}
export function useDeclineGroupingRequest() {
  const queryClient = useQueryClient();
  return useMutation(declineGroupingRequest, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["user", "requests"]);
    },
  });
}
