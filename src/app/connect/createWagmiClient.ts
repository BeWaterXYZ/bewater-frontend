import { configureChains, createConfig } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import { mainnet } from '@wagmi/core/chains';
import { CONFIGS } from '@/config';
import { createPublicClient, http } from 'viem';

export function createWagmiClient() {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnet],
    [
      alchemyProvider({ apiKey: CONFIGS.PROVIDER_ALCHEMY_KEY }),
      infuraProvider({ apiKey: CONFIGS.PROVIDER_INFURA_KEY }),
      publicProvider(),
    ],
  );

  console.log(chains);

  // Set up client
  const client = createConfig({
    autoConnect: true,
    publicClient: createPublicClient({
      chain: mainnet,
      transport: http(),
    }),
    webSocketPublicClient,
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
  });

  return client;
}
