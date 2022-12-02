import type {
  GetUserProfileByIdResponse,
  CreateUserProfileRequest,
  CreateUserProfileResponse,
  UpdateUserProfileRequest,
  UpdateUserProfileResponse,
} from '@/types/user';
import { agentAuthed } from '../agent';
import { useQuery } from '@tanstack/react-query';

export function useFetchUser(userId?: string) {
  return useQuery({
    queryKey: ['user', userId],
    enabled: !!userId,
    queryFn: async () => {
      return getUserProfile(userId!);
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
}: CreateUserProfileRequest) {
  const { data } = await agentAuthed.post<CreateUserProfileResponse>('/user', {
    userId,
    walletAddress,
    email,
  });
  return data;
}

export async function submitUpdateUserProfile({
  userId,
  userName,
  email,
  avatarURI,
  walletAddress,
}: UpdateUserProfileRequest) {
  const { data } = await agentAuthed.put<UpdateUserProfileResponse>('/user', {
    userId,
    userName,
    email,
    avatarURI,
    walletAddress,
  });
  return data;
}
