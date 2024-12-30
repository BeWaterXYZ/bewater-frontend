"use client";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { BookmarkIcon, CodeSandboxLogoIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { BuilderboardProject } from "@/services/leaderboard";
import { useBuilderboardProject } from "@/services/leaderboard.query";

const gridTemplate =
  "grid-cols-[minmax(0,_0.5fr)_minmax(0,_4fr)_minmax(0,_4fr)_minmax(0,_3fr)]";
const rowStyle = `grid gap-4 border-b border-b-[#334155] box-border ${gridTemplate}`;

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
    <div className={`${rowStyle} py-4 items-center text-xs text-[#F8FAFC]`}>
      {/* Rank */}
      <p className="text-base">#{rank}</p>

      {/* Project Info */}
      <div className="flex flex-col gap-2">
        <a
          href={`https://github.com/${data.repoName}`}
          className="flex items-center font-bold text-base mb-2"
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
        <p className="text-sm text-[#94A3B8] line-clamp-2">
          {data.description}
        </p>
      </div>

      {/* Stats & Tags */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="text-[#919191]">
            <CodeSandboxLogoIcon />
          </div>
          <span className="text-[#F8FAFC]">{data.languages[0] || "N/A"}</span>
        </div>
        <div className="flex gap-4 text-[#94A3B8]">
          <span>{data.stargazers_count} stars</span>
          <span>{data.forks_count} forks</span>
        </div>
        <p className="text-[#94A3B8] line-clamp-2">{data.topics.join(", ")}</p>
      </div>

      {/* Contributors & Activity */}
      <div className="flex flex-col gap-3">
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
  const [data, setData] = useState<BuilderboardProject[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: apiData, isLoading: apiLoading } = useBuilderboardProject(20, ecosystem, sector);

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

  const displayLoading = USE_GITHUB_API ? loading : apiLoading;
  const displayData = USE_GITHUB_API ? data : apiData;

  if (displayLoading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <>
      <div className={`${rowStyle} py-2`} />

      {(ecosystem || sector) && (
        <div className="py-4 text-sm text-gray-400">
          {ecosystem && <span className="mr-4">Ecosystem: {ecosystem}</span>}
          {sector && <span>Sector: {sector}</span>}
        </div>
      )}

      {(displayData ?? []).map((data, index) => (
        <Project data={data} rank={index + 1} key={index} />
      ))}
    </>
  );
}
