import { agentAnon, agentAuthed } from './agent';

import { APIResponse } from '@/types/response';
import { UserProfile } from './types';

/** GetLoginMessage */
export interface GetLoginMessageRequest {
  walletAddress: string;
}

export interface GetLoginMessageResponse extends APIResponse {
  message?: string;
  isWhitelisted: boolean;
}

/** VerifySignedMessage */
export interface VerifySignedMessageRequest {
  signature: string;
  walletAddress: string;
}

export interface VerifySignedMessageResponse extends APIResponse {
  token: string;
  userId: string;
  userProfile?: UserProfile;
}

// todo del
// export async function submitGetLoginMessage({
//   walletAddress,
// }: GetLoginMessageRequest) {
//   const { data } = await agentAnon.post<GetLoginMessageResponse>(
//     `/auth/${walletAddress}/message`,
//   );
//   return data;
// }

// todo del
// export async function submitVerifySignedMessage({
//   signature,
//   walletAddress,
// }: VerifySignedMessageRequest) {
//   const { data } = await agentAnon.post<VerifySignedMessageResponse>(
//     '/auth/login',
//     {
//       signature,
//       walletAddress,
//     },
//   );
//   return data;
// }

export async function getOAuthUrl(query: {
  platform: string;
  redirectURI: string;
}) {
  const { data } = await agentAuthed.post<{ oauthURL: string }>(
    '/auth/oauth',
    query,
  );
  return data;
}
