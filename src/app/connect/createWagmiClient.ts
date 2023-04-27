import { configureChains, createClient, mainnet } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';

import { CONFIGS } from '@/config';

export function createWagmiClient() {
  const { chains, provider, webSocketProvider } = configureChains(
    [mainnet],
    [
      alchemyProvider({ apiKey: CONFIGS.PROVIDER_ALCHEMY_KEY }),
      infuraProvider({ apiKey: CONFIGS.PROVIDER_INFURA_KEY }),
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
          projectId: CONFIGS.WALLETCONNECT_PROJECT_ID,
        },
      }),
    ],
    provider,
    webSocketProvider,
  });

  return client;
}
