import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  revokeGroupingRequest,
  acceptGroupingRequest,
  declineGroupingRequest,
} from './grouping-request';

export function useRevokeGroupingRequest() {
  const queryClient = useQueryClient();
  return useMutation(revokeGroupingRequest, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['user', 'requests']);
    },
  });
}
export function useAcceptGroupingRequest() {
  const queryClient = useQueryClient();
  return useMutation(acceptGroupingRequest, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['user', 'requests']);
    },
  });
}
export function useDeclineGroupingRequest() {
  const queryClient = useQueryClient();
  return useMutation(declineGroupingRequest, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['user', 'requests']);
    },
  });
}
