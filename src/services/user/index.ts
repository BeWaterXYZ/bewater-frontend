import useSWR from 'swr';

import { useAuthContext, isAuthed } from '@/hooks/useAuth';

import { fetchBody } from '../helper/request';
import { toSWROptions } from '../helper/options';
import { useResultMapper } from '../helper/state';

import type { SWRResponse } from 'swr';
import type {
  GetUserProfileByIdResponse,
  CreateUserProfileRequest,
  CreateUserProfileResponse,
  UpdateUserProfileRequest,
  UpdateUserProfileResponse,
} from '@/types/user';
import type { Auth } from '@/models/auth';
import type { RequestOptions } from '../helper/options';

const CACHE_TTL_MINUTES = 10;

export function useFetchUser(userId?: string, options?: RequestOptions) {
  const url = `/api/user?userId=${userId}`;
  let response = lscache?.get(url) as SWRResponse<
    GetUserProfileByIdResponse,
    Error
  >;
  if (!response) {
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
    if (result.data) {
      lscache.set(url, result.data, CACHE_TTL_MINUTES);
    }
    return useResultMapper(result);
  } else {
    return response;
  }
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
