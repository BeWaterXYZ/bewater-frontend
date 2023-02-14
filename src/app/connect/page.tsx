'use client';
import { WagmiConfig } from 'wagmi';

import { createWagmiClient } from './createWagmiClient';
import dynamicLoad from 'next/dynamic';

const WalletOptions = dynamicLoad(() => import('./wallets'), { ssr: false });

const wagmiClient = createWagmiClient();

export default function Page() {
  return (
    <div className="flex h-full flex-col  justify-center items-center pt-20 ">
      <div className="w-80 fixed top-1/2 -translate-y-1/2 flex items-center flex-col justify-between">
        <WagmiConfig client={wagmiClient}>
          <div className="heading-4 pb-12">Welcome onboard,</div>
          <WalletOptions />
          <div className="body-5   text-center text-gray-400">
            By signing in or connecting wallet, you agree to our{' '}
            <span className="font-bold text-white">Terms of Service</span> and
            acknowledge that you have read our{' '}
            <span className="font-bold text-white">Privacy Policy</span> and{' '}
            <span className="font-bold text-white">Cookie Use</span>.
          </div>
        </WagmiConfig>
      </div>
    </div>
  );
}
