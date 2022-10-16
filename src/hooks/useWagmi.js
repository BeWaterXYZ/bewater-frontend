import { createClient, defaultChains, configureChains } from 'wagmi';
import { useEffect, useState } from 'react';
import { publicProvider } from 'wagmi/providers/public';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

export default function useWagmi() {
  const [wagmiClient, setWagmiClient] = useState();

  useEffect(() => {
    // Configure chains & providers with the Alchemy provider.
    // Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
    const { chains, provider, webSocketProvider } = configureChains(
      defaultChains,
      [publicProvider()],
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

    setWagmiClient(client);
  }, []);

  return { wagmiClient };
}
