"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { useParams, useSearchParams } from "next/navigation";
import { 
  ArrowLeft, 
  Info, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  GitFork, 
  Eye, 
  Github, 
  MapPin, 
  Building2, 
  Globe, 
  Mail, 
  BookOpen, 
  Wallet, 
  ExternalLink,
  History,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  ArrowUpLeft,
  ArrowDownLeft
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import PageSwitcher from "@/app/[lng]/builderboard/page-switcher";

interface ChainAddress {
  chain: string;
  address: string;
}

interface GrantAddress {
  type: string;
  addresses: ChainAddress[];
}

interface ProjectInfo {
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  default_branch: string;
  created_at: string;
  updated_at: string;
  owner: {
    login: string;
    type: string;
    avatar_url: string;
  };
}

interface Donation {
  id: string;
  amount: number;
  currency: string;
  from: string;
  timestamp: string;
  txHash: string;
  type: string;
}

interface OwnerInfo {
  bio: string;
  name: string;
  avatar_url: string;
  location: string;
  company: string;
  blog: string;
  twitter_username: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  type: string;
}

export default function GrantPage({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = useTranslation(lng, "translation");
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const owner = params.owner as string;
  const repo = params.repo as string;
  const [grantAddress, setGrantAddress] = useState<GrantAddress | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [currentTab, setCurrentTab] = useState('all');

  // 从 API 获取项目信息
  const { data: projectData, isLoading: isProjectLoading } = useQuery({
    queryKey: ['project', owner, repo],
    queryFn: async () => {
      const response = await fetch(
        `/api/github/bio?username=${owner}&repo=${repo}&type=repo`,
        {
          headers: {
            'Accept': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch project');
      }
      return response.json();
    }
  });

  // 获取所有者信息
  const { data: ownerData, isLoading: isOwnerLoading, error: ownerError } = useQuery({
    queryKey: ['owner', owner],
    queryFn: async () => {
      const response = await fetch(
        `/api/github/bio?username=${owner}&type=bio`,
        {
          headers: {
            'Accept': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch owner');
      }
      return response.json();
    },
    onSuccess: (data) => {
      if (data.type === 'user') {
        const addressInfo = parseGrantAddress(data.bio || '');
        setGrantAddress(addressInfo);
      } else if (data.type === 'organization' && data.addresses) {
        setGrantAddress({
          type: 'grant',
          addresses: data.addresses
        });
      }
    }
  });

  // 使用 API 返回的项目信息
  const projectInfo: ProjectInfo = projectData || {
    name: repo,
    full_name: `${owner}/${repo}`,
    description: '',
    html_url: `https://github.com/${owner}/${repo}`,
    stargazers_count: 0,
    watchers_count: 0,
    forks_count: 0,
    language: '',
    topics: [],
    default_branch: 'main',
    created_at: '',
    updated_at: '',
    owner: {
      login: owner,
      type: 'User',
      avatar_url: ''
    }
  };

  // 解析地址信息
  const parseGrantAddress = (bio: string): GrantAddress | null => {
    try {
      const regex = /bewater:grant:([^|]+(?:\|[^|]+)*)/;
      const match = bio.match(regex);
      if (match) {
        const chainAddresses = match[1].split('|').map(pair => {
          const [chain, address] = pair.split(':');
          return { chain, address };
        });

        if (chainAddresses.length > 0) {
          return {
            type: 'grant',
            addresses: chainAddresses
          };
        }
      }
      return null;
    } catch (error) {
      console.error('Error parsing grant address:', error);
      return null;
    }
  };

  // 模拟捐赠历史数据
  const mockDonations: Donation[] = [
    {
      id: '1',
      amount: 1.5,
      currency: 'ETH',
      from: '0x1234...5678',
      timestamp: '2024-03-20T10:00:00Z',
      txHash: '0xabcd...efgh',
      type: 'received'
    },
    {
      id: '2',
      amount: 2.0,
      currency: 'ETH',
      from: '0x5678...1234',
      timestamp: '2024-03-19T10:00:00Z',
      txHash: '0xefgh...abcd',
      type: 'sent'
    }
  ];

  const handleBack = () => {
    router.back();
  };

  if (isOwnerLoading || isProjectLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00FFFF]"></div>
      </div>
    );
  }

  // 检查是否是组织项目
  if (ownerError) {
    return (
      <div className="container mx-auto py-12 px-4">
        <button
          onClick={handleBack}
          className="flex items-center text-[#00FFFF] hover:text-[#00FFFF80] mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Builderboard
        </button>
        <div className="bg-[#1E293B] rounded-lg p-8">
          <h1 className="text-2xl font-bold text-white mb-4">Error Loading Project</h1>
          <p className="text-[#94A3B8]">
            Failed to load project information. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 md:py-12 px-4">
      <button
        onClick={handleBack}
        className="flex items-center text-[#00FFFF] hover:text-[#00FFFF80] mb-6 md:mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Builderboard
      </button>

      {/* Project Header */}
      <div className="bg-[#0F172A] rounded-lg p-4 md:p-8 mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="flex-1 w-full">
            <div className="flex items-start md:items-center gap-4 mb-3">
              <img 
                src={projectInfo.owner.avatar_url} 
                alt={projectInfo.owner.login}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                  <h1 className="text-2xl md:text-3xl font-bold text-white truncate">{projectInfo.name}</h1>
                  <a
                    href={projectInfo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00FFFF] hover:text-[#00FFFF80] text-base md:text-lg flex items-center"
                  >
                    <Github className="w-4 h-4 md:w-5 md:h-5 mr-1" />
                    View on GitHub
                  </a>
                </div>
                <p className="text-[#94A3B8] text-sm md:text-base">by {projectInfo.owner.login}</p>
              </div>
            </div>
            <p className="text-[#94A3B8] text-base md:text-lg">{projectInfo.description}</p>
            {projectInfo.topics && projectInfo.topics.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {projectInfo.topics.map((topic, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-[#1E293B] text-[#94A3B8] rounded text-xs md:text-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4 md:space-x-6 w-full md:w-auto justify-start md:justify-start mt-4 md:mt-0">
            <div className="text-left">
              <p className="text-[#94A3B8] text-xs md:text-sm flex items-center mb-1">
                <Star className="w-3 h-3 md:w-4 md:h-4 mr-1 text-[#00FFFF]" />
                Stars
              </p>
              <p className="text-white text-xl md:text-2xl font-bold">
                {projectInfo.stargazers_count}
              </p>
            </div>
            <div className="text-left">
              <p className="text-[#94A3B8] text-xs md:text-sm flex items-center mb-1">
                <GitFork className="w-3 h-3 md:w-4 md:h-4 mr-1 text-[#00FFFF]" />
                Forks
              </p>
              <p className="text-white text-xl md:text-2xl font-bold">
                {projectInfo.forks_count}
              </p>
            </div>
            <div className="text-left">
              <p className="text-[#94A3B8] text-xs md:text-sm flex items-center mb-1">
                <Eye className="w-3 h-3 md:w-4 md:h-4 mr-1 text-[#00FFFF]" />
                Watchers
              </p>
              <p className="text-white text-xl md:text-2xl font-bold">
                {projectInfo.watchers_count}
              </p>
            </div>
          </div>
        </div>

        {/* Developer Info */}
        {ownerData && (
          <div className="border-t border-[#1E293B] pt-4 md:pt-6 mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl text-white mb-3 md:mb-4">
              {ownerData.type === 'organization' ? 'Organization Information' : 'Developer Information'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div className="bg-[#1E293B] p-3 md:p-4 rounded">
                <p className="text-white font-medium">{ownerData.name}</p>
                {ownerData.location && (
                  <p className="text-[#94A3B8] text-xs md:text-sm flex items-center mt-1">
                    <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1 text-[#00FFFF]" />
                    {ownerData.location}
                  </p>
                )}
                {ownerData.company && (
                  <p className="text-[#94A3B8] text-xs md:text-sm flex items-center mt-1">
                    <Building2 className="w-3 h-3 md:w-4 md:h-4 mr-1 text-[#00FFFF]" />
                    {ownerData.company}
                  </p>
                )}
                {ownerData.blog && (
                  <a 
                    href={ownerData.blog}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00FFFF] hover:text-[#00FFFF80] text-xs md:text-sm block flex items-center mt-1"
                  >
                    <Globe className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                    {ownerData.blog}
                  </a>
                )}
                {ownerData.type === 'organization' && ownerData.email && (
                  <p className="text-[#94A3B8] text-xs md:text-sm flex items-center mt-1">
                    <Mail className="w-3 h-3 md:w-4 md:h-4 mr-1 text-[#00FFFF]" />
                    {ownerData.email}
                  </p>
                )}
              </div>
              <div className="bg-[#1E293B] p-3 md:p-4 rounded">
                <div className="grid grid-cols-3 gap-3 md:gap-4 text-center">
                  <div>
                    <p className="text-white font-bold text-sm md:text-base">{ownerData.public_repos}</p>
                    <p className="text-[#94A3B8] text-xs md:text-sm">Repos</p>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm md:text-base">{ownerData.followers}</p>
                    <p className="text-[#94A3B8] text-xs md:text-sm">Followers</p>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm md:text-base">{ownerData.following}</p>
                    <p className="text-[#94A3B8] text-xs md:text-sm">Following</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grant Addresses Section */}
        <div className="border-t border-[#1E293B] pt-4 md:pt-6">
          <h2 className="text-lg md:text-xl text-white mb-2 flex items-center">
            <BookOpen className="w-4 h-4 md:w-5 md:h-5 mr-2 text-[#00FFFF]" />
            Grant Addresses
          </h2>
          <p className="text-[#94A3B8] text-xs md:text-sm mb-4 md:mb-6 flex items-center">
            <Info className="w-3 h-3 md:w-4 md:h-4 mr-2 text-[#00FFFF]" />
            {ownerData?.type === 'organization' ? (
              <>
                For organizations, add grant addresses in the README.md file of the organization&apos;s profile repository.{" "}
                <Link
                  href={`/${lng}/grant-protocol`}
                  className="text-[#00FFFF] hover:text-[#00FFFF80] underline ml-1"
                >
                  Learn more
                </Link>
              </>
            ) : (
              <>
                Learn about the grant address protocol and how to use it.{" "}
                <Link
                  href={`/${lng}/grant-protocol`}
                  className="text-[#00FFFF] hover:text-[#00FFFF80] underline ml-1"
                >
                  Learn more
                </Link>
              </>
            )}
          </p>
          {grantAddress ? (
            <div className="space-y-3 md:space-y-4">
              {grantAddress.addresses.map((addr, index) => (
                <div key={index} className="bg-[#1E293B] p-3 md:p-4 rounded">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-white break-all text-sm md:text-base">{addr.address}</p>
                      <p className="text-[#00FFFF] text-xs md:text-sm mt-1 font-medium">
                        Chain: {addr.chain}
                      </p>
                    </div>
                    <button 
                      className="bg-[#00FFFF] text-black font-bold py-2 px-4 rounded-md hover:bg-[#00FFFF80] transition-colors text-xs md:text-sm flex items-center justify-center whitespace-nowrap"
                      onClick={() => {
                        // TODO: 根据不同的链调用对应的钱包
                        console.log(`Funding on ${addr.chain} chain`);
                      }}
                    >
                      <Wallet className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                      Grant
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#1E293B] p-3 md:p-4 rounded">
              <p className="text-[#94A3B8] text-sm md:text-base">
                {ownerData?.type === 'organization' 
                  ? "No grant address found in organization&apos;s README.md file"
                  : "No grant address found in project owner's bio"}
              </p>
              {ownerData?.type === 'organization' && (
                <div className="mt-3 md:mt-4 text-xs md:text-sm">
                  <p className="text-[#94A3B8] mb-2">To add grant addresses:</p>
                  <ol className="list-decimal list-inside text-[#94A3B8] space-y-1">
                    <li>Go to your organization&apos;s profile repository</li>
                    <li>Edit the README.md file</li>
                    <li>Add the grant address in the format: <code className="bg-[#0F172A] px-2 py-1 rounded">bewater:grant:chain:address</code></li>
                    <li>Save the changes</li>
                  </ol>
                </div>
              )}
            </div>
          )}
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
            onClick={() => setCurrentTab('all')}
            className={`px-4 py-2 text-sm md:text-base font-medium ${
              currentTab === 'all'
                ? 'text-[#00FFFF] border-b-2 border-[#00FFFF]'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            All Grants
          </button>
          <button
            onClick={() => setCurrentTab('my')}
            className={`px-4 py-2 text-sm md:text-base font-medium ${
              currentTab === 'my'
                ? 'text-[#00FFFF] border-b-2 border-[#00FFFF]'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            My Grants
          </button>
        </div>

        <div className="space-y-3 md:space-y-4">
          {mockDonations.map((donation) => (
            <div key={donation.id} className="bg-[#1E293B] p-3 md:p-4 rounded">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-white font-medium text-sm md:text-base">{donation.amount} {donation.currency}</p>
                    {currentTab === 'my' && (
                      <span className={`text-xs px-2 py-0.5 rounded flex items-center gap-1 ${
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
                    )}
                  </div>
                  <p className="text-[#94A3B8] text-xs md:text-sm">
                    {currentTab === 'my' 
                      ? `${donation.type === 'sent' ? 'To: ' : 'From: '}${donation.from}`
                      : `From: ${donation.from}`
                    }
                  </p>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-[#94A3B8] text-xs md:text-sm flex items-center">
                    <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-1 text-[#00FFFF]" />
                    {new Date(donation.timestamp).toLocaleDateString()}
                  </p>
                  <a
                    href={`https://etherscan.io/tx/${donation.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00FFFF] hover:text-[#00FFFF80] text-xs md:text-sm flex items-center mt-1"
                  >
                    <ExternalLink className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                    View Transaction
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <PageSwitcher
          currentPage={currentPage}
          rowsPerPage={itemsPerPage}
          totalRows={mockDonations.length}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
} 