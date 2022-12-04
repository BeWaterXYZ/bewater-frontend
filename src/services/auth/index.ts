import { agentAnon } from '../agent';

import type {
  GetLoginMessageRequest,
  GetLoginMessageResponse,
  VerifySignedMessageRequest,
  VerifySignedMessageResponse,
} from '@/types/auth';

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
