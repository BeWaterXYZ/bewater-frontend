import '../styles/index.css'

import { createClient, configureChains, defaultChains, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { SessionProvider } from 'next-auth/react';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

const { provider, webSocketProvider, chains } = configureChains(defaultChains, [publicProvider()]);
const { connectors } = getDefaultWallets({
  appName: 'BeWater',
  chains
});

const client = createClient({
  provider,
  webSocketProvider,
  connectors,
});

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <WagmiConfig client={client}>
      <SessionProvider session={session}>
        <RainbowKitProvider chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </SessionProvider>
    </WagmiConfig>

  )
}

export default MyApp
