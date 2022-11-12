import {
  createClient,
  configureChains,
  defaultChains,
  WagmiConfig,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { SessionProvider } from 'next-auth/react';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';

import DemoLegacyContent from '../components/demo-legacy';

const { provider, webSocketProvider, chains } = configureChains(defaultChains, [
  publicProvider(),
]);

const { connectors } = getDefaultWallets({
  appName: 'BeWater',
  chains,
});

const client = createClient({
  provider,
  webSocketProvider,
  connectors,
});

const DemoLegacy = ({ session }) => {
  return (
    <WagmiConfig client={client}>
      <SessionProvider session={session}>
        <RainbowKitProvider chains={chains}>
          <DemoLegacyContent />
        </RainbowKitProvider>
      </SessionProvider>
    </WagmiConfig>
  );
};

export default DemoLegacy;
