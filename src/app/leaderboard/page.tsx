"use client";
import { useState } from "react";
import TopicSelector from "./topic-selector";
import Developers from "./developers";
import Projects from "./projects";

const tab =
  "w-[160px] h-[36px] font-secondary font-bold text-[20px] leading-[26px] text-center border-b-[3px]";
const activeTab = "text-white border-[#00FFFF]";
const inactiveTab = "text-[#FFFFFF80] border-transparent";

export default function Page() {
  const [currentTab, setCurrentTab] = useState("developers");
  const [selectedTopic, setSelectedTopic] = useState("");
  return (
    <div className="mb-[160px]">
      <div className="h-[72px] mx-[152px] mb-[72px] flex justify-center" />
      <div className="mb-[60px] font-primary font-bold text-[36px] leading-[50px] text-white text-center">
        Web3 Top Ranking
      </div>
      <div className="flex justify-center mb-[70px]">
        <button
          onClick={() => setCurrentTab("developers")}
          className={`${tab} ${
            currentTab === "developers" ? activeTab : inactiveTab
          }`}
        >
          Developers
        </button>
        <button
          onClick={() => setCurrentTab("projects")}
          className={`${tab} ${
            currentTab === "projects" ? activeTab : inactiveTab
          }`}
        >
          Projects
        </button>
      </div>
      <div className="w-[1104px] mx-auto">
        {currentTab === "developers" && (
          <TopicSelector onChange={setSelectedTopic} />
        )}
        <div className="mt-[70px]">
          {currentTab === "developers" && (
            <Developers language={selectedTopic} />
          )}
          {currentTab === "projects" && <Projects />}
        </div>
      </div>
    </div>
  );
}
