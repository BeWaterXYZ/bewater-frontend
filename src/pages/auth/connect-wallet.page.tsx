import { WagmiConfig } from 'wagmi';

import useWagmi from '@/hooks/useWagmi';
import { ConnectWallet } from '@/components/connect-wallet';

import type { NextPage } from 'next';

// Pass client to React Context Provider
const PageConnectWallet: NextPage = () => {
  // eslint-disable-next-line
  const { wagmiClient } = useWagmi();
  return (
    <div className="flex flex-col h-[calc(100vh-160px)] justify-center items-center">
      {wagmiClient ? (
        // eslint-disable-next-line
        <WagmiConfig client={wagmiClient}>
          <div className="typ-h4 pb-12">Connect Wallet</div>
          <ConnectWallet />
          <div className="typ-body-small pt-10 w-[270px] text-center">
            By connecting a wallet, you agree to our{' '}
            <span className="font-bold">Terms of Service</span> and acknowledge
            that you have read our{' '}
            <span className="font-bold">Privacy Policy</span> and{' '}
            <span className="font-bold">Cookie Use</span>.
          </div>
        </WagmiConfig>
      ) : (
        <div>Connector Init...</div>
      )}
    </div>
  );
};

PageConnectWallet.displayName = 'PageConnectWallet';

export default PageConnectWallet;
