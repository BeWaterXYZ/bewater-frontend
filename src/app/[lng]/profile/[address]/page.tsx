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

interface Donation {
  id: string;
  amount: number;
  currency: string;
  from: string;
  to: string;
  timestamp: string;
  txHash: string;
  type: string;
  project: {
    name: string;
    owner: string;
    avatar_url: string;
    description: string;
  };
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

  // 模拟捐赠历史数据
  const mockDonations: Donation[] = [
    {
      id: '1',
      amount: 1.5,
      currency: 'ETH',
      from: '0x1234...5678',
      to: address,
      timestamp: '2024-03-20T10:00:00Z',
      txHash: '0xabcd...efgh',
      type: 'received',
      project: {
        name: 'example-repo',
        owner: 'example-org',
        avatar_url: 'https://github.com/example-org.png',
        description: 'An example repository'
      }
    },
    {
      id: '2',
      amount: 2.0,
      currency: 'ETH',
      from: address,
      to: '0x5678...1234',
      timestamp: '2024-03-19T10:00:00Z',
      txHash: '0xefgh...abcd',
      type: 'sent',
      project: {
        name: 'another-repo',
        owner: 'another-org',
        avatar_url: 'https://github.com/another-org.png',
        description: 'Another example repository'
      }
    }
  ];

  const handleBack = () => {
    router.back();
  };

  const handleProjectClick = (owner: string, repo: string) => {
    router.push(`/${lng}/grant/${owner}/${repo}`);
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

      {/* Grant History Section */}
      <div className="bg-[#0F172A] rounded-lg p-4 md:p-6">
        <h2 className="text-lg md:text-xl text-white mb-4 md:mb-6 flex items-center">
          <History className="w-4 h-4 md:w-5 md:h-5 mr-2 text-[#00FFFF]" />
          Grant History
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

        <div className="space-y-3 md:space-y-4">
          {mockDonations
            .filter(donation => donation.type === currentTab)
            .map((donation) => (
            <div 
              key={donation.id} 
              className="bg-[#1E293B] rounded-lg overflow-hidden cursor-pointer hover:bg-[#2E3B4C] transition-colors"
              onClick={() => handleProjectClick(donation.project.owner, donation.project.name)}
            >
              <div className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Left: Project Info */}
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <Image 
                      src={donation.project.avatar_url} 
                      alt={donation.project.owner}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-white font-medium text-base md:text-lg truncate">
                          {donation.project.owner}/{donation.project.name}
                        </p>
                        <Github className="w-4 h-4 text-[#94A3B8] flex-shrink-0" />
                      </div>
                      <p className="text-[#94A3B8] text-sm truncate">
                        {donation.project.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Transaction Info */}
                  <div className="flex flex-col items-start md:items-end gap-2 flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium text-lg">
                        {donation.amount} {donation.currency}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                        donation.type === 'sent' 
                          ? 'bg-[#FF4D4D20] text-[#FF4D4D]' 
                          : 'bg-[#00FFFF20] text-[#00FFFF]'
                      }`}>
                        {donation.type === 'sent' ? (
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
                        {donation.type === 'sent' 
                          ? `To: ${donation.to}`
                          : `From: ${donation.from}`
                        }
                      </p>
                      <div className="flex items-center gap-2 text-[#94A3B8] text-sm">
                        <Calendar className="w-4 h-4 text-[#00FFFF]" />
                        <span>{new Date(donation.timestamp).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <a
                      href={`https://etherscan.io/tx/${donation.txHash}`}
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

        {/* Pagination */}
        <PageSwitcher
          currentPage={currentPage}
          rowsPerPage={itemsPerPage}
          totalRows={mockDonations.filter(d => d.type === currentTab).length}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
} 