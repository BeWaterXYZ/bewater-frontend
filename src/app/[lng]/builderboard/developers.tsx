"use client";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/app/i18n/client";
import { BuilderboardDeveloper, BuilderboardLanguage } from "@/services/leaderboard";
import { useBuilderboardDeveloper } from "@/services/leaderboard.query";
import PageSwitcher from "./page-switcher";
import { UpdateIcon, PersonIcon } from "@radix-ui/react-icons";

const gridTemplate = "grid-cols-1 md:grid-cols-[minmax(0,_0.5fr)_minmax(0,_4fr)_minmax(0,_4fr)_minmax(0,_3fr)]";
const rowStyle = `grid gap-2 md:gap-4 border-b border-b-[#334155] box-border ${gridTemplate}`;

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



function Developer(props: { data: BuilderboardDeveloper; rank: number }) {
  const { data, rank } = props;
  const popularRepo = data.popular_repo;
  const topLanguages = popularRepo.languages?.slice(0, 3) || [];
  
  return (
    <div className={`${rowStyle} py-4 items-start md:items-center text-xs text-[#F8FAFC]`}>
      {/* Rank */}
      <p className="text-base hidden md:block">#{rank}</p>

      {/* Developer Info */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="md:hidden text-base">#{rank}</span>
          <a href={data.html_url} className="flex items-center gap-2">
            <Image
              src={data.avatar_url}
              alt={data.login}
              width={48}
              height={48}
              className="rounded-full w-8 h-8 md:w-12 md:h-12"
            />
            <p className="font-bold text-sm md:text-base text-[#F8FAFC]">
              {data.login}
            </p>
          </a>
        </div>
        <div className="flex gap-4 text-[#94A3B8] text-xs">
          <span>{data.total_stars} stars</span>
          <span>{data.followers} followers</span>
        </div>
        <p className="text-xs md:text-sm text-[#94A3B8] line-clamp-2">
          {data.bio}
        </p>
      </div>

      {/* Popular Repo */}
      <div className="flex flex-col gap-2 mt-4 md:mt-0">
        <a href={popularRepo?.html_url} className="font-bold text-sm md:text-base text-[#F8FAFC] hover:underline">
          {popularRepo?.name}
        </a>
        <p className="text-xs md:text-sm text-[#94A3B8] line-clamp-2">
          {popularRepo?.description}
        </p>
      </div>

      {/* Languages */}
      <div className="flex flex-col gap-3 mt-4 md:mt-0">
        {topLanguages.map((lang: BuilderboardLanguage) => (
          <div key={lang.name} className="flex flex-col gap-1">
            <span className="text-[#F8FAFC] text-xs">{lang.name}</span>
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

async function fetchTopDevelopers(): Promise<BuilderboardDeveloper[]> {
  try {
    // 首先获取排名靠前的仓库
    const reposResponse = await fetch(
      'https://api.github.com/search/repositories?q=stars:>1000+language:solidity+language:rust+language:typescript&sort=stars&order=desc&per_page=20',
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
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
            'Authorization': `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
          }
        }
      );
      const userData = await userResponse.json();
      
      // 获取用户所有的仓库
      const allReposResponse = await fetch(
        `https://api.github.com/users/${userData.login}/repos?per_page=100`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
          }
        }
      );
      const allRepos = await allReposResponse.json();
      
      // 计算所有仓库的总 star 数
      const totalStars = allRepos.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0);
      
      // 获取用户最受欢迎的仓库
      const reposResponse = await fetch(
        `https://api.github.com/users/${userData.login}/repos?sort=stars&per_page=1`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
          }
        }
      );
      const [popularRepo] = await reposResponse.json();
      
      // 获取最受欢迎仓库的语言统计
      const languagesResponse = await fetch(popularRepo.languages_url, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
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
        total_stars: totalStars,
        followers: userData.followers,
        bio: userData.bio,
        popular_repo: {
          html_url: popularRepo.html_url,
          name: popularRepo.name,
          description: popularRepo.description,
          languages: languages
        },
      };
    });

    // 等待所有 Promise 解析完成
    const developers = await Promise.all(developersPromises);
    
//     // 构建批量插入的 VALUES 部分
//     const values = developers.map(developer => {
//       // 使用 MySQL 的 JSON_OBJECT 函数来构建 JSON
//       const popularRepoJson = `JSON_OBJECT(
//         'html_url', '${developer.popular_repo.html_url}',
//         'name', '${developer.popular_repo.name}',
//         'description', ${developer.popular_repo.description ? `'${developer.popular_repo.description.replace(/'/g, "''")}'` : 'NULL'},
//         'languages', JSON_ARRAY(${developer.popular_repo.languages.map((lang: { name: any; percentage: any; }) => 
//           `JSON_OBJECT('name', '${lang.name}', 'percentage', ${lang.percentage})`
//         ).join(', ')})
//       )`;

//       return `(
//         '${developer.html_url}',
//         '${developer.avatar_url}',
//         '${developer.login}',
//         ${developer.bio ? `'${developer.bio.replace(/'/g, "''")}'` : 'NULL'},
//         ${developer.followers},
//         ${developer.total_stars},
//         ${popularRepoJson},
//         NOW(),
//         NOW(),
//         NOW(),
//         NOW()
//       )`;
//     }).join(',\n');

//     // 构建完整的批量插入 SQL
//     const sql = `
// INSERT INTO operationDeveloper (
//   html_url,
//   avatar_url,
//   login,
//   bio,
//   followers,
//   total_stars,
//   popular_repo,
//   created_at,
//   updated_at,
//   createdAt,
//   updatedAt
// ) VALUES 
// ${values}
// ON DUPLICATE KEY UPDATE
//   avatar_url = VALUES(avatar_url),
//   login = VALUES(login),
//   bio = VALUES(bio),
//   followers = VALUES(followers),
//   total_stars = VALUES(total_stars),
//   popular_repo = VALUES(popular_repo),
//   updated_at = NOW(),
//   updatedAt = NOW();
// `;

//     console.log('Batch SQL for all developers:');
//     console.log(sql);
//     console.log('----------------------------------------');

    return developers;
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return [];
  }
}

interface DevelopersProps {
  ecosystem: string;
  sector: string;
  subEcosystem?: string | undefined;
  lng: string;
}


const USE_GITHUB_API = process.env.NEXT_PUBLIC_USE_BUILDERBOARD_GITHUB_API === 'true';

export default function Developers({ ecosystem, sector, subEcosystem, lng }: DevelopersProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;
  const [data, setData] = useState<BuilderboardDeveloper[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: apiData, isLoading: apiLoading } = useBuilderboardDeveloper(
    100, 
    ecosystem, 
    sector,
    subEcosystem
  );

  useEffect(() => {
    async function loadData() {
      if (!USE_GITHUB_API) {
        return;
      }
      
      setLoading(true);
      const developers = await fetchTopDevelopers();
      setData(developers);
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
    ITEMS_PER_PAGE * currentPage
  );

  if (displayLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <UpdateIcon className="w-8 h-8 text-[#00FFFF] animate-spin" />
        <p className="mt-4 text-[#94A3B8]">Loading developers...</p>
      </div>
    );
  }

  if (!displayData || displayData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <PersonIcon className="w-12 h-12 text-[#475569] mb-4" />
        <p className="text-[#94A3B8] mb-2">No developers found</p>
      </div>
    );
  }

  return (
    <>
      <div className={`${rowStyle} py-2`} />

      {currentPageData.map((data, index) => (
        data && <Developer
          data={data}
          rank={index + 1 + (currentPage - 1) * ITEMS_PER_PAGE}
          key={data.login || index}
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
