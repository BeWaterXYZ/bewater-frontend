"use client";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import {
  BookmarkIcon,
  CodeSandboxLogoIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import { Bot, Gift, Trophy } from "lucide-react";
import { format } from "date-fns";
import { BuilderboardProject } from "@/services/leaderboard";
import { useBuilderboardProject } from "@/services/leaderboard.query";
import PageSwitcher from "../../../app/[lng]/builderboard/page-switcher";
import { useRouter } from "next/navigation";
import { useDialogStore } from "@/components/dialog/store";

const gridTemplate =
  "grid-cols-1 md:grid-cols-[minmax(0,_0.5fr)_minmax(0,_3fr)_minmax(0,_3fr)_minmax(0,_2fr)_minmax(0,_2fr)]";
const rowStyle = `grid gap-2 md:gap-4 border-b border-b-[#334155] box-border ${gridTemplate}`;

const USE_GITHUB_API =
  process.env.NEXT_PUBLIC_USE_BUILDERBOARD_GITHUB_API === "true";

async function fetchTopProjects(): Promise<BuilderboardProject[]> {
  try {
    const response = await fetch(
      "https://api.github.com/search/repositories?q=stars:>1000+language:solidity+language:rust+language:typescript&sort=stars&order=desc&per_page=20",
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
      },
    );
    const data = await response.json();

    // 获取每个仓库的贡献者信息
    const projectsWithContributors = await Promise.all(
      data.items.map(async (repo: any) => {
        const contributorsResponse = await fetch(
          `${repo.contributors_url}?per_page=5`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
              Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            },
          },
        );
        const contributors = await contributorsResponse.json();

        return {
          repoName: repo.full_name,
          name: repo.name,
          description: repo.description,
          languages: [repo.language],
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          topics: repo.topics,
          updated_at: repo.updated_at,
          contributors: contributors.map((c: any) => ({
            login: c.login,
            avatar_url: c.avatar_url,
          })),
          hackathons: [], // GitHub API 没有黑客松信息，返回空数组
        };
      }),
    );

    return projectsWithContributors;
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return [];
  }
}

function Project(props: {
  lng: string;
  data: BuilderboardProject;
  rank: number;
  isMovement?: boolean;
  onSelectProject?: (projectName: string, setTab?: boolean) => void;
}) {
  const router = useRouter();
  const { open } = useDialogStore();
  const avatar =
    "w-6 h-6 rounded-full border border-[#F1F5F9] bg-gray-700 overflow-hidden ml-[-8px] border-box";
  const { data, rank, onSelectProject } = props;
  const [owner, repo] = data.repoName.split("/");
  const contributors = data.contributors || [];
  const hackathons = data.hackathons || [];

  // Handle language display - ensure we're displaying a string
  const primaryLanguage =
    Array.isArray(data.languages) && data.languages[0]
      ? typeof data.languages[0] === "string"
        ? data.languages[0]
        : (data.languages[0] as any).name
      : "N/A";

  const handleSponsorClick = () => {
    router.push(`/${props.lng}/sponsor/${owner}/${repo}`);
  };

  const handleHackathonClick = (hackathon: any) => {
    open("hackathon_details", hackathon);
  };

  return (
    <div
      className={`${rowStyle} py-4 items-start md:items-center text-xs text-[#F8FAFC]`}
    >
      {/* Rank */}
      <p className="text-base hidden md:block">#{rank}</p>

      {/* Project Info */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="md:hidden text-base">#{rank}</span>
          <a
            href={`https://github.com/${data.repoName}`}
            className="flex items-center font-bold text-sm md:text-base truncate"
          >
            <div className="truncate" title={`${owner} / ${repo}`}>
              <div className="flex items-center">
                <BookmarkIcon className="text-[#B4B4BB] mr-1" />
                <span className="text-[#94A3B8] mr-1">{owner}</span>
              </div>

              <span className="block truncate">{repo}</span>
            </div>
          </a>
        </div>
        <p className="text-xs md:text-sm text-[#94A3B8] line-clamp-2">
          {data.description}
        </p>
      </div>

      {/* Stats & Tags */}
      <div className="flex flex-col gap-3 mt-4 md:mt-0">
        <div className="flex items-center gap-2">
          <div className="text-[#919191]">
            <CodeSandboxLogoIcon />
          </div>
          <span className="text-[#F8FAFC] text-xs">{primaryLanguage}</span>
        </div>
        <div className="flex gap-4 text-[#94A3B8] text-xs">
          <span>{data.stargazers_count} stars</span>
          <span>{data.forks_count} forks</span>
        </div>
        <p className="text-[#94A3B8] text-xs line-clamp-2">
          {data.topics.join(", ")}
        </p>

        {props.isMovement && onSelectProject && (
          <button
            onClick={() => onSelectProject(data.repoName, true)}
            className="text-xs px-3 py-1 bg-[#334155] hover:bg-[#475569] text-[#00FFFF] rounded-md flex items-center gap-1 w-fit"
          >
            <Bot size={14} className="text-[#00FFFF]" />
            <span>AI Analyze</span>
          </button>
        )}

        {props.isMovement && (
          <div className="text-[#94A3B8] text-xs line-clamp-2">
            {data.tags.join(", ")}
          </div>
        )}
      </div>

      {/* Hackathons */}
      <div className="flex flex-col gap-2 mt-4 md:mt-0 h-full">
        {hackathons.length > 0 ? (
          <>
            <div className="flex items-center gap-1 text-[#94A3B8] text-xs">
              <Trophy size={12} className="text-[#F59E0B]" />
              <span>Hackathons</span>
            </div>
            <div className="flex flex-col gap-1">
              {hackathons.slice(0, 3).map((hackathon, index) => (
                <button
                  key={index}
                  onClick={() => handleHackathonClick(hackathon)}
                  className="text-[#00FFFF] text-xs hover:text-[#00FFFF]/80 text-left truncate"
                  title={hackathon.name}
                >
                  {hackathon.name}
                </button>
              ))}
              {hackathons.length > 3 && (
                <span className="text-[#64748B] text-xs">
                  +{hackathons.length - 3} more
                </span>
              )}
            </div>
          </>
        ) : (
          <div className="text-[#64748B] text-xs flex justify-center items-center h-full">No hackathons</div>
        )}
      </div>

      {/* Contributors & Activity */}
      <div className="flex flex-col gap-3 mt-4 md:mt-0">
        <div className="flex ml-2">
          {contributors.map((contributor: any, i: number) => (
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
        {props.isMovement && (
          <button
            onClick={handleSponsorClick}
            className="text-xs px-3 py-1 bg-[#334155] hover:bg-[#475569] text-[#00FFFF] rounded-md flex items-center gap-1 w-fit"
          >
            <Gift size={14} className="text-[#00FFFF]" />
            <span>Sponsor</span>
          </button>
        )}
      </div>
    </div>
  );
}

interface ProjectsProps {
  ecosystem: string;
  sector: string;
  subEcosystem?: string | undefined;
  lng: string;
  isMovement?: boolean;
  onSelectProject?: (projectName: string, setTab?: boolean) => void;
}

export default function Projects({
  ecosystem,
  sector,
  subEcosystem,
  lng,
  isMovement,
  onSelectProject,
}: ProjectsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;
  const [data, setData] = useState<BuilderboardProject[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: apiData, isLoading: apiLoading } = useBuilderboardProject(
    100,
    ecosystem,
    sector,
    subEcosystem,
  );

  useEffect(() => {
    async function loadData() {
      if (!USE_GITHUB_API) {
        return;
      }

      setLoading(true);
      const projects = await fetchTopProjects();
      setData(projects);
      setLoading(false);
    }

    if (USE_GITHUB_API) {
      loadData();
    }
  }, [ecosystem, sector, subEcosystem]);

  // 当标签改变时重置页码
  useEffect(() => {
    setCurrentPage(1);
  }, [ecosystem, sector, subEcosystem]);

  const displayLoading = USE_GITHUB_API ? loading : apiLoading;
  const displayData = USE_GITHUB_API ? data : apiData;

  // 计算当前页的数据
  const currentPageData = (displayData ?? []).slice(
    ITEMS_PER_PAGE * (currentPage - 1),
    ITEMS_PER_PAGE * currentPage,
  );

  if (displayLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <UpdateIcon className="w-8 h-8 text-[#00FFFF] animate-spin" />
        <p className="mt-4 text-[#94A3B8]">Loading projects...</p>
      </div>
    );
  }

  if (!displayData || displayData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <CodeSandboxLogoIcon className="w-12 h-12 text-[#475569] mb-4" />
        <p className="text-[#94A3B8] mb-2">No projects found</p>
      </div>
    );
  }

  return (
    <>
      {currentPageData.map(
        (data: BuilderboardProject, index: number) =>
          data && (
            <Project
              lng={lng}
              data={data}
              rank={index + 1 + (currentPage - 1) * ITEMS_PER_PAGE}
              key={data.repoName || index}
              isMovement={isMovement}
              onSelectProject={onSelectProject}
            />
          ),
      )}

      {displayData.length > 0 && (
        <PageSwitcher
          currentPage={currentPage}
          rowsPerPage={ITEMS_PER_PAGE}
          totalRows={displayData.length}
          onPageChange={(p) => setCurrentPage(p)}
        />
      )}
    </>
  );
}
