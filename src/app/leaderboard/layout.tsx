"use client";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";
import TopicSelector, { TopicContext } from "./topic-selector";
import { Footer } from "@/components/footer";
import Header from "./header";

const tab =
  "w-[160px] h-[36px] font-secondary font-bold text-[20px] leading-[26px] text-center border-b-[3px]";
const activeTab = "text-white border-[#00FFFF]";
const inactiveTab = "text-[#FFFFFF80] border-transparent";

export default function Leaderboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment();
  const [selectedTopic, setSelectedTopic] = useState("");
  return (
    <div className="min-w-[960px] font-secondary">
      <Header />
      <div className="mb-[160px]">
        <div className="h-[72px] mx-[152px] mb-[72px] flex justify-center" />
        <div className="mb-[60px] font-primary font-bold text-[36px] leading-[50px] text-white text-center">
          Web3 Top Ranking
        </div>
        <div className="flex justify-center mb-[70px]">
          <Link
            href="developers"
            className={`${tab} ${
              segment === "developers" ? activeTab : inactiveTab
            }`}
          >
            Developers
          </Link>
          <Link
            href="projects"
            className={`${tab} ${
              segment === "projects" ? activeTab : inactiveTab
            }`}
          >
            Projects
          </Link>
        </div>
        <div className="w-[1104px] mx-auto">
          {segment === "developers" && (
            <TopicSelector onChange={setSelectedTopic} />
          )}
          <div className="mt-[70px]">
            <TopicContext.Provider value={selectedTopic}>
              {children}
            </TopicContext.Provider>
          </div>
        </div>
      </div>
      <Footer lng="en" />
    </div>
  );
}
