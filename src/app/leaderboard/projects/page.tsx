"use client";
import Image from "next/image";
import { format } from "date-fns";
import { icons } from "../icons";
import PageSwitcher from "../page-switcher";
import { LeaderboardProject } from "@/services/leaderboard";
import { useLeaderboardProject } from "@/services/leaderboard.query";
import { useState } from "react";

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
          <div className="text-[#B4B4BB] mr-1">{icons.book}</div>
          <p className="truncate" title={`${owner} / ${repo}`}>
            <span className="text-[#94A3B8] mr-1">{owner}</span>
            <span className="text-white mr-1">/</span>
            <span>{repo}</span>
          </p>
        </div>
        <div className="flex items-center">
          <div className="text-[#919191] mr-1">{icons.codeBox}</div>
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
            <div
              className={`${avatar} font-bold text-[10px] leading-6 text-center`}
            >
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

export default function Page() {
  const { data } = useLeaderboardProject(200);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<10 | 25 | 50 | 100>(10);
  const projectList = (data ?? []).slice(
    rowsPerPage * (currentPage - 1),
    rowsPerPage * currentPage
  );

  return (
    <>
      <div
        className={`${rowStyle} py-2 font-medium text-[12px] leading-[22px] text-[#CBD5E1] uppercase`}
      >
        <p>Rank</p>
        <p>Project</p>
        <p>Stars</p>
        <p>Fork</p>
        <p>Topic</p>
        <p>Description</p>
        <p>Activity</p>
      </div>
      {projectList.map((data, index) => (
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
