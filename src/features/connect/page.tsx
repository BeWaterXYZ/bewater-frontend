import { WagmiConfig } from 'wagmi';

import { useAlert } from '@/components/alert';
import { ModalMetamask } from '@/components/modal/modal-metamask';
import { useModalStore } from '@/stores/modal';

import { createWagmiClient } from './createWagmiClient';
import { WalletOptions } from './wallets';

import type { NextPage } from 'next';

const wagmiClient = createWagmiClient();

// Pass client to React Context Provider
export const PageConnectWallet: NextPage = () => {
  // eslint-disable-next-line
  const { Alert, onAlert } = useAlert({
    title: 'An error occurs',
    text: 'Connect Wallet Failed.',
  });
  const [metamask, close] = useModalStore((s) => [s.metamask, s.close]);
  return (
    <>
      <div className="flex h-full flex-col  justify-center items-center">
        <WagmiConfig client={wagmiClient}>
          <div className="heading-4 pb-12">Connect Wallet</div>
          <WalletOptions onError={onAlert} />
          <div className="body-2 pt-10 w-[270px] text-center">
            By connecting a wallet, you agree to our{' '}
            <span className="font-bold">Terms of Service</span> and acknowledge
            that you have read our{' '}
            <span className="font-bold">Privacy Policy</span> and{' '}
            <span className="font-bold">Cookie Use</span>.
          </div>
        </WagmiConfig>
      </div>
      <Alert />
      <ModalMetamask modalOpen={metamask} onClose={() => close('metamask')} />
    </>
  );
};

PageConnectWallet.displayName = 'PageConnectWallet';
