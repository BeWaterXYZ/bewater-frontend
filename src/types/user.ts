/** UserProfile */
export interface UserProfile {
  userId: string;
  email: string;
  walletAddress: string;
  userName?: string | undefined;
  avatarURI?: string | undefined;
}

/** GetUserProfileById */
export interface GetUserProfileByIdRequest {
  userId: string;
}

export interface GetUserProfileByIdResponse {
  status: number;
  error: string[];
  userExist: boolean;
  userProfile?: UserProfile;
}

/** CreateUserProfile */
export interface CreateUserProfileRequest {
  userId: string;
  walletAddress: string;
  email: string;
  userName?: string | undefined;
  avatarURI?: string | undefined;
}

export interface CreateUserProfileResponse {
  status: number;
  error: string[];
  userId: string;
}

/** UpdateUserProfile */
export interface UpdateUserProfileRequest {
  userId: string;
  userName?: string | undefined;
  fullName?: string | undefined;
  email?: string | undefined;
  walletAddress?: string | undefined;
  avatarURI?: string | undefined;
}

export interface UpdateUserProfileResponse {
  status: number;
  error: string[];
  userProfile: UserProfile | undefined;
}
