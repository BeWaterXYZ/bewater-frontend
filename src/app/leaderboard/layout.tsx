"use client";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

const tab =
  "w-[160px] h-[36px] font-secondary font-bold text-[20px] leading-[26px] text-center border-b-[3px]";
const activeTab = "text-white border-[#00FFFF]";
const inactiveTab = "text-[#FFFFFF80] border-transparent";

export default function Leaderboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment();
  return (
    <div className="mb-[160px] min-w-[960px]">
      <div className="mt-[59px] mb-[62px] ml-[152px]">
        <Image
          src="/logo/bewater-h.svg"
          width={112}
          height={22}
          alt="bewater logo"
        />
      </div>
      <div className="mb-[43px] font-primary font-bold text-[48px] leading-[67px] text-white text-center">
        Web3 Top Ranking
      </div>
      <div className="flex justify-center">
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
      <div className="mt-[66px] flex justify-center">{children}</div>
      <p className="mt-[66px] mb-[160px] flex justify-center font-secondary text-[0.65rem] text-[#556]">
        Updated on: Jan 22, 2024
      </p>
    </div>
  );
}
