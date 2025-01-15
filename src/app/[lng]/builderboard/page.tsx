"use client";
import { useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import TagSelector from "./tag-selector";
import Developers from "./developers";
import Projects from "./projects";
import { useDialogStore } from "@/components/dialog/store";

const tab =
  "w-[160px] h-[36px] font-secondary font-bold text-[20px] leading-[26px] text-center border-b-[3px]";
const activeTab = "text-white border-[#00FFFF]";
const inactiveTab = "text-[#FFFFFF80] border-transparent";

export default function BuilderBoard({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = useTranslation(lng, "translation");
  const [currentTab, setCurrentTab] = useState("developers");
  const [selectedTags, setSelectedTags] = useState({
    ecosystem: "",
    sector: "",
  });
  const openDialog = useDialogStore((s) => s.open);

  return (
    <div className="mb-[160px] font-secondary">
      <div className="container mx-auto py-20">
        <div className="flex flex-col items-center">
          <h1 className="!font-secondary heading-5 md:heading-3 text-white [text-shadow:0_4px_36px_rgba(0_255_255_/_0.4)] text-center mb-4">
            {t("builderboard.title")}
          </h1>
          <p className="text-center text-gray-200 mb-12">
            Join Us in Building Builderboard:{" "}
            <a
              className="text-day cursor-pointer"
              onClick={() => openDialog("builderboard_import", {})}
            >
              Add
            </a>{" "}
            Top Projects and Developers!
          </p>

          <div className="flex justify-center mb-[70px]">
            <button
              onClick={() => setCurrentTab("developers")}
              className={`${tab} ${
                currentTab === "developers" ? activeTab : inactiveTab
              }`}
            >
              {t("builderboard.developers")}
            </button>
            <button
              onClick={() => setCurrentTab("projects")}
              className={`${tab} ${
                currentTab === "projects" ? activeTab : inactiveTab
              }`}
            >
              {t("builderboard.projects")}
            </button>
          </div>

          <div className="w-full max-w-4xl">
            <TagSelector onChange={setSelectedTags} />
            <div className="mt-[10px]">
              {currentTab === "developers" && (
                <Developers
                  ecosystem={selectedTags.ecosystem}
                  sector={selectedTags.sector}
                  lng={lng}
                />
              )}
              {currentTab === "projects" && (
                <Projects
                  ecosystem={selectedTags.ecosystem}
                  sector={selectedTags.sector}
                  lng={lng}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
