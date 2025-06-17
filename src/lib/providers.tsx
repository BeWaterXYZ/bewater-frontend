"use client";
import { createConfig, http, WagmiProvider, type Config } from "wagmi";
import { QueryProvider } from "../app/[lng]/query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, optimism } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";

const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  projectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || "60b8a3ddf0bd9d87c01e12e1ae4af6d3",
  networks: [mainnet, optimism],
});

export const modal = createAppKit({
  adapters: [wagmiAdapter],
  metadata: {
    name: "BeWater",
    description: "BeWater",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001",
    icons: [],
  },
  projectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || "60b8a3ddf0bd9d87c01e12e1ae4af6d3",
  networks: [mainnet, optimism],
  defaultNetwork: mainnet,
  features: {
    analytics: false,
    onramp: false,
    swaps: false,
    email: false,
    socials: false,
    emailShowWallets: false,
  },
  enableWalletGuide: false,
  enableWalletConnect: false,
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config}>
      <QueryProvider>
        {children}
      </QueryProvider>
    </WagmiProvider>
  );
};
