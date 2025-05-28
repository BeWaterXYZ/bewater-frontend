"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  History,
  Calendar,
  ExternalLink,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  Info,
  Github
} from "lucide-react";
import { useRouter } from "next/navigation";
import PageSwitcher from "@/app/[lng]/builderboard/page-switcher";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

interface SponsorTransaction {
  id: string;
  txHash: string;
  fromAddress: string;
  toAddress: string;
  amount: string;
  currency: string;
  decimals: number;
  chain: string;
  projectOwner: string;
  projectName: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  createdAt: string;
  updatedAt: string;
}

interface PaginationInfo {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export default function ProfilePage({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = useTranslation(lng, "translation");
  const router = useRouter();
  const params = useParams();
  const address = params.address as string;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [currentTab, setCurrentTab] = useState('received');

  // 获取赞助记录
  const { data: sponsorData, isLoading: isSponsorLoading } = useQuery({
    queryKey: ['sponsorTransactions', address, currentPage, currentTab],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        pageSize: itemsPerPage.toString(),
        ...(currentTab === 'sent' ? { fromAddress: address } : { toAddress: address }),
      });

      const response = await fetch(`/api/sponsor/transactions?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch sponsor transactions');
      }
      return response.json();
    },
  });

  const transactions: SponsorTransaction[] = sponsorData?.transactions || [];
  const pagination: PaginationInfo = sponsorData?.pagination || {
    total: 0,
    page: 1,
    pageSize: itemsPerPage,
    totalPages: 1,
  };

  const handleBack = () => {
    router.back();
  };

  const handleProjectClick = (owner: string, repo: string) => {
    router.push(`/${lng}/sponsor/${owner}/${repo}`);
  };

  return (
    <div className="container mx-auto py-6 md:py-12 px-4 max-w-6xl">
      <button
        onClick={handleBack}
        className="flex items-center text-[#00FFFF] hover:text-[#00FFFF80] mb-6 md:mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>

      {/* Profile Header */}
      <div className="bg-[#0F172A] rounded-lg p-4 md:p-8 mb-6 md:mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-[#1E293B] rounded-full flex items-center justify-center">
            <Wallet className="w-8 h-8 text-[#00FFFF]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Wallet Profile</h1>
            <p className="text-[#94A3B8] text-sm md:text-base break-all">{address}</p>
          </div>
        </div>
      </div>

      {/* Sponsor History Section */}
      <div className="bg-[#0F172A] rounded-lg p-4 md:p-6">
        <h2 className="text-lg md:text-xl text-white mb-4 md:mb-6 flex items-center">
          <History className="w-4 h-4 md:w-5 md:h-5 mr-2 text-[#00FFFF]" />
          Sponsor History
        </h2>

        {/* Tabs */}
        <div className="flex border-b border-[#1E293B] mb-4">
          <button
            onClick={() => setCurrentTab('received')}
            className={`px-4 py-2 text-sm md:text-base font-medium ${
              currentTab === 'received'
                ? 'text-[#00FFFF] border-b-2 border-[#00FFFF]'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            Received
          </button>
          <button
            onClick={() => setCurrentTab('sent')}
            className={`px-4 py-2 text-sm md:text-base font-medium ${
              currentTab === 'sent'
                ? 'text-[#00FFFF] border-b-2 border-[#00FFFF]'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            Sent
          </button>
        </div>

        {isSponsorLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00FFFF]"></div>
          </div>
        ) : transactions.length > 0 ? (
          <div className="space-y-3 md:space-y-4">
            {transactions.map((transaction) => (
              <div 
                key={transaction.id} 
                className="bg-[#1E293B] rounded-lg overflow-hidden cursor-pointer hover:bg-[#2E3B4C] transition-colors"
                onClick={() => handleProjectClick(transaction.projectOwner, transaction.projectName)}
              >
                <div className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Left: Project Info */}
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 bg-[#0F172A] rounded-full flex items-center justify-center flex-shrink-0">
                        <Github className="w-5 h-5 text-[#00FFFF]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-white font-medium text-base md:text-lg truncate">
                            {transaction.projectOwner}/{transaction.projectName}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right: Transaction Info */}
                    <div className="flex flex-col items-start md:items-end gap-2 flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium text-lg">
                          {transaction.amount} {transaction.currency}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                          transaction.fromAddress === address
                            ? 'bg-[#FF4D4D20] text-[#FF4D4D]' 
                            : 'bg-[#00FFFF20] text-[#00FFFF]'
                        }`}>
                          {transaction.fromAddress === address ? (
                            <>
                              <ArrowUpRight className="w-3 h-3" />
                              Sent
                            </>
                          ) : (
                            <>
                              <ArrowDownLeft className="w-3 h-3" />
                              Received
                            </>
                          )}
                        </span>
                      </div>
                      <div className="flex flex-col items-start md:items-end gap-1">
                        <p className="text-[#94A3B8] text-sm">
                          {transaction.fromAddress === address
                            ? `To: ${transaction.toAddress}`
                            : `From: ${transaction.fromAddress}`
                          }
                        </p>
                        <div className="flex items-center gap-2 text-[#94A3B8] text-sm">
                          <Calendar className="w-4 h-4 text-[#00FFFF]" />
                          <span>{new Date(transaction.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <a
                        href={`https://etherscan.io/tx/${transaction.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#00FFFF] hover:text-[#00FFFF80] text-sm transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" />
                        View on Etherscan
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-[#94A3B8]">No sponsor transactions found</p>
          </div>
        )}

        {/* Pagination */}
        <PageSwitcher
          currentPage={currentPage}
          rowsPerPage={itemsPerPage}
          totalRows={pagination.total}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
} 