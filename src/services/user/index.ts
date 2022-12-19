import { useQuery } from '@tanstack/react-query';

import { agentAuthed } from '../agent';

import type {
  GetUserProfileByIdResponse,
  CreateUserProfileRequest,
  CreateUserProfileResponse,
  UpdateUserProfileRequest,
  UpdateUserProfileResponse,
} from '@/types/user';

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

export async function submitCreateUserProfile({
  userId,
  walletAddress,
  email,
  userName,
}: CreateUserProfileRequest) {
  const { data } = await agentAuthed.post<CreateUserProfileResponse>('/user', {
    userId,
    walletAddress,
    email,
    userName,
  });
  return data;
}

export async function submitUpdateUserProfile({
  userId,
  userName,
  email,
  fullName,
}: UpdateUserProfileRequest) {
  const { data } = await agentAuthed.put<UpdateUserProfileResponse>(
    `/user/${userId}`,
    {
      userId,
      userName,
      email,
      fullName,
    },
  );
  return data;
}
