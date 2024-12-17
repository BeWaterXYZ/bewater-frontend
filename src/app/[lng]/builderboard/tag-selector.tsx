import clsx from "clsx";
import { useEffect, useState } from "react";

const currentTag = "bg-[#475569] text-white px-5 h-[34px] flex items-center rounded-[6px] whitespace-nowrap";
const inactiveTag = "text-white hover:bg-[#475569] transition-all px-5 h-[34px] flex items-center rounded-[6px] whitespace-nowrap";

const EcosystemList = [
  "Ethereum",
  "Solana",
  "Polygon",
  "BNB Chain",
  "Arbitrum",
  "Optimism",
  "Base",
  "Sui",
  "Aptos",
];

const SectorList = [
  "DeFi",
  "NFT",
  "GameFi",
  "Web3",
  "AIGC",
  "DAO Tool",
  "Web3 Security",
  "Zero Knowledge",
];

interface TagSelectorProps {
  onChange: (tags: { ecosystem: string; sector: string }) => void;
}

export default function TagSelector({ onChange }: TagSelectorProps) {
  const [selectedEcosystem, setSelectedEcosystem] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  
  useEffect(() => {
    onChange({ ecosystem: selectedEcosystem, sector: selectedSector });
  }, [onChange, selectedEcosystem, selectedSector]);
  
  return (
    <div className="flex flex-col gap-6">
      {/* Ecosystem Row */}
      <div className="flex">
        <span className="text-[16px] font-bold leading-[21.12px] text-white whitespace-nowrap text-center w-[120px] h-[34px] flex items-center">Ecosystem:</span>
        <div className="flex flex-wrap gap-[10px] text-sm font-bold leading-5 cursor-pointer">
          <p
            className={clsx(selectedEcosystem === "" ? currentTag : inactiveTag)}
            onClick={() => setSelectedEcosystem("")}
          >
            All
          </p>
          {EcosystemList.map((ecosystem) => (
            <p
              key={ecosystem}
              className={clsx(
                selectedEcosystem === ecosystem ? currentTag : inactiveTag
              )}
              onClick={() => setSelectedEcosystem(ecosystem)}
            >
              {ecosystem}
            </p>
          ))}
        </div>
      </div>

      {/* Sector Row */}
      <div className="flex">
        <span className="text-[16px] font-bold leading-[21.12px] text-white whitespace-nowrap text-center w-[120px] h-[34px] flex items-center">Sector:</span>
        <div className="flex flex-wrap gap-[10px] text-sm font-bold leading-5 cursor-pointer">
          <p
            className={clsx(selectedSector === "" ? currentTag : inactiveTag)}
            onClick={() => setSelectedSector("")}
          >
            All
          </p>
          {SectorList.map((sector) => (
            <p
              key={sector}
              className={clsx(
                selectedSector === sector ? currentTag : inactiveTag
              )}
              onClick={() => setSelectedSector(sector)}
            >
              {sector}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
} 