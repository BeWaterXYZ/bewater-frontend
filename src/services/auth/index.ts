import { fetchBody } from '../helper/request';

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
}: GetLoginMessageRequest): Promise<GetLoginMessageResponse> {
  return await fetchBody('/api/auth/message', {
    method: 'POST',
    body: JSON.stringify({
      walletAddress,
      chain,
      network,
    }),
  });
}

export async function submitVerifySignedMessage({
  signature,
  message,
  network = 'evm',
}: VerifySignedMessageRequest): Promise<VerifySignedMessageResponse> {
  return await fetchBody('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      signature,
      message,
      network,
    }),
  });
}
