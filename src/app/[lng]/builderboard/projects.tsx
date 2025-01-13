"use client";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { BookmarkIcon, CodeSandboxLogoIcon, UpdateIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { BuilderboardProject } from "@/services/leaderboard";
import { useBuilderboardProject } from "@/services/leaderboard.query";
import PageSwitcher from "../../../app/[lng]/builderboard/page-switcher";

const gridTemplate =
  "grid-cols-1 md:grid-cols-[minmax(0,_0.5fr)_minmax(0,_4fr)_minmax(0,_4fr)_minmax(0,_3fr)]";
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
        };
      }),
    );

    //     // 构建批量插入的 VALUES 部分
    //     const values = projectsWithContributors.map(project => {
    //       const [owner, repoName] = project.repoName.split('/');

    //       const contributorsJson = `JSON_ARRAY(${project.contributors.map((contributor: { login: any; avatar_url: any; }) =>
    //         `JSON_OBJECT('login', '${contributor.login}', 'avatar_url', '${contributor.avatar_url}')`
    //       ).join(', ')})`;

    //       const languagesJson = `JSON_ARRAY(${project.languages.map((lang: any) =>
    //         `'${lang}'`
    //       ).join(', ')})`;

    //       const topicsJson = `JSON_ARRAY(${project.topics.map((topic: any) =>
    //         `'${topic}'`
    //       ).join(', ')})`;

    //       // 随机决定是否包含 Ethereum 和 DeFi
    //       const includeEthereum = Math.random() > 0.5;
    //       const includeDefi = Math.random() > 0.5;

    //       const ecosystemsJson = includeEthereum ?
    //         `JSON_ARRAY('Ethereum')` :
    //         'JSON_ARRAY()';

    //       const sectorsJson = includeDefi ?
    //         `JSON_ARRAY('DeFi')` :
    //         'JSON_ARRAY()';

    //       return `(
    //         'https://github.com/${project.repoName}',
    //         '${project.repoName}',
    //         '${project.name}',
    //         ${project.description ? `'${project.description.replace(/'/g, "''")}'` : 'NULL'},
    //         ${languagesJson},
    //         ${project.stargazers_count},
    //         ${project.forks_count},
    //         ${topicsJson},
    //         ${contributorsJson},
    //         '${project.updated_at}',
    //         NOW(),
    //         ${ecosystemsJson},
    //         ${sectorsJson},
    //         NOW(),
    //         NOW()
    //       )`;
    //     }).join(',\n');

    //     // 构建完整的批量插入 SQL
    //     const sql = `
    // INSERT INTO operationProject (
    //   repoUrl,
    //   repoName,
    //   name,
    //   description,
    //   languages,
    //   stargazers_count,
    //   forks_count,
    //   topics,
    //   contributors,
    //   updated_at,
    //   created_at,
    //   ecosystems,
    //   sectors,
    //   createdAt,
    //   updatedAt
    // ) VALUES
    // ${values}
    // ON DUPLICATE KEY UPDATE
    //   name = VALUES(name),
    //   description = VALUES(description),
    //   languages = VALUES(languages),
    //   stargazers_count = VALUES(stargazers_count),
    //   forks_count = VALUES(forks_count),
    //   topics = VALUES(topics),
    //   contributors = VALUES(contributors),
    //   updated_at = VALUES(updated_at),
    //   updatedAt = NOW();
    // `;

    //     console.log('Batch SQL for all projects:');
    //     console.log(sql);
    //     console.log('----------------------------------------');

    return projectsWithContributors;
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return [];
  }
}

function Project(props: { data: BuilderboardProject; rank: number }) {
  const avatar =
    "w-6 h-6 rounded-full border border-[#F1F5F9] bg-gray-700 overflow-hidden ml-[-8px] border-box";
  const { data, rank } = props;
  const [owner, repo] = data.repoName.split("/");
  const contributors = data.contributors || [];

  return (
    <div className={`${rowStyle} py-4 items-start md:items-center text-xs text-[#F8FAFC]`}>
      {/* Rank */}
      <p className="text-base hidden md:block">#{rank}</p>

      {/* Project Info */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="md:hidden text-base">#{rank}</span>
          <a
            href={`https://github.com/${data.repoName}`}
            className="flex items-center font-bold text-sm md:text-base"
          >
            <div className="text-[#B4B4BB] mr-1">
              <BookmarkIcon />
            </div>
            <p className="truncate" title={`${owner} / ${repo}`}>
              <span className="text-[#94A3B8] mr-1">{owner}</span>
              <span className="text-white mr-1">/</span>
              <span>{repo}</span>
            </p>
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
          <span className="text-[#F8FAFC] text-xs">{data.languages[0] || "N/A"}</span>
        </div>
        <div className="flex gap-4 text-[#94A3B8] text-xs">
          <span>{data.stargazers_count} stars</span>
          <span>{data.forks_count} forks</span>
        </div>
        <p className="text-[#94A3B8] text-xs line-clamp-2">{data.topics.join(", ")}</p>
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
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;
  const [data, setData] = useState<BuilderboardProject[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: apiData, isLoading: apiLoading } = useBuilderboardProject(100, ecosystem, sector);

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
  }, [ecosystem, sector]);

  // 当标签改变时重置页码
  useEffect(() => {
    setCurrentPage(1);
  }, [ecosystem, sector]);

  const displayLoading = USE_GITHUB_API ? loading : apiLoading;
  const displayData = USE_GITHUB_API ? data : apiData;

  // 计算当前页的数据
  const currentPageData = (displayData ?? []).slice(
    ITEMS_PER_PAGE * (currentPage - 1),
    ITEMS_PER_PAGE * currentPage
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
      <div className={`${rowStyle} py-2`} />

      {currentPageData.map((data, index) => (
        data && <Project 
          data={data} 
          rank={index + 1 + (currentPage - 1) * ITEMS_PER_PAGE} 
          key={data.repoName || index} 
        />
      ))}

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
