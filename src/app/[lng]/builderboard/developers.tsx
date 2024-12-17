"use client";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/app/i18n/client";

const gridTemplate = "grid-cols-[minmax(0,_0.5fr)_minmax(0,_4fr)_minmax(0,_4fr)_minmax(0,_3fr)]";
const rowStyle = `grid gap-4 border-b border-b-[#334155] box-border ${gridTemplate}`;

// 添加语言颜色映射
const languageColors: { [key: string]: string } = {
  "TypeScript": "#3178c6",
  "JavaScript": "#f1e05a",
  "Python": "#3572A5",
  "Java": "#b07219",
  "Ruby": "#701516",
  "Go": "#00ADD8",
  "Rust": "#dea584",
  "Solidity": "#AA6746",
  "C++": "#f34b7d",
  "C#": "#178600",
  "PHP": "#4F5D95",
  "Swift": "#ffac45",
  "Kotlin": "#A97BFF",
  "Dart": "#00B4AB",
  "Vue": "#41b883",
  "HTML": "#e34c26",
  "CSS": "#563d7c",
  
};

interface Language {
  name: string;
  percentage: number;
}

interface Repository {
  html_url: string;
  name: string;
  description: string | null;
}

interface Developer {
  html_url: string;          // GitHub 个人主页链接
  avatar_url: string;        // 头像 URL
  login: string;            // GitHub 用户名
  total_stars: number;      // 总 star 数
  followers: number;        // 关注者数量
  bio: string | null;       // 个人简介
  popular_repo: {          // 最受欢迎的仓库
    html_url: string;
    name: string;
    description: string | null;
  };
  languages: Language[];    // 使用的编程语言及占比
}

function Developer(props: { data: Developer; rank: number }) {
  const { data, rank } = props;
  
  // 确保只显示前三种语言
  const topLanguages = data.languages?.slice(0, 3) || [];
  
  return (
    <div className={`${rowStyle} py-4 items-center text-xs text-[#F8FAFC]`}>
      {/* Rank */}
      <p className="text-base">#{rank}</p>

      {/* Developer Info */}
      <div className="flex flex-col gap-2">
        <a href={data.html_url} className="flex items-center gap-2">
          <Image
            src={data.avatar_url}
            alt={data.login}
            width={48}
            height={48}
            className="rounded-full"
          />
          <p className="font-bold text-base text-[#F8FAFC]">
            {data.login}
          </p>
        </a>
        <div className="flex gap-6 text-[#94A3B8]">
          <span>{data.total_stars} stars</span>
          <span>{data.followers} followers</span>
        </div>
        <p className="text-sm text-[#94A3B8] line-clamp-2">
          {data.bio}
        </p>
      </div>

      {/* Popular Repo */}
      <div className="flex flex-col gap-2">
        <a href={data.popular_repo?.html_url} className="font-bold text-base text-[#F8FAFC] hover:underline">
          {data.popular_repo?.name}
        </a>
        <p className="text-sm text-[#94A3B8] line-clamp-2">
          {data.popular_repo?.description}
        </p>
      </div>

      {/* Languages */}
      <div className="flex flex-col gap-3">
        {topLanguages.map((lang: Language) => (
          <div key={lang.name} className="flex flex-col gap-1">
            <span className="text-[#F8FAFC]">{lang.name}</span>
            <div className="h-1 bg-[#1E293B] rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full"
                style={{ 
                  width: `${lang.percentage}%`,
                  backgroundColor: languageColors[lang.name] || '#00FFFF'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 

async function fetchTopDevelopers(): Promise<Developer[]> {
  try {
    // 首先获取排名靠前的仓库
    const reposResponse = await fetch(
      'https://api.github.com/search/repositories?q=stars:>1000+language:solidity+language:rust+language:typescript&sort=stars&order=desc&per_page=20',
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          // 'Authorization': `token `
        }
      }
    );
    const reposData = await reposResponse.json();
    
    // 获取每个仓库作者的详细信息
    const developersPromises = reposData.items.map(async (repo: any) => {
      const userResponse = await fetch(
        `https://api.github.com/users/${repo.owner.login}`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            // 'Authorization': `token `
          }
        }
      );
      const userData = await userResponse.json();
      
      // 获取用户最受欢迎的仓库
      const reposResponse = await fetch(
        `https://api.github.com/users/${userData.login}/repos?sort=stars&per_page=1`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            // 'Authorization': `token `
          }
        }
      );
      const [popularRepo] = await reposResponse.json();
      
      // 获取最受欢迎仓库的语言统计
      const languagesResponse = await fetch(popularRepo.languages_url, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          // 'Authorization': `token `
        }
      });
      const languagesData = await languagesResponse.json();
      
      // 计算语言百分比
      const totalBytes = Object.values(languagesData).reduce((a: any, b: any) => a + b, 0) as number;
      const languages = Object.entries(languagesData)
        .map(([name, bytes]: [string, any]) => ({
          name,
          percentage: Math.round((bytes / totalBytes) * 100)
        }))
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 3);

      return {
        html_url: userData.html_url,
        avatar_url: userData.avatar_url,
        login: userData.login,
        total_stars: userData.public_repos,
        followers: userData.followers,
        bio: userData.bio,
        popular_repo: {
          html_url: popularRepo.html_url,
          name: popularRepo.name,
          description: popularRepo.description
        },
        languages
      };
    });

    return await Promise.all(developersPromises);
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return [];
  }
}

interface DevelopersProps {
  ecosystem: string;
  sector: string;
  lng: string;
}

export default function Developers({ ecosystem, sector, lng }: DevelopersProps) {
  const [data, setData] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const developers = await fetchTopDevelopers();
      setData(developers);
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
        <Developer
          data={data}
          rank={index + 1}
          key={index}
        />
      ))}
    </>
  );
}
