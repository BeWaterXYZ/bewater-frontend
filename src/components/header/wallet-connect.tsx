"use client";

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { injected } from 'wagmi/connectors';
import { useAppKit } from '@reown/appkit/react';

export const WalletConnect = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();

  const handleConnect = async () => {
    try {
      // 使用 injected 连接器，这会显示钱包选择弹窗
      // const connector = injected();
      // await connect({ connector });
      open();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
    }
  };

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-200">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDisconnect}
          className="text-white border-white hover:bg-white/10"
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      className="flex items-center gap-2 bg-white text-black hover:bg-white/90"
    >
      <Wallet className="w-4 h-4" />
      Connect Wallet
    </Button>
  );
}; 