import { APIResponse } from '@/types/response';
import { agentAnon } from './agent';

interface SubmitEmailToWaitinglistResponse extends APIResponse {
  email: string;
}

interface Email {
  email: string;
}

export async function submitEmailToWaitingList(email: Email) {
  const { data } = await agentAnon.post<SubmitEmailToWaitinglistResponse>(
    'https://submit-form.com/h5pp10io',
    email,
  );
  return data;
}
