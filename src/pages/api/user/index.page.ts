import { mockGetUserByIdResponse } from '@/__mock__/user';
import delay from '@/utils/delay';

import type { NextApiRequest, NextApiResponse } from 'next';
import type {
  GetUserProfileByIdRequest,
  GetUserProfileByIdResponse,
  CreateUserProfileRequest,
  CreateUserProfileResponse,
  UpdateUserProfileRequest,
  UpdateUserProfileResponse,
} from '@/types/user';

export default async function user(
  req: NextApiRequest,
  res: NextApiResponse<GetUserProfileByIdResponse>,
) {
  await delay();
  return res.status(200).json({
    error: [],
    status: 200,
    userExist: true,
    userProfile: mockGetUserByIdResponse,
  });
}
