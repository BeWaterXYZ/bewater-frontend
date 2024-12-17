"use client";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/app/i18n/client";
import PageSwitcher from "./page-switcher";
import { BookmarkIcon, CodeSandboxLogoIcon } from "@radix-ui/react-icons";
import { LeaderboardProject } from "@/services/leaderboard";
import { format } from "date-fns";

const gridTemplate =
  "grid-cols-[minmax(0,_0.5fr)_minmax(0,_4fr)_minmax(0,_1fr)_minmax(0,_1fr)_minmax(0,_3fr)_minmax(0,_4fr)_minmax(0,_3fr)]";
const rowStyle = `grid gap-4 border-b border-b-[#334155] box-border ${gridTemplate}`;

function Project(props: { data: LeaderboardProject; rank: number }) {
  const avatar =
    "w-6 h-6 rounded-full border border-[#F1F5F9] bg-gray-700 overflow-hidden ml-[-8px] border-box";
  const { data, rank } = props;
  const [owner, repo] = data.repoName.split("/");
  const contributors = data.contributors.slice(0, 5);
  
  return (
    <div className={`${rowStyle} py-4 items-center text-xs text-[#F8FAFC]`}>
      <p>{rank}</p>
      <a href={`https://github.com/${data.repoName}`}>
        <div className="flex items-center font-bold text-base mb-2">
          <div className="text-[#B4B4BB] mr-1">{<BookmarkIcon/>}</div>
          <p className="truncate" title={`${owner} / ${repo}`}>
            <span className="text-[#94A3B8] mr-1">{owner}</span>
            <span className="text-white mr-1">/</span>
            <span>{repo}</span>
          </p>
        </div>
        <div className="flex items-center">
          <div className="text-[#919191] mr-1">{<CodeSandboxLogoIcon/>}</div>
          <span>{data.language || "N/A"}</span>
        </div>
      </a>
      <p>{data.stargazers_count}</p>
      <p>{data.forks_count}</p>
      <p className="line-clamp-2">{data.topics.join(", ")}</p>
      <p className="line-clamp-2">{data.description}</p>
      <div>
        <div className="flex ml-2 mb-[6px]">
          {contributors.map((contributor, i) => (
            <a href={`https://github.com/${contributor.login}`} key={i}>
              <div className={avatar}>
                <Image
                  alt={contributor.login}
                  src={contributor.avatar_url}
                  width={24}
                  height={24}
                />
              </div>
            </a>
          ))}
          {contributors.length > 5 && (
            <div className={`${avatar} font-bold text-[10px] leading-6 text-center`}>
              +{contributors.length - 5}
            </div>
          )}
        </div>
        <div className="text-[10px] leading-3 text-[#64748B]">
          Updated on {format(new Date(data.updated_at), "LLL dd, yyyy")}
        </div>
      </div>
    </div>
  );
}

interface ProjectsProps {
  ecosystem: string;
  sector: string;
  lng: string;
}

export default function Projects({ ecosystem, sector, lng }: ProjectsProps) {
  const { t } = useTranslation(lng, "translation");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<25 | 50 | 100>(25);
  const [data, setData] = useState<LeaderboardProject[]>([]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [ecosystem, sector]);

  // TODO: Replace with actual API call that uses both ecosystem and sector
  // const { data } = useLeaderboardProjects(ecosystem, sector);

  return (
    <>
      <div className={`${rowStyle} py-2 font-medium text-[12px] leading-[22px] text-[#CBD5E1] uppercase`}>
        <p>{t('builderboard.rank')}</p>
        <p>{t('builderboard.name')}</p>
        <p>{t('builderboard.stars')}</p>
        <p>{t('builderboard.followers')}</p>
        <p>{t('builderboard.topic')}</p>
        <p>{t('builderboard.description')}</p>
        <p>{t('builderboard.activity')}</p>
      </div>

      {/* Show selected filters if any */}
      {(ecosystem || sector) && (
        <div className="py-4 text-sm text-gray-400">
          {ecosystem && <span className="mr-4">Ecosystem: {ecosystem}</span>}
          {sector && <span>Sector: {sector}</span>}
        </div>
      )}
      
      {(data ?? [])
        .slice(rowsPerPage * (currentPage - 1), rowsPerPage * currentPage)
        .map((data, index) => (
          <Project
            data={data}
            rank={index + 1 + (currentPage - 1) * rowsPerPage}
            key={index}
          />
        ))}

      <PageSwitcher
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        totalRows={data?.length ?? 0}
        onPageChange={(p) => setCurrentPage(p)}
        onRowsPerPageChange={(r) => {
          setRowsPerPage(r);
          setCurrentPage(1);
        }}
      />
    </>
  );
} 