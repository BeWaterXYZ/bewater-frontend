import Moralis from 'moralis';
import getConfig from 'next/config';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { NextRuntimeConfig } from '@/types/next-runtime-config';
import type {
  GetLoginMessageRequest,
  GetLoginMessageResponse,
} from '@/types/auth';

const {
  serverRuntimeConfig: { moralisAppDomain, moralisAPIKey, nextAuthURL },
} = getConfig() as NextRuntimeConfig;

const config = {
  domain: moralisAppDomain,
  statement: 'Please sign this message to confirm your identity.',
  uri: nextAuthURL,
  timeout: 60,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetLoginMessageResponse>,
) {
  console.log('local response');
  // console.log({ config });
  const { walletAddress, chain } = req.body as GetLoginMessageRequest;

  if (req.method !== 'POST') {
    res.status(405).end('Only POST requests allowed');
    return;
  }

  if (!walletAddress || !chain) {
    res.status(400).end('walletAddress, chain are all required.');
    return;
  }

  await Moralis.start({ apiKey: moralisAPIKey });

  try {
    const result = await Moralis.Auth.requestMessage({
      address: walletAddress,
      chain,
      network: 'evm',
      ...config,
    });

    res
      .status(200)
      .json({ status: 200, error: [], message: result.toJSON().message });
  } catch (error) {
    res.status(500).end('Internal server error');
    console.error(error);
  }
}
