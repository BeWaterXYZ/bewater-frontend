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

export async function startSignMsgAndVerify(address: string, chainId: number) {
  const messageParams = {
    walletAddress: address,
    chain: `${chainId}`,
    network: 'evm',
  };
  const { message } = await submitGetLoginMessage(messageParams);
  const signature = await signMessage({ message });
  const { token, userId, userProfile } = await submitVerifySignedMessage({
    message,
    signature,
  });

  return {
    token,
    userId,
    userProfile,
  };
}
