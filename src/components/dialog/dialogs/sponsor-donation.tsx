"use client";

import { useEffect, useState, useRef } from "react";
import { useTranslation } from "@/app/i18n/client";
import { Wallet, ExternalLink, ChevronDown, Check, X, ChevronUp, ChevronDown as ChevronDownIcon, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import { cn } from "@/lib/utils";
import { useAccount, useSendTransaction, useWaitForTransactionReceipt, useWriteContract, useChainId, useSwitchChain } from 'wagmi';
import { parseEther, parseUnits } from 'viem';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { USDT_CONTRACTS, USDT_ABI } from '@/constants/tokens';

interface SponsorDonationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  address: string;
  chain: string;
  projectOwner: string;
  projectName: string;
}

export function SponsorDonationDialog({
  open,
  onOpenChange,
  address,
  chain,
  projectOwner,
  projectName
}: SponsorDonationDialogProps) {
  const [amount, setAmount] = useState('');
  const [selectedChain, setSelectedChain] = useState('ethereum');
  const [selectedCurrency, setSelectedCurrency] = useState('ETH');
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const { t } = useTranslation('en', 'translation');
  const { address: userAddress } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const queryClient = useQueryClient();
  const hasProcessedRef = useRef(false);
  const [isRecordCreating, setIsRecordCreating] = useState(false);
  const [isSendingTransaction, setIsSendingTransaction] = useState(false);
  const [isTransactionError, setIsTransactionError] = useState(false);

  // 重置状态
  useEffect(() => {
    if (open) {
      setAmount('');
      setSelectedChain('ethereum');
      setSelectedCurrency('ETH');
      setIsRecordCreating(false);
      setIsTransactionError(false);
      setIsSendingTransaction(false);
      hasProcessedRef.current = false;
    }
  }, [open]);

  // 监听链切换
  useEffect(() => {
    console.log('chainId', chainId);
    if (chainId) {
      if (chainId === 1) {
        setSelectedChain('ethereum');
      } else if (chainId === 10) {
        setSelectedChain('optimism');
      }
    }
  }, [chainId]);

  const createTransactionMutation = useMutation({
    mutationFn: async (data: {
      txHash: string;
      fromAddress: string;
      toAddress: string;
      amount: string;
      currency: string;
      decimals: number;
      chain: string;
      projectOwner: string;
      projectName: string;
    }) => {
      const response = await fetch('/api/sponsor/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create transaction record');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sponsorTransactions'] });
      toast.success('Sponsor record created successfully');
      setIsRecordCreating(false);
    },
    onError: (error: Error) => {
      toast.error(error.message);
      setIsRecordCreating(false);
    },
  });

  const { sendTransaction, data: hash, error: transactionError } = useSendTransaction();

  // USDT contract write
  const { writeContract: writeUSDT, data: usdtHash, error: usdtError } = useWriteContract();

  const { isLoading: isTransactionLoading, isSuccess: isTransactionSuccess, data: receipt } = useWaitForTransactionReceipt({
    hash: selectedCurrency === 'ETH' ? hash : usdtHash,
  });

  // 监听交易错误
  useEffect(() => {
    if (transactionError || usdtError) {
      setIsTransactionError(true);
      setIsSendingTransaction(false);
      toast.error('Transaction failed. Please try again.');
    }
  }, [transactionError, usdtError]);

  // 监听交易成功
  useEffect(() => {
    if (isTransactionSuccess && receipt && !hasProcessedRef.current) {
      hasProcessedRef.current = true;
      setIsSendingTransaction(false);
      setIsRecordCreating(true);
      createTransactionMutation.mutate({
        txHash: receipt.transactionHash,
        fromAddress: userAddress as string,
        toAddress: address,
        amount: amount,
        currency: selectedCurrency,
        decimals: selectedCurrency === 'ETH' ? 18 : 6,
        chain: chain,
        projectOwner: projectOwner,
        projectName: projectName,
      });
    }
  }, [isTransactionSuccess, receipt, userAddress, createTransactionMutation, amount, projectOwner, projectName, address, chain, selectedCurrency]);

  const handleDonate = async () => {
    setIsSendingTransaction(true);
    if (!userAddress) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid donation amount');
      return;
    }

    try {
      console.log('selectedChain', selectedChain);
      console.log('chainId', chainId);
      // 检查并切换网络
      if (selectedChain === 'ethereum' && chainId !== 1) {
        try {
          await switchChain({ chainId: 1 });
          toast.success('Switched to Ethereum network');
        } catch (error) {
          toast.error('Failed to switch to Ethereum network');
          setIsSendingTransaction(false);
          return;
        }
      } else if (selectedChain === 'optimism' && chainId !== 10) {
        try {
          await switchChain({ chainId: 10 });
          toast.success('Switched to Optimism network');
        } catch (error) {
          toast.error('Failed to switch to Optimism network');
          setIsSendingTransaction(false);
          return;
        }
      }

      if (selectedCurrency === 'ETH') {
        sendTransaction({
          to: address as `0x${string}`,
          value: parseEther(amount),
        });
      } else if (selectedCurrency === 'USDT') {
        writeUSDT({
          abi: USDT_ABI,
          address: USDT_CONTRACTS[selectedChain as keyof typeof USDT_CONTRACTS] as `0x${string}`,
          functionName: 'transfer',
          args: [address as `0x${string}`, parseUnits(amount, 6)],
        });
      }
    } catch (error) {
      toast.error('Failed to send transaction');
      console.error('Failed to send transaction:', error);
      setIsSendingTransaction(false);
    }
  };

  const handleClose = () => {
    if (isSendingTransaction || isRecordCreating) {
      setShowCloseConfirm(true);
    } else {
      onOpenChange(false);
    }
  };

  const handleConfirmClose = () => {
    setShowCloseConfirm(false);
    onOpenChange(false);
  };

  const handleCancelClose = () => {
    setShowCloseConfirm(false);
  };

  // EVM 链选项
  const evmChains = [
    { value: 'ethereum', label: 'Ethereum', disabled: false },
    { value: 'polygon', label: 'Polygon', disabled: true },
    { value: 'arbitrum', label: 'Arbitrum', disabled: true },
    { value: 'optimism', label: 'Optimism', disabled: false },
    { value: 'base', label: 'Base', disabled: true }
  ];

  return (
    <Dialog.Root open={open} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#0F172A] rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-bold text-white">
              Sponsor Project
            </Dialog.Title>
            <Dialog.Close className="text-[#94A3B8] hover:text-white">
              <span className="sr-only">Close</span>
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>

          {/* Close Confirmation Dialog */}
          {showCloseConfirm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-[#0F172A] rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-[#FF4D4D]" />
                  <h3 className="text-lg font-bold text-white">Confirm Close</h3>
                </div>
                <p className="text-[#94A3B8] mb-6">
                  There is an ongoing transaction. Are you sure you want to close this dialog? The transaction will continue in the background.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={handleCancelClose}
                    className="px-4 py-2 text-[#94A3B8] hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmClose}
                    className="px-4 py-2 bg-[#FF4D4D] text-white rounded-md hover:bg-[#FF4D4D80] transition-colors"
                  >
                    Close Anyway
                  </button>
                </div>
              </div>
            </div>
          )}

          <Dialog.Description className="text-[#94A3B8] text-sm mb-6">
            Support this project by sending a donation.
          </Dialog.Description>

          <div className="space-y-4">
            <div>
              <label className="block text-[#94A3B8] text-sm mb-2">Recipient Address</label>
              <div className="p-2 bg-[#1E293B] rounded-md">
                <p className="text-white text-sm break-all">{address}</p>
              </div>
            </div>

            <div>
              <label className="block text-[#94A3B8] text-sm mb-2">Chain</label>
              <div className="p-2 bg-[#1E293B] rounded-md">
                <p className="text-white text-sm">{chain}</p>
              </div>
            </div>

            {!hash && !usdtHash && (
              <>
                {chain === 'evm' && (
                  <>
                    <div>
                      <label className="block text-[#94A3B8] text-sm mb-2">Select EVM Chain</label>
                      <Select.Root value={selectedChain} onValueChange={setSelectedChain}>
                        <Select.Trigger className="w-full bg-[#1E293B] text-white px-3 py-2 rounded text-sm flex justify-between items-center">
                          <Select.Value placeholder="Select chain" />
                          <Select.Icon>
                            <ChevronDown className="w-4 h-4" />
                          </Select.Icon>
                        </Select.Trigger>
                        <Select.Portal>
                          <Select.Content 
                            className={cn(
                              "bg-[#1E293B] text-white rounded-md shadow-lg overflow-hidden",
                              "data-[state=open]:animate-slide-in-from-top",
                              "data-[state=closed]:animate-slide-out-to-top",
                              "duration-200"
                            )}
                            sideOffset={4}
                          >
                            <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-[#1E293B] cursor-default">
                              <ChevronDown className="w-4 h-4 rotate-180" />
                            </Select.ScrollUpButton>
                            <Select.Viewport className="p-1">
                              {evmChains.map((chain) => (
                                <Select.Item
                                  key={chain.value}
                                  value={chain.value}
                                  disabled={chain.disabled}
                                  className={cn(
                                    "relative flex items-center px-8 py-2 text-sm rounded-sm select-none",
                                    "transition-colors duration-200 ease-in-out",
                                    !chain.disabled && "cursor-pointer hover:bg-[#0F172A] focus:bg-[#0F172A] focus:outline-none",
                                    "data-[highlighted]:bg-[#0F172A] data-[highlighted]:text-white",
                                    "data-[state=checked]:bg-[#0F172A] data-[state=checked]:text-white",
                                    "disabled:opacity-40 disabled:cursor-not-allowed",
                                    chain.disabled && "!text-[#94A3B8] data-[state=checked]:!text-[#94A3B8] data-[highlighted]:!text-[#94A3B8]"
                                  )}
                                >
                                  <Select.ItemText className={cn(
                                    "flex items-center justify-between w-full",
                                    chain.disabled && "!text-[#94A3B8]"
                                  )}>
                                    <span>{chain.label}</span>
                                    {chain.disabled && (
                                      <span className="text-xs text-[#94A3B8] ml-2">Coming Soon</span>
                                    )}
                                  </Select.ItemText>
                                  <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                                    <Check className="w-4 h-4" />
                                  </Select.ItemIndicator>
                                </Select.Item>
                              ))}
                            </Select.Viewport>
                            <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-[#1E293B] cursor-default">
                              <ChevronDown className="w-4 h-4" />
                            </Select.ScrollDownButton>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                    </div>
                    <div>
                      <label className="block text-[#94A3B8] text-sm mb-2">Select Currency</label>
                      <Select.Root value={selectedCurrency} onValueChange={setSelectedCurrency}>
                        <Select.Trigger className="w-full bg-[#1E293B] text-white px-3 py-2 rounded text-sm flex justify-between items-center">
                          <Select.Value placeholder="Select currency" />
                          <Select.Icon>
                            <ChevronDown className="w-4 h-4" />
                          </Select.Icon>
                        </Select.Trigger>
                        <Select.Portal>
                          <Select.Content 
                            className={cn(
                              "bg-[#1E293B] text-white rounded-md shadow-lg overflow-hidden",
                              "data-[state=open]:animate-slide-in-from-top",
                              "data-[state=closed]:animate-slide-out-to-top",
                              "duration-200"
                            )}
                            sideOffset={4}
                          >
                            <Select.Viewport className="p-1">
                              <Select.Item
                                value="ETH"
                                className={cn(
                                  "relative flex items-center px-8 py-2 text-sm rounded-sm select-none",
                                  "cursor-pointer hover:bg-[#0F172A] focus:bg-[#0F172A] focus:outline-none",
                                  "data-[highlighted]:bg-[#0F172A] data-[highlighted]:text-white",
                                  "data-[state=checked]:bg-[#0F172A] data-[state=checked]:text-white"
                                )}
                              >
                                <Select.ItemText>ETH</Select.ItemText>
                                <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                                  <Check className="w-4 h-4" />
                                </Select.ItemIndicator>
                              </Select.Item>
                              <Select.Item
                                value="USDT"
                                className={cn(
                                  "relative flex items-center px-8 py-2 text-sm rounded-sm select-none",
                                  "cursor-pointer hover:bg-[#0F172A] focus:bg-[#0F172A] focus:outline-none",
                                  "data-[highlighted]:bg-[#0F172A] data-[highlighted]:text-white",
                                  "data-[state=checked]:bg-[#0F172A] data-[state=checked]:text-white"
                                )}
                              >
                                <Select.ItemText>USDT</Select.ItemText>
                                <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                                  <Check className="w-4 h-4" />
                                </Select.ItemIndicator>
                              </Select.Item>
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                    </div>
                    <div>
                      <label className="block text-[#94A3B8] text-sm mb-2">Donation Amount ({selectedCurrency})</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={amount}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
                          placeholder="Enter amount"
                          className="w-full bg-[#1E293B] text-white px-3 py-2 rounded text-sm pr-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          min="0"
                          step={selectedCurrency === 'ETH' ? "0.0001" : "0.01"}
                        />
                        <div className="absolute right-0 top-0 h-full flex flex-col border-l border-[#334155]">
                          <button
                            type="button"
                            onClick={() => {
                              const currentValue = parseFloat(amount) || 0;
                              const step = selectedCurrency === 'ETH' ? 0.0001 : 0.01;
                              setAmount((currentValue + step).toFixed(selectedCurrency === 'ETH' ? 4 : 2));
                            }}
                            className="flex-1 px-2 hover:bg-[#0F172A] transition-colors flex items-center justify-center border-b border-[#334155]"
                          >
                            <ChevronUp className="w-4 h-4 text-[#94A3B8]" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const currentValue = parseFloat(amount) || 0;
                              const step = selectedCurrency === 'ETH' ? 0.0001 : 0.01;
                              if (currentValue >= step) {
                                setAmount((currentValue - step).toFixed(selectedCurrency === 'ETH' ? 4 : 2));
                              }
                            }}
                            className="flex-1 px-2 hover:bg-[#0F172A] transition-colors flex items-center justify-center"
                          >
                            <ChevronDownIcon className="w-4 h-4 text-[#94A3B8]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {(hash || usdtHash) && (
              <div>
                <label className="block text-[#94A3B8] text-sm mb-2">Transaction Hash</label>
                <div className="p-2 bg-[#1E293B] rounded-md">
                  <p className="text-white text-sm break-all">{hash || usdtHash}</p>
                  <a
                    href={`https://etherscan.io/tx/${hash || usdtHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00FFFF] hover:text-[#00FFFF80] text-xs flex items-center mt-2"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View on Etherscan
                  </a>
                </div>
              </div>
            )}

            {isTransactionError && (
              <div className="p-3 bg-[#FF4D4D20] rounded-md">
                <p className="text-[#FF4D4D] text-sm">
                  Transaction failed. Please try again.
                </p>
              </div>
            )}

            {isTransactionSuccess && !isRecordCreating && (
              <div className="p-3 bg-[#00FFFF20] rounded-md">
                <p className="text-[#00FFFF] text-sm">
                  Transaction successful! Record has been created.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6">
            <button
              className="w-full bg-[#00FFFF] text-black font-bold py-2 px-4 rounded-md hover:bg-[#00FFFF80] transition-colors text-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                if (isTransactionSuccess && !isRecordCreating) {
                  onOpenChange(false);
                } else {
                  handleDonate();
                }
              }}
              disabled={isSendingTransaction || isRecordCreating || (!isTransactionSuccess && (!amount || parseFloat(amount) <= 0))}
            >
              {isSendingTransaction ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-black mr-2" />
                  Processing Transaction...
                </>
              ) : isRecordCreating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-black mr-2" />
                  Creating Record...
                </>
              ) : isTransactionSuccess ? (
                <>
                  Close
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4 mr-2" />
                  Confirm Donation
                </>
              )}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
} 