import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { UserID } from './types';
import {
  getSocialConnections,
  getUserProfile,
  getUserProfileFull,
  submitUpdateUserProfile,
  updateEmail,
  disconnectSocialConnections,
} from './user';

export function useFetchUser(userId?: UserID) {
  return useQuery({
    queryKey: ['user', userId],
    enabled: !!userId,
    queryFn: async () => {
      return getUserProfile();
    },
  });
}
export function useFetchUserFull(userId?: UserID) {
  return useQuery({
    queryKey: ['user', userId, 'full'],
    enabled: !!userId,
    queryFn: async () => {
      return getUserProfileFull(userId!);
    },
  });
}
export function useFetchUserSocialConnections(userId?: UserID) {
  return useQuery({
    queryKey: ['user', 'social', userId],
    enabled: !!userId,
    queryFn: async () => {
      return getSocialConnections();
    },
  });
}

export function useMutationUpdateUserProfile() {
  const queryClient = useQueryClient();
  return useMutation(submitUpdateUserProfile, {
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(['user', data.userProfile?.id], data);
      queryClient.invalidateQueries(['user', data.userProfile?.id]);
    },
  });
}

export function useMutationUpdateEmail() {
  const queryClient = useQueryClient();
  return useMutation(updateEmail, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['user', data.userProfile?.id]);
    },
  });
}

export function useMutationDisconnectSocialConnection() {
  const queryClient = useQueryClient();
  return useMutation(disconnectSocialConnections, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['user', 'social']);
    },
  });
}
