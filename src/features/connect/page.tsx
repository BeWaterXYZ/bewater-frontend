import { WagmiConfig } from 'wagmi';

import { createWagmiClient } from './createWagmiClient';
import { WalletOptions } from './wallets';

import type { NextPage } from 'next';

const wagmiClient = createWagmiClient();

export const PageConnectWallet: NextPage = () => {
  return (
    <>
      <div className="flex h-full flex-col  justify-center items-center">
        <WagmiConfig client={wagmiClient}>
          <div className="heading-4 pb-12">Connect Wallet</div>
          <WalletOptions />
          <div className="body-2 pt-10 w-[270px] text-center">
            By connecting a wallet, you agree to our{' '}
            <span className="font-bold">Terms of Service</span> and acknowledge
            that you have read our{' '}
            <span className="font-bold">Privacy Policy</span> and{' '}
            <span className="font-bold">Cookie Use</span>.
          </div>
        </WagmiConfig>
      </div>
    </>
  );
};

PageConnectWallet.displayName = 'PageConnectWallet';
