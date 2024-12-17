"use client";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/app/i18n/client";

const gridTemplate = "grid-cols-[minmax(0,_0.5fr)_minmax(0,_4fr)_minmax(0,_4fr)_minmax(0,_3fr)]";
const rowStyle = `grid gap-4 border-b border-b-[#334155] box-border ${gridTemplate}`;

function Developer(props: { data: any; rank: number }) {
  const { data, rank } = props;
  
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
        {data.languages?.map((lang: { name: string; percentage: number }) => (
          <div key={lang.name} className="flex flex-col gap-1">
            <div className="flex justify-between text-sm">
              <span className="text-[#F8FAFC]">{lang.name}</span>
              <span className="text-[#94A3B8]">{lang.percentage}%</span>
            </div>
            <div className="h-1 bg-[#1E293B] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#00FFFF] rounded-full"
                style={{ width: `${lang.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 

interface DevelopersProps {
  ecosystem: string;
  sector: string;
  lng: string;
}

const mockData = Array(20).fill(null).map((_, index) => ({
  html_url: `https://github.com/developer${index + 1}`,
  avatar_url: `https://avatars.githubusercontent.com/u/${10000 + index}`,
  login: `developer${index + 1}`,
  total_stars: Math.floor(Math.random() * 10000),
  followers: Math.floor(Math.random() * 5000),
  bio: `Full-stack developer with ${Math.floor(Math.random() * 10) + 1} years of experience in web development, blockchain, and distributed systems.`,
  popular_repo: {
    html_url: `https://github.com/developer${index + 1}/repo${index + 1}`,
    name: `awesome-project-${index + 1}`,
    description: `A modern ${index % 2 ? 'blockchain' : 'web3'} project with focus on scalability and security. Implements cutting-edge technologies and best practices.`
  },
  languages: [
    {
      name: "TypeScript",
      percentage: 45 + Math.floor(Math.random() * 15)
    },
    {
      name: "Rust",
      percentage: 25 + Math.floor(Math.random() * 15)
    },
    {
      name: "Solidity",
      percentage: 15 + Math.floor(Math.random() * 10)
    }
  ]
}));

export default function Developers({ ecosystem, sector, lng }: DevelopersProps) {
  const [data, setData] = useState<any[]>(mockData);

  // TODO: Replace with actual API call that uses both ecosystem and sector
  // const { data } = useLeaderboardDeveloper(ecosystem, sector);

  return (
    <>
      <div className={`${rowStyle} py-2`} />
      
      {/* Show selected filters if any */}
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
