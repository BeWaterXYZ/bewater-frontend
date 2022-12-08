import { configureChains, createClient, defaultChains } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import getConfig from 'next/config';

import type { NextRuntimeConfig } from '@/types/next-runtime-config';

const {
  publicRuntimeConfig: { PROVIDER_ALCHEMY_KEY, PROVIDER_INFURA_KEY },
} = getConfig() as NextRuntimeConfig;

export function createWagmiClient() {
  const { chains, provider, webSocketProvider } = configureChains(
    defaultChains,
    [
      alchemyProvider({ apiKey: PROVIDER_ALCHEMY_KEY }),
      infuraProvider({ apiKey: PROVIDER_INFURA_KEY }),
      publicProvider(),
    ],
  );

  // Set up client
  const client = createClient({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: 'BeWater',
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
        },
      }),
    ],
    provider,
    webSocketProvider,
  });

  return client;
}
