"use client";
import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "@/app/i18n/client";
import { useSearchParams } from "next/navigation";
import TagSelector from "./tag-selector";
import Developers from "./developers";
import Projects from "./projects";
import AIAnalyze from "./ai-analyze";
import { Bot } from "lucide-react";
import { useDialogStore } from "@/components/dialog/store";

const tab =
  "w-[160px] h-[36px] font-secondary font-bold text-[20px] leading-[26px] text-center border-b-[3px]";
const activeTab = "text-white border-[#00FFFF]";
const inactiveTab = "text-[#FFFFFF80] border-transparent";

interface SelectedTags {
  ecosystem: string;
  sector: string;
  subEcosystem: string | undefined;
}

export default function BuilderBoard({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t, i18n } = useTranslation(lng, "translation");
  const searchParams = useSearchParams();
  const [currentTab, setCurrentTab] = useState("projects");
  const [selectedTags, setSelectedTags] = useState<SelectedTags>({
    ecosystem: "",
    sector: "",
    subEcosystem: undefined,
  });
  const [selectedProject, setSelectedProject] = useState<string | undefined>(
    undefined,
  );
  const [showAIAnalyze, setShowAIAnalyze] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const openDialog = useDialogStore((s) => s.open);
  const isMovement = searchParams.get("category") === "movement";

  const handleTagsChange = useCallback(
    (tags: { ecosystem: string; sector: string; subEcosystem?: string }) => {
      setSelectedTags({
        ecosystem: tags.ecosystem,
        sector: tags.sector,
        subEcosystem: tags.subEcosystem,
      });
    },
    [],
  );

  const handleProjectSelect = useCallback(
    (projectName: string, setTab?: boolean) => {
      setSelectedProject(projectName);
      if (setTab) {
        setShowAIAnalyze(true);
      }
    },
    [],
  );

  const handleBackToProjects = useCallback(() => {
    setShowAIAnalyze(false);
  }, []);

  useEffect(() => {
    if (isMovement) {
      setSelectedTags((prev) => ({
        ...prev,
        ecosystem: "Move",
        subEcosystem: "Movement",
      }));
    }
  }, [isMovement]);

  useEffect(() => {
    if (searchParams.get("action") === "add") {
      openDialog("builderboard_import", {});
    }
  }, [searchParams, openDialog]);

  useEffect(() => {
    if (i18n.isInitialized) {
      setIsLoading(false);
    }
  }, [i18n.isInitialized]);

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <div className="mb-[160px] font-secondary">
      <div className="container mx-auto py-20">
        <div className="flex flex-col items-center">
          <h1 className="!font-secondary heading-5 md:heading-3 text-white [text-shadow:0_4px_36px_rgba(0_255_255_/_0.4)] text-center mb-4">
            {isMovement ? "Movement Buidlerboard" : t("builderboard.title")}
          </h1>

          {isMovement && (
            <p className="text-sm text-center text-gray-200 mb-4">
              Discover top Movement projects and developers
            </p>
          )}

          <p className="text-xs text-center text-gray-200 mb-12">
            Join Us in Building Builderboard:{" "}
            <a
              className="text-day cursor-pointer underline"
              onClick={() => openDialog("builderboard_import", {})}
            >
              Add
            </a>{" "}
            {isMovement ? "Movement Projects" : "Top Projects and Developers"}!
          </p>

          <div className="flex justify-center mb-[70px]">
            <button
              onClick={() => setCurrentTab("projects")}
              className={`${tab} ${
                currentTab === "projects" ? activeTab : inactiveTab
              }`}
            >
              {t("builderboard.projects")}
            </button>
            <button
              onClick={() => setCurrentTab("developers")}
              className={`${tab} ${
                currentTab === "developers" ? activeTab : inactiveTab
              }`}
            >
              {t("builderboard.developers")}
            </button>
          </div>

          <div className="w-full max-w-4xl">
            <TagSelector
              onChange={handleTagsChange}
              hideEcosystem={isMovement}
              forcedEcosystem={isMovement ? "Move" : undefined}
              forcedSubEcosystem={isMovement ? "Movement" : undefined}
            />
            <div className="mt-[10px]">
              {currentTab === "developers" && (
                <Developers
                  ecosystem={selectedTags.ecosystem}
                  sector={selectedTags.sector}
                  subEcosystem={selectedTags.subEcosystem}
                  lng={lng}
                />
              )}
              {currentTab === "projects" && (
                <>
                  <div style={{ display: showAIAnalyze ? 'none' : 'block' }}>
                    <Projects
                      isMovement={isMovement}
                      ecosystem={selectedTags.ecosystem}
                      sector={selectedTags.sector}
                      subEcosystem={selectedTags.subEcosystem}
                      lng={lng}
                      onSelectProject={handleProjectSelect}
                    />
                  </div>
                  
                  {isMovement && (
                    <div style={{ display: showAIAnalyze ? 'block' : 'none' }}>
                      <AIAnalyze
                        ecosystem={selectedTags.ecosystem}
                        sector={selectedTags.sector}
                        subEcosystem={selectedTags.subEcosystem}
                        lng={lng}
                        projectName={selectedProject}
                        onBack={handleBackToProjects}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
