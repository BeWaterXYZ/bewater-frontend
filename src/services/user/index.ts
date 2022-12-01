import useSWR from 'swr';

import { toSWROptions } from '../helper/options';
import { useResultMapper } from '../helper/state';

import type {
  GetUserProfileByIdResponse,
  CreateUserProfileRequest,
  CreateUserProfileResponse,
  UpdateUserProfileRequest,
  UpdateUserProfileResponse,
} from '@/types/user';
import type { RequestOptions } from '../helper/options';
import { agentAuthed } from '../agent';

export function useFetchUser(userId?: string, options?: RequestOptions) {
  const result = useSWR<
    GetUserProfileByIdResponse,
    Error,
    [url: string] | false
  >(
    !!userId && [`/user/${userId}`],
    (url) => {
      return agentAuthed.get(url, {});
    },
    toSWROptions(options),
  );
  return useResultMapper(result);
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
