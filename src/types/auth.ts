import { UserProfile } from './user';

/** GetLoginMessage */
export interface GetLoginMessageRequest {
  walletAddress: string;
  chain: string;
  network?: string;
}

export interface GetLoginMessageResponse {
  status: number;
  error: string[];
  message: string;
}

/** VerifySignedMessage */
export interface VerifySignedMessageRequest {
  network?: string;
  signature: string;
  message: string;
}

export interface VerifySignedMessageResponse {
  status: number;
  error: string[];
  token: string;
  userId: string;
  userProfile?: UserProfile;
}
