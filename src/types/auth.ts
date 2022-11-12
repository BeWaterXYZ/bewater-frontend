export interface UserAuthToken {
  userId: string;
  walletAddress: string;
  moralisId: string;
  chain: string;
  network: string;
}

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
  isNewUser: boolean;
}

/** Validate */
export interface ValidateRequest {
  token: string;
}

export interface ValidateResponse {
  status: number;
  error: string[];
  userId: string;
}
