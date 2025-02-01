import clsx from "clsx";
import { useEffect, useState, useCallback } from "react";
import { useRankingTags } from "@/services/leaderboard.query";
import { RankingTagType } from "@/services/leaderboard";

const currentTag = "bg-[#475569] text-white px-3 md:px-5 h-[34px] flex items-center rounded-[6px] whitespace-nowrap text-xs md:text-sm";
const inactiveTag = "text-white hover:bg-[#475569] transition-all px-3 md:px-5 h-[34px] flex items-center rounded-[6px] whitespace-nowrap text-xs md:text-sm";

interface TagSelectorProps {
  onChange: (tags: { 
    ecosystem: string; 
    sector: string; 
    subEcosystem?: string;
  }) => void;
  hideEcosystem?: boolean;
  forcedEcosystem?: string;
  forcedSubEcosystem?: string;
}

export default function TagSelector({ 
  onChange, 
  hideEcosystem = false,
  forcedEcosystem,
  forcedSubEcosystem
}: TagSelectorProps) {
  const [selectedEcosystem, setSelectedEcosystem] = useState(forcedEcosystem || "");
  const [selectedSector, setSelectedSector] = useState("");
  
  const { data: ecosystemTags = [] } = useRankingTags(RankingTagType.ECOSYSTEM);
  const { data: sectorTags = [] } = useRankingTags(RankingTagType.SECTOR);
  
  const sortTags = useCallback((tags: any[]) => {
    return [...tags].sort((a, b) => {
      if (a.name === "Other") return 1;
      if (b.name === "Other") return -1;
      return a.name.localeCompare(b.name);
    });
  }, []);

  const sortedEcosystemTags = sortTags(ecosystemTags);
  const sortedSectorTags = sortTags(sectorTags);
  
  const handleTagChange = useCallback(() => {
    const tags = {
      ecosystem: selectedEcosystem,
      sector: selectedSector,
    };

    if (forcedSubEcosystem) {
      (tags as any)['subEcosystem'] = forcedSubEcosystem;
    }

    onChange(tags);
  }, [selectedEcosystem, selectedSector, forcedSubEcosystem, onChange]);

  useEffect(() => {
    if (forcedEcosystem) {
      setSelectedEcosystem(forcedEcosystem);
    }
  }, [forcedEcosystem]);

  useEffect(() => {
    handleTagChange();
  }, [handleTagChange]);

  const handleEcosystemClick = useCallback((tagName: string) => {
    setSelectedEcosystem(tagName);
  }, []);

  const handleSectorClick = useCallback((tagName: string) => {
    setSelectedSector(tagName);
  }, []);
  
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {/* Ecosystem Row - 根据 hideEcosystem 控制显示 */}
      {!hideEcosystem && (
        <div className="flex flex-col md:flex-row justify-start items-start gap-2 md:gap-0">
          <span className="text-[14px] md:text-[16px] font-bold leading-[21.12px] text-white whitespace-nowrap md:text-center md:w-[100px] h-[34px] flex items-center">Ecosystem </span>
          <div className="flex flex-wrap gap-2 md:gap-[10px] text-sm font-bold leading-5 cursor-pointer">
            <p
              className={clsx(selectedEcosystem === "" ? currentTag : inactiveTag)}
              onClick={() => handleEcosystemClick("")}
            >
              All
            </p>
            {sortedEcosystemTags.map((tag) => (
              <p
                key={tag.id}
                className={clsx(
                  selectedEcosystem === tag.name ? currentTag : inactiveTag
                )}
                onClick={() => handleEcosystemClick(tag.name)}
              >
                {tag.name}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Sector Row */}
      <div className="flex flex-col md:flex-row justify-start items-start gap-2 md:gap-0">
        <span className="text-[14px] md:text-[16px] font-bold leading-[21.12px] text-white whitespace-nowrap md:text-center md:w-[100px] h-[34px] flex items-center">Sector </span>
        <div className="flex flex-wrap gap-2 md:gap-[10px] text-sm font-bold leading-5 cursor-pointer">
          <p
            className={clsx(selectedSector === "" ? currentTag : inactiveTag)}
            onClick={() => handleSectorClick("")}
          >
            All
          </p>
          {sortedSectorTags.map((tag) => (
            <p
              key={tag.id}
              className={clsx(
                selectedSector === tag.name ? currentTag : inactiveTag
              )}
              onClick={() => handleSectorClick(tag.name)}
            >
              {tag.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
} 