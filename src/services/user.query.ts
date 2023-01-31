import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getAllGroupingRequest } from './grouping-request';
import { UserID } from './types';
import { getUserProfile, submitUpdateUserProfile, updateEmail } from './user';

export function useFetchUser(userId?: UserID) {
  return useQuery({
    queryKey: ['user', userId],
    enabled: !!userId,
    queryFn: async () => {
      return getUserProfile(userId!);
    },
  });
}

export function useFetchGroupingRequest(userId?: UserID) {
  return useQuery({
    queryKey: ['user', 'requests', userId],
    enabled: !!userId,
    queryFn: async () => {
      return getAllGroupingRequest();
    },
  });
}

export function useMutaionUpdateUserProfile() {
  const queryClient = useQueryClient();
  return useMutation(submitUpdateUserProfile, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['user', data.userProfile?.userId]);
    },
  });
}

export function useMutationUpdateEmail() {
  const queryClient = useQueryClient();
  return useMutation(updateEmail, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['user', data.userProfile?.userId]);
    },
  });
}
