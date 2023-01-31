import { APIResponse } from '@/types/response';
import { useQuery } from '@tanstack/react-query';

import { agentAnon, agentAuthed } from './agent';
import { getAllGroupingRequest } from './grouping-request';
import { UserID, UserProfile } from './types';

export interface GetUserProfileByIdResponse extends APIResponse {
  userExist: boolean;
  userProfile?: UserProfile;
}

export interface CreateUserProfileResponse extends APIResponse {
  userId: UserID;
  createUserProfile: boolean;
  verified: boolean;
  userProfile?: UserProfile;
}

export interface UpdateUserProfileResponse extends APIResponse {
  userProfile?: UserProfile;
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

export async function getEmailVerificationCode(emailAddress: string) {
  const { data } = await agentAuthed.post<{ sentVerificationCode: boolean }>(
    '/user/email',
    null,
    { params: { emailAddress } },
  );
  return data;
}

export async function submitCreateUserProfile(userProfile: UserProfile) {
  const { data } = await agentAuthed.post<CreateUserProfileResponse>(
    '/user/email/create',
    userProfile,
  );
  return data;
}

export async function submitUpdateUserProfile(
  userProfile: Partial<UserProfile>,
) {
  const { data } = await agentAuthed.put<UpdateUserProfileResponse>(
    `/user`,
    userProfile,
  );
  return data;
}

export async function searchUsers(keyword: string) {
  const { data } = await agentAuthed.get<{ users: UserProfile[] }>(
    '/user/search',
    {
      params: { keyword },
    },
  );
  return data.users ?? [];
}
export function checkUsername(currentUserName: string) {
  return async function (username: string) {
    if (username === currentUserName) return true;
    const { data } = await agentAnon.get<{ userNameAvailable: boolean }>(
      `/user/availability/${username}`,
    );
    return data.userNameAvailable;
  };
}
