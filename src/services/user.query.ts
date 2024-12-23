import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { UserID } from "./types";
import {
  getSocialConnections,
  getUserProfile,
  getUserProfileFull,
  submitUpdateUserProfile,
  updateEmail,
  disconnectSocialConnections,
  addUserGithubRepo,
  deleteUserGithubRepo,
  getUserProjects,
  updateUserGithubRepo,
} from "./user";

export function useFetchUser(userId?: UserID) {
  return useQuery({
    queryKey: ["user", userId],
    enabled: !!userId,
    queryFn: async () => {
      return getUserProfile();
    },
  });
}
export function useFetchProjectsByUser(userId?: UserID) {
  return useQuery({
    queryKey: ["user", userId, "projects"],
    enabled: !!userId,
    queryFn: async () => {
      return getUserProjects(userId!);
    },
  });
}
export function useFetchUserFull(userId?: UserID) {
  return useQuery({
    queryKey: ["user", userId, "full"],
    enabled: !!userId,
    queryFn: async () => {
      return getUserProfileFull(userId!);
    },
  });
}
export function useFetchUserSocialConnections(userId?: UserID) {
  return useQuery({
    queryKey: ["user", "social", userId],
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
      queryClient.setQueryData(["user", data.userProfile?.id], data);
      queryClient.invalidateQueries(["user", data.userProfile?.id]);
    },
  });
}

export function useMutationAddUserGithubRepo() {
  const queryClient = useQueryClient();
  return useMutation(addUserGithubRepo, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["project", data?.id]);
    },
  });
}

export function useMutationUpdateUserGithubRepo() {
  const queryClient = useQueryClient();
  return useMutation(updateUserGithubRepo, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["project", data?.id]);
    },
  });
}

export function useMutationDeleteUserGithubRepo() {
  const queryClient = useQueryClient();
  return useMutation(deleteUserGithubRepo, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["user", data.userProfile?.id]);
    },
  });
}

export function useMutationUpdateEmail() {
  const queryClient = useQueryClient();
  return useMutation(updateEmail, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["user", data.userProfile?.id]);
    },
  });
}

export function useMutationDisconnectSocialConnection() {
  const queryClient = useQueryClient();
  return useMutation(disconnectSocialConnections, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["user", "social"]);
    },
  });
}

export const useMutationUpdatePinnedProjects = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (pinnedProjectIds: string[]) => {
      const response = await fetch('/api/user/pinned-projects', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pinnedProjectIds }),
      });
      if (!response.ok) {
        throw new Error('Failed to update pinned projects');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
