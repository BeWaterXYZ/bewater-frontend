import type {
  GetLoginMessageRequest,
  GetLoginMessageResponse,
  VerifySignedMessageRequest,
  VerifySignedMessageResponse,
} from '@/types/auth';
import { agentAnon } from '../agent';

export async function submitGetLoginMessage({
  walletAddress,
  chain,
  network = 'evm',
}: GetLoginMessageRequest): Promise<GetLoginMessageResponse> {
  const { data } = await agentAnon.post('/auth/message', {
    walletAddress,
    chain,
    network,
  });
  return data;
}

export async function submitVerifySignedMessage({
  signature,
  message,
  network = 'evm',
}: VerifySignedMessageRequest): Promise<VerifySignedMessageResponse> {
  const { data } = await agentAnon.post('/auth/login', {
    signature,
    message,
    network,
  });
  return data;
}
