'use client';
import { WagmiConfig } from 'wagmi';

import { createWagmiClient } from './createWagmiClient';
import dynamicLoad from 'next/dynamic';

const WalletOptions = dynamicLoad(() => import('./wallets'), { ssr: false });

const wagmiClient = createWagmiClient();

export default function Page({ params }: { params: { lng: string } }) {
  const { lng = 'en' } = params || {};
  return (
    <div className="flex h-full flex-col  justify-center items-center pt-20 ">
      <div className="w-[300px] fixed top-1/2 -translate-y-1/2 flex items-center flex-col justify-between">
        <WagmiConfig client={wagmiClient}>
          <div className="body-1 text-[20px] pb-12">
            Hi! Welcome to BeWater.
          </div>
          <WalletOptions lng={lng} />
          <div className="body-5 leading-4  text-left text-gray-400">
            By connecting wallet, you agree to our{' '}
            <span className=" text-white">Terms of Service</span> and
            acknowledge that you have read our{' '}
            <span className=" text-white">Privacy Policy</span> and{' '}
            <span className=" text-white">Cookie Use</span>.
          </div>
        </WagmiConfig>
      </div>
    </div>
  );
}
