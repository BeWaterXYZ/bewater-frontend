import { APIResponse } from '@/types/response';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { compareDesc, parseISO } from 'date-fns';

import { agentAuthed } from '../agent';
import { GroupingRequestFull, GroupingRequestId } from '../shared';

export type UserID = string;

export interface UserProfile {
  userId: UserID;
  email: string;
  walletAddress: string;
  userName?: string | undefined;
  avatarURI?: string | undefined;
  fullName?: string | undefined;
}

export interface GetUserProfileByIdResponse extends APIResponse {
  userExist: boolean;
  userProfile?: UserProfile;
}

export interface CreateUserProfileResponse extends APIResponse {
  userId: UserID;
}

export interface UpdateUserProfileResponse extends APIResponse {
  userProfile: UserProfile | undefined;
}

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

export async function getUserProfile(userId: UserID) {
  const { data } = await agentAuthed.get<GetUserProfileByIdResponse>(
    `/user/${userId}`,
  );
  return data;
}

export async function submitCreateUserProfile(userProfile: UserProfile) {
  const { data } = await agentAuthed.post<CreateUserProfileResponse>(
    '/user',
    userProfile,
  );
  return data;
}

export async function submitUpdateUserProfile(
  userProfile: Pick<UserProfile, 'userId'> &
    Partial<Omit<UserProfile, 'userId'>>,
) {
  const { data } = await agentAuthed.put<UpdateUserProfileResponse>(
    `/user/${userProfile.userId}`,
    userProfile,
  );
  return data;
}

export async function getAllGroupingRequest() {
  const { data } = await agentAuthed.get<{
    receivedApplications: GroupingRequestFull[];
    receivedInvitations: GroupingRequestFull[];
    sentApplications: GroupingRequestFull[];
    sentInvitations: GroupingRequestFull[];
  }>(`/user/requests`);
  return data;
}

export function sortGroupingRequest(reqs: GroupingRequestFull[]) {
  return reqs.sort((a, b) => {
    return compareDesc(parseISO(a.createdAt), parseISO(b.createdAt));
  });
}

export async function revokeGroupingRequest(requestId: GroupingRequestId) {
  const { data } = await agentAuthed.put(`/team/request/${requestId}/revoke`);
  return data;
}

export async function acceptGroupingRequest(requestId: GroupingRequestId) {
  const { data } = await agentAuthed.put(`/team/request/${requestId}/accept`);
  return data;
}
export async function declineGroupingRequest(requestId: GroupingRequestId) {
  const { data } = await agentAuthed.put(`/team/request/${requestId}/decline`);
  return data;
}

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
