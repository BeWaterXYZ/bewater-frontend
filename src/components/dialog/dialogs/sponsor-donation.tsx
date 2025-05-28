"use client";

import { useEffect, useState, useRef } from "react";
import { useTranslation } from "@/app/i18n/client";
import { Wallet, ExternalLink, ChevronDown, Check, X, ChevronUp, ChevronDown as ChevronDownIcon } from "lucide-react";
import { toast } from "sonner";
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import { cn } from "@/lib/utils";
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
  const { t } = useTranslation('en', 'translation');
  const { address: userAddress } = useAccount();
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
      setIsRecordCreating(false);
      setIsTransactionError(false);
      setIsSendingTransaction(false);
      hasProcessedRef.current = false;
    }
  }, [open]);

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

  const { isLoading: isTransactionLoading, isSuccess: isTransactionSuccess, data: receipt } = useWaitForTransactionReceipt({
    hash,
  });

  // 监听交易错误
  useEffect(() => {
    if (transactionError) {
      setIsTransactionError(true);
      toast.error('Transaction failed. Please try again.');
    }
  }, [transactionError]);

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
        currency: 'ETH',
        decimals: 18,
        chain: chain,
        projectOwner: projectOwner,
        projectName: projectName,
      });
    }
  }, [isTransactionSuccess, receipt, userAddress, createTransactionMutation, amount, projectOwner, projectName, address, chain]);

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
      // 目前只支持以太坊，其他 EVM 链的支持将在后续添加
      if (selectedChain && selectedChain !== 'ethereum') {
        toast.error('Currently only Ethereum is supported. Other EVM chains will be supported soon.');
        return;
      }

      sendTransaction({
        to: address as `0x${string}`,
        value: parseEther(amount),
      });
    } catch (error) {
      toast.error('Failed to send transaction');
      console.error('Failed to send transaction:', error);
    }
  };

  const handleClose = () => {
    if (isSendingTransaction || isRecordCreating) {
      toast.error('Transaction is in progress. Please wait for it to complete.');
      return;
    }
    onOpenChange(false);
  };

  // EVM 链选项
  const evmChains = [
    { value: 'ethereum', label: 'Ethereum', disabled: false },
    { value: 'polygon', label: 'Polygon', disabled: true },
    { value: 'arbitrum', label: 'Arbitrum', disabled: true },
    { value: 'optimism', label: 'Optimism', disabled: true },
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

            {!hash && (
              <>
                {chain === 'evm' && (
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
                )}
                <div>
                  <label className="block text-[#94A3B8] text-sm mb-2">Donation Amount (ETH)</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full bg-[#1E293B] text-white px-3 py-2 rounded text-sm pr-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      min="0"
                      step="0.0001"
                    />
                    <div className="absolute right-0 top-0 h-full flex flex-col border-l border-[#334155]">
                      <button
                        type="button"
                        onClick={() => {
                          const currentValue = parseFloat(amount) || 0;
                          setAmount((currentValue + 0.0001).toFixed(4));
                        }}
                        className="flex-1 px-2 hover:bg-[#0F172A] transition-colors flex items-center justify-center border-b border-[#334155]"
                      >
                        <ChevronUp className="w-4 h-4 text-[#94A3B8]" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const currentValue = parseFloat(amount) || 0;
                          if (currentValue >= 0.0001) {
                            setAmount((currentValue - 0.0001).toFixed(4));
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

            {hash && (
              <div>
                <label className="block text-[#94A3B8] text-sm mb-2">Transaction Hash</label>
                <div className="p-2 bg-[#1E293B] rounded-md">
                  <p className="text-white text-sm break-all">{hash}</p>
                  <a
                    href={`https://etherscan.io/tx/${hash}`}
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