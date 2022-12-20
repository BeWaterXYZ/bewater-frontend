import { APIResponse } from '@/types/response';
import { useQuery } from '@tanstack/react-query';

import { agentAuthed } from '../agent';

export interface UserProfile {
  userId: string;
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
  userId: string;
}

export interface UpdateUserProfileResponse extends APIResponse {
  userProfile: UserProfile | undefined;
}

export function useFetchUser(userId?: string) {
  return useQuery({
    queryKey: ['user', userId],
    enabled: !!userId,
    queryFn: async () => {
      return getUserProfile(userId as string);
    },
  });
}

export async function getUserProfile(userId: string) {
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
