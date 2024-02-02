"use client";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

const tab =
  "w-[160px] h-[36px] font-secondary font-bold text-[20px] leading-[26px] text-center border-b-[3px]";
const activeTab = "text-white border-[#00FFFF]";
const inactiveTab = "text-[#FFFFFF80] border-transparent";
const currentTopic = "text-[#00FFFF]";

const tempTopicList = [
  "Token & NFT",
  "DeFi",
  "Nfrastructure",
  "Gaming",
  "Social",
  "Wallet",
  "B2B",
  "Metaverse",
  "DAO",
];

export default function Leaderboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment();
  return (
    <div className="mb-[160px] min-w-[960px] font-secondary">
      <div className="h-[72px] mx-[152px] mb-[72px] flex justify-center">
        <Image
          src="/logo/bewater-h.svg"
          width={112}
          height={22}
          alt="bewater logo"
        />
      </div>
      <div className="mb-[60px] font-primary font-bold text-[36px] leading-[50px] text-white text-center">
        Web3 Top Ranking
      </div>
      <div className="flex justify-center mb-[70px]">
        <Link
          href="developers"
          className={`${tab} ${
            segment === "developers" ? activeTab : inactiveTab
          }`}
        >
          Developers
        </Link>
        <Link
          href="projects"
          className={`${tab} ${
            segment === "projects" ? activeTab : inactiveTab
          }`}
        >
          Projects
        </Link>
      </div>
      <div className="w-[1104px] mx-auto">
        <div className="flex gap-6 text-sm font-bold leading-5 text-gray-500 cursor-pointer">
          <p className={currentTopic}>All</p>
          {tempTopicList.map((topic, index) => (
            <p key={index} className="hover:text-gray-300 transition-colors">{topic}</p>
          ))}
        </div>
        <div className="mt-[70px]">{children}</div>
      </div>
    </div>
  );
}
