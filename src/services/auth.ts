import { agentAnon } from './agent';

import { APIResponse } from '@/types/response';
import { UserProfile } from './types';

/** GetLoginMessage */
export interface GetLoginMessageRequest {
  walletAddress: string;
  chain: string;
  network?: string;
}

export interface GetLoginMessageResponse extends APIResponse {
  message?: string;
  isWhitelisted: boolean;
}

/** VerifySignedMessage */
export interface VerifySignedMessageRequest {
  network?: string;
  signature: string;
  message: string;
}

export interface VerifySignedMessageResponse extends APIResponse {
  token: string;
  userId: string;
  userProfile?: UserProfile;
}

export async function submitGetLoginMessage({
  walletAddress,
  chain,
  network = 'evm',
}: GetLoginMessageRequest) {
  const { data } = await agentAnon.post<GetLoginMessageResponse>(
    '/auth/message',
    {
      walletAddress,
      chain,
      network,
    },
  );
  return data;
}

export async function submitVerifySignedMessage({
  signature,
  message,
  network = 'evm',
}: VerifySignedMessageRequest) {
  const { data } = await agentAnon.post<VerifySignedMessageResponse>(
    '/auth/login',
    {
      signature,
      message,
      network,
    },
  );
  return data;
}
