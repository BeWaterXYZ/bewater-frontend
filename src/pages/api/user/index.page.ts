import { getMockUserProfile } from '@/__mock__/user';
import delay from '@/utils/delay';
import getFirstParam from '@/utils/getFirstParam';

import type { NextApiRequest, NextApiResponse } from 'next';
import type {
  GetUserProfileByIdResponse,
  CreateUserProfileResponse,
  UpdateUserProfileResponse,
} from '@/types/user';

export default async function user(
  req: NextApiRequest,
  res: NextApiResponse<
    | GetUserProfileByIdResponse
    | CreateUserProfileResponse
    | UpdateUserProfileResponse
  >,
) {
  if (!['GET', 'POST', 'PUT'].includes(req.method || '')) {
    res.status(500).end('Only get,post,put requests allowed');
    return;
  }

  let userId = '';
  if (req.query.userId) {
    userId = getFirstParam(req.query.userId);
  } else {
    userId = (req.body as { userId: string }).userId;
  }

  switch (req.method) {
    case 'GET':
      return await getUser(userId, res);
    case 'POST':
      return await createUser(userId, res);
    case 'PUT':
      return await updateUser(userId, res);
    default:
      return;
  }
}

const getUser = async (
  userId: string,
  res: NextApiResponse<GetUserProfileByIdResponse>,
) => {
  await delay();
  return res.status(200).json({
    error: [],
    status: 200,
    userExist: true,
    userProfile: getMockUserProfile(userId),
  });
};

const createUser = async (
  userId: string,
  res: NextApiResponse<CreateUserProfileResponse>,
) => {
  await delay();
  return res.status(200).json({
    error: [],
    status: 200,
    userId,
  });
};

const updateUser = async (
  userId: string,
  res: NextApiResponse<UpdateUserProfileResponse>,
) => {
  await delay();
  return res.status(200).json({
    error: [],
    status: 200,
    updatedUserInfo: getMockUserProfile(userId),
  });
};
