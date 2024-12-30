import clsx from "clsx";
import { useEffect, useState } from "react";
import { useRankingTags } from "@/services/leaderboard.query";
import { RankingTagType } from "@/services/leaderboard";

const currentTag = "bg-[#475569] text-white px-5 h-[34px] flex items-center rounded-[6px] whitespace-nowrap";
const inactiveTag = "text-white hover:bg-[#475569] transition-all px-5 h-[34px] flex items-center rounded-[6px] whitespace-nowrap";

interface TagSelectorProps {
  onChange: (tags: { ecosystem: string; sector: string }) => void;
}

export default function TagSelector({ onChange }: TagSelectorProps) {
  const [selectedEcosystem, setSelectedEcosystem] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  
  const { data: ecosystemTags = [] } = useRankingTags(RankingTagType.ECOSYSTEM);
  const { data: sectorTags = [] } = useRankingTags(RankingTagType.SECTOR);
  
  useEffect(() => {
    onChange({ ecosystem: selectedEcosystem, sector: selectedSector });
  }, [onChange, selectedEcosystem, selectedSector]);
  
  return (
    <div className="flex flex-col gap-6">
      {/* Ecosystem Row */}
      <div className="flex">
        <span className="text-[16px] font-bold leading-[21.12px] text-white whitespace-nowrap text-center w-[120px] h-[34px] flex items-center">Ecosystem </span>
        <div className="flex flex-wrap gap-[10px] text-sm font-bold leading-5 cursor-pointer">
          <p
            className={clsx(selectedEcosystem === "" ? currentTag : inactiveTag)}
            onClick={() => setSelectedEcosystem("")}
          >
            All
          </p>
          {ecosystemTags.map((tag) => (
            <p
              key={tag.id}
              className={clsx(
                selectedEcosystem === tag.name ? currentTag : inactiveTag
              )}
              onClick={() => setSelectedEcosystem(tag.name)}
            >
              {tag.name}
            </p>
          ))}
        </div>
      </div>

      {/* Sector Row */}
      <div className="flex">
        <span className="text-[16px] font-bold leading-[21.12px] text-white whitespace-nowrap text-center w-[120px] h-[34px] flex items-center">Sector </span>
        <div className="flex flex-wrap gap-[10px] text-sm font-bold leading-5 cursor-pointer">
          <p
            className={clsx(selectedSector === "" ? currentTag : inactiveTag)}
            onClick={() => setSelectedSector("")}
          >
            All
          </p>
          {sectorTags.map((tag) => (
            <p
              key={tag.id}
              className={clsx(
                selectedSector === tag.name ? currentTag : inactiveTag
              )}
              onClick={() => setSelectedSector(tag.name)}
            >
              {tag.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
} 