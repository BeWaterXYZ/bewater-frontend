import { WagmiConfig } from 'wagmi';
import { createWagmiClient } from '@/features/connect-wallet/createWagmiClient';
import { useAlert } from '@/components/alert';

import type { NextPage } from 'next';
import { WalletOptions } from './walletOptions';

const wagmiClient = createWagmiClient();

// Pass client to React Context Provider
export const PageConnectWallet: NextPage = () => {
  // eslint-disable-next-line
  const { Alert, onAlert } = useAlert({
    title: 'An error occurs',
    text: 'Connect Wallet Failed.',
  });
  return (
    <>
      <div className="flex flex-col h-[calc(100vh-160px)] justify-center items-center">
        <WagmiConfig client={wagmiClient}>
          <div className="typ-h4 pb-12">Connect Wallet</div>
          <WalletOptions onError={onAlert} />
          <div className="typ-body-small pt-10 w-[270px] text-center">
            By connecting a wallet, you agree to our{' '}
            <span className="font-bold">Terms of Service</span> and acknowledge
            that you have read our{' '}
            <span className="font-bold">Privacy Policy</span> and{' '}
            <span className="font-bold">Cookie Use</span>.
          </div>
        </WagmiConfig>
      </div>
      <Alert />
    </>
  );
};

PageConnectWallet.displayName = 'PageConnectWallet';
