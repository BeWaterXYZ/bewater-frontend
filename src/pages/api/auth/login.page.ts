import Moralis from 'moralis';
import getConfig from 'next/config';
import jwt from 'jsonwebtoken';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { NextRuntimeConfig } from '@/types/next-runtime-config';
import type {
  VerifySignedMessageRequest,
  VerifySignedMessageResponse,
} from '@/types/auth';

const {
  serverRuntimeConfig: { moralisAPIKey, nextAuthSecret },
} = getConfig() as NextRuntimeConfig;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerifySignedMessageResponse>,
) {
  const { message, signature } = JSON.parse(
    req.body as string,
  ) as VerifySignedMessageRequest;

  if (req.method !== 'POST') {
    res.status(405).end('Only POST requests allowed');
    return;
  }

  if (!message || !signature) {
    res.status(400).end('message, signature are all required.');
    return;
  }

  try {
    await Moralis.start({ apiKey: moralisAPIKey });
    const resVerify = await Moralis.Auth.verify({
      message,
      signature,
      network: 'evm',
    });
    const { address, profileId, expirationTime } = resVerify.toJSON();
    const user = { address, profileId, expirationTime, signature };
    const token = jwt.sign(user.profileId, nextAuthSecret);
    res.status(200).json({
      status: 200,
      error: [],
      token: token,
      userId: user.profileId,
      isNewUser: true,
    });
    return user;
  } catch (error) {
    res.status(500).end('Internal server error');
    console.error(error);
  }
}
