"use client";

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Button } from "@/components/ui/button";
import { Wallet, LogOut, ChevronDown } from "lucide-react";
import { useAppKit } from '@reown/appkit/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useState } from 'react';

export const WalletConnect = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();
  const [openMenu, setOpenMenu] = useState(false);

  const handleConnect = async () => {
    try {
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
      <DropdownMenu open={openMenu} onOpenChange={setOpenMenu}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="text-day hover:bg-white/10 h-10 px-4 w-[180px] justify-between hidden md:flex">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              <span className="text-sm font-medium">
                {address.slice(0, 6)}...{address.slice(-6)}
              </span>
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform duration-200",
              openMenu ? "rotate-180" : ""
            )} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className={cn(
            "w-[180px] bg-[#25263C] border-[#FFF2]",
            "data-[state=open]:animate-zoom-in data-[state=closed]:animate-zoom-out",
            "data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out"
          )}
          sideOffset={8}
        >
          <DropdownMenuItem 
            onClick={handleDisconnect} 
            className="text-red-500 hover:bg-[#FFF2] focus:bg-[#FFF2] text-sm"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Disconnect</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      className="btn btn-primary-invert h-10 py-4 px-8 uppercase body-4 text-day flex items-center gap-2 hidden md:flex"
    >
      <Wallet className="w-4 h-4" />
      Connect Wallet
    </Button>
  );
}; 