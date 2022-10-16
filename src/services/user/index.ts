import useSWR from 'swr';

import { useAuthContext, isAuthed } from '@/hooks/useAuth';

import { fetchBody } from '../helper/request';
import { toSWROptions } from '../helper/options';
import { useResultMapper } from '../helper/state';

import type {
  GetUserProfileByIdRequest,
  GetUserProfileByIdResponse,
  CreateUserProfileRequest,
  CreateUserProfileResponse,
  UpdateUserProfileRequest,
  UpdateUserProfileResponse,
} from '@/types/user';
import type { Auth } from '@/models/auth';
import type { RequestOptions } from '../helper/options';

export function useFetchUser(
  { userId }: GetUserProfileByIdRequest,
  options?: RequestOptions,
) {
  const token = useAuthContext();
  const result = useSWR<
    GetUserProfileByIdResponse,
    Error,
    [url: string, token: Auth] | false
  >(
    isAuthed(token) && [`/api/user?userId=${userId}`, token],
    (url, token) => {
      return fetchBody(url, {
        ...{
          headers: { ...token.headers },
        },
      });
    },
    toSWROptions(options),
  );
  return useResultMapper(result);
}

export async function submitCreateUserProfile(
  token: Auth,
  { userId, walletAddress, email }: CreateUserProfileRequest,
): Promise<CreateUserProfileResponse> {
  return await fetchBody('/api/user', {
    method: 'POST',
    body: JSON.stringify({
      userId,
      walletAddress,
      email,
    }),
    headers: {
      ['content-type']: 'application/json',
      ...token.headers,
    },
  });
}

export async function submitVerifySignedMessage(
  token: Auth,
  {
    userId,
    userName,
    email,
    avatarURI,
    walletAddress,
  }: UpdateUserProfileRequest,
): Promise<UpdateUserProfileResponse> {
  return await fetchBody('/api/user', {
    method: 'PUT',
    body: JSON.stringify({
      userId,
      userName,
      email,
      avatarURI,
      walletAddress,
    }),
    headers: {
      ['content-type']: 'application/json',
      ...token.headers,
    },
  });
}
