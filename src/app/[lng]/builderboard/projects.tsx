"use client";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { BookmarkIcon, CodeSandboxLogoIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

const gridTemplate = "grid-cols-[minmax(0,_0.5fr)_minmax(0,_4fr)_minmax(0,_4fr)_minmax(0,_3fr)]";
const rowStyle = `grid gap-4 border-b border-b-[#334155] box-border ${gridTemplate}`;

interface Contributor {
  login: string;
  avatar_url: string;
}

interface Project {
  repoName: string;          // 仓库全名 (owner/repo)
  name: string;              // 仓库名称
  description: string;       // 仓库描述
  language: string;          // 主要编程语言
  stargazers_count: number;  // star 数量
  forks_count: number;       // fork 数量
  topics: string[];         // 项目标签
  updated_at: string;       // 最后更新时间
  contributors: Contributor[]; // 贡献者列表
}

async function fetchTopProjects(): Promise<Project[]> {
  try {
    const response = await fetch(
      'https://api.github.com/search/repositories?q=stars:>1000+language:solidity+language:rust+language:typescript&sort=stars&order=desc&per_page=20',
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          // 'Authorization': `token `
        }
      }
    );
    const data = await response.json();
    
    // 获取每个仓库的贡献者信息
    const projectsWithContributors = await Promise.all(
      data.items.map(async (repo: any) => {
        const contributorsResponse = await fetch(
          `${repo.contributors_url}?per_page=5`,
          {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
              // 'Authorization': `token `
            }
          }
        );
        const contributors = await contributorsResponse.json();
        
        return {
          repoName: repo.full_name,
          name: repo.name,
          description: repo.description,
          language: repo.language,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          topics: repo.topics,
          updated_at: repo.updated_at,
          contributors: contributors.map((c: any) => ({
            login: c.login,
            avatar_url: c.avatar_url
          }))
        };
      })
    );

    return projectsWithContributors;
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return [];
  }
}

function Project(props: { data: Project; rank: number }) {
  const avatar = "w-6 h-6 rounded-full border border-[#F1F5F9] bg-gray-700 overflow-hidden ml-[-8px] border-box";
  const { data, rank } = props;
  const [owner, repo] = data.repoName.split("/");
  const contributors = data.contributors || [];
  
  return (
    <div className={`${rowStyle} py-4 items-center text-xs text-[#F8FAFC]`}>
      {/* Rank */}
      <p className="text-base">#{rank}</p>

      {/* Project Info */}
      <div className="flex flex-col gap-2">
        <a href={`https://github.com/${data.repoName}`} className="flex items-center font-bold text-base mb-2">
          <div className="text-[#B4B4BB] mr-1"><BookmarkIcon /></div>
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
          <div className="text-[#919191]"><CodeSandboxLogoIcon /></div>
          <span className="text-[#F8FAFC]">{data.language || "N/A"}</span>
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
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const projects = await fetchTopProjects();
      setData(projects);
      setLoading(false);
    }

    loadData();
  }, [ecosystem, sector]); 

  if (loading) {
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

      {(data ?? []).map((data, index) => (
        <Project
          data={data}
          rank={index + 1}
          key={index}
        />
      ))}
    </>
  );
} 