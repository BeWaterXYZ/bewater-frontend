"use client";
import colors from "./data/colors.json";
import { Fragment, useContext, useEffect, useState } from "react";
import Image from "next/image";
import PageSwitcher from "./page-switcher";
import { LeaderboardDeveloper } from "@/services/leaderboard";
import { useLeaderboardDeveloper } from "@/services/leaderboard.query";
import { TopicContext } from "./topic-selector";

const gridTemplate =
  "grid-cols-[minmax(0,_0.5fr)_minmax(0,_4fr)_minmax(0,_1fr)_minmax(0,_1fr)_minmax(0,_3fr)_minmax(0,_4fr)_minmax(0,_3fr)]";
const rowStyle = `grid gap-4 border-b border-b-[#334155] box-border ${gridTemplate}`;

function Developer(props: { data: LeaderboardDeveloper; rank: number }) {
  const histogramBg =
    "w-[78px] h-[6px] rounded-[20px] bg-[#30313D] relative overflow-hidden";
  const { data, rank } = props;
  const langList = Object.keys(data.languageSum).sort(
    (a, b) => data.languageSum[b]! - data.languageSum[a]!
  );

  let topics: any = data.repos?.find((repo) => {
    return repo.topics.length > 0;
  });
  topics = topics?.topics?.join(", ");

  const langSum = Object.keys(data.languageSum).reduce(
    (sum, lang) => sum + data.languageSum[lang]!,
    0
  );
  return (
    <div className={`${rowStyle} py-4 items-center text-xs text-[#F8FAFC]`}>
      <p>{rank}</p>
      <a href={`https://github.com/${data.login}`} className="flex">
        <Image
          src={data.avatar_url}
          alt={data.name || data.login}
          width={48}
          height={48}
          className="rounded-full mr-2"
        />
        <div>
          <p className="font-bold text-base text-[#F8FAFC] line-clamp-1 mb-2">
            {data.name || data.login}
          </p>
          <p className="text-xs text-[#CBD5E1]">@{data.login}</p>
        </div>
      </a>
      <p>{data.totalStars}</p>
      <p>{data.followers}</p>
      <p className="line-clamp-2">{topics ?? langList.join(", ")}</p>
      <div className="overflow-hidden">
        <a
          href={`https://github.com/${
            (data.repos ?? []).length > 0
              ? data.repos![0].full_name
              : data.projectArr?.[0]?.full_name
          }`}
        >
          <p className="text-sm leading-5 text-white mb-[9px] truncate">
            {(data.repos ?? []).length > 0
              ? data.repos![0].name
              : data.projectArr?.[0]?.name ?? "N/A"}
          </p>
        </a>
        <p className="text-xs text-[#64748B] line-clamp-2">
          {(data.repos ?? []).length > 0
            ? data.repos![0].description
            : data.projectArr?.[0]?.description}
        </p>
      </div>
      <div className="text-xs text-white grid grid-cols-[1fr_78px] gap-x-[13px] gap-y-2 items-center">
        {langList.slice(0, 3).map((lang, i) => (
          <Fragment key={i}>
            <p className="line-clamp-1">{lang}</p>
            <div className={histogramBg}>
              <div
                className={"h-[6px] rounded-[20px] absolute"}
                style={{
                  transform: "translateX(-6px)",
                  minWidth: "8px",
                  width: `calc(${Math.floor(
                    (data.languageSum[lang]! / langSum) * 100
                  )}% + 6px)`,
                  backgroundColor: colors[lang]?.color ?? "#FFF",
                }}
              ></div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default function Developers({ language }: { language: string }) {
  const { data } = useLeaderboardDeveloper(400, language);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<25 | 50 | 100>(25);
  const developerList = (data ?? []).slice(
    rowsPerPage * (currentPage - 1),
    rowsPerPage * currentPage
  );
  useEffect(() => setCurrentPage(1), [language]);

  return (
    <>
      <div
        className={`${rowStyle} py-2 font-medium text-[12px] leading-[22px] text-[#CBD5E1] uppercase`}
      >
        <p>Rank</p>
        <p>Name</p>
        <p>Stars</p>
        <p>Followers</p>
        <p>Topic</p>
        <p>Popular Repo</p>
        <p>Stack</p>
      </div>
      {developerList.map((data, index) => (
        <Developer
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
