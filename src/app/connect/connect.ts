'use client';
import {
  connect,
  Connector,
  getAccount,
  getNetwork,
  signMessage,
} from '@wagmi/core';

import {
  submitGetLoginMessage,
  submitVerifySignedMessage,
} from '@/services/auth';

export async function connectWallet(connector: Connector) {
  console.log('start to connect wallet...');
  const account = getAccount();
  console.log('account:', { account });
  if (account.isConnected) {
    const { chain } = getNetwork();
    return {
      address: account.address?.toLowerCase(),
      chainId: chain?.id,
    };
  } else {
    const res = await connect({ connector });
    console.log('connect result:', { res });

    return {
      address: res.account.toLowerCase(),
      chainId: res.chain.id,
    };
  }
}

export async function getSignMessage(address: string, chainId: number) {
  const messageParams = {
    walletAddress: address,
  };
  const { message, isWhitelisted } = await submitGetLoginMessage(messageParams);
  return { message, isWhitelisted };
}

export async function verifyMessage(message: string, walletAddress: string) {
  const signature = await signMessage({ message });
  const { token, userProfile } = await submitVerifySignedMessage({
    walletAddress,
    signature,
  });

  return {
    token,
    userProfile,
  };
}
