"use client";
import { useState } from "react";
import { useQueryBuilder } from "./query";
import { PageFilterOption } from "@/components/filter/PageFilterTag";

const FILTER_TYPES = [
  { key: "challengeTitle", label: "Campaigns" },
  { key: "tag", label: "Tags" },
  { key: "githubTag", label: "GitHub Tags" },
] as const;

type FilterType = typeof FILTER_TYPES[number]['key'];

export function ProjectFilter({
  filterOptions,
}: {
  filterOptions: {
    tags: string[];
    titles: string[];
    githubTags: string[];
  };
}) {
  const { toggle, isOn } = useQueryBuilder();
  const [activeTab, setActiveTab] = useState<FilterType>("challengeTitle");

  const getOptionsForType = (type: FilterType) => {
    switch (type) {
      case "challengeTitle":
        return filterOptions.titles;
      case "tag":
        return filterOptions.tags;
      case "githubTag":
        return filterOptions.githubTags;
    }
  };

  return (
    <div className="text-left pt-4">
      <div className="body-3 mb-7">Filter</div>
      
      {/* Tabs */}
      <div className="flex mb-4">
        {FILTER_TYPES.map(({ key, label }) => (
          <button
            key={key}
            className={`mr-4 body-5 uppercase pb-2 ${activeTab === key ? 'border-b-2 border-primary' : ''}`}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Filter options */}
      <div className="my-2 h-[50vh] overflow-y-auto">
        {getOptionsForType(activeTab)?.map((option, index) => (
          <PageFilterOption
            key={`${option}-${index}`}
            keyword={activeTab}
            value={option}
            label={option}
            on={isOn(activeTab, option)}
            toggle={toggle}
          />
        ))}
      </div>
    </div>
  );
}
