"use client";
import Select, { ClassNamesConfig } from "react-select";
import { SearchInput } from "@/components/molecules/search-input";
import { Challenge, Project } from "@/services/types";
import { CaretRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";
import { ScoreDetail } from "./score-detail";

function getProjects(projects: Project[], search: string, tag: string) {
  let res = projects;
  if (search) {
    res = res.filter((proj) =>
      proj.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (tag) {
    res = res.filter((proj) => proj.tags.some((t) => t === tag));
  }

  return res;
}
function getTags(projects: Project[]) {
  return Array.from(new Set(projects.flatMap((proj) => proj.tags)));
}
export function ScoreDetails({
  projects,
  challenge,
}: {
  projects: Project[];
  challenge: Challenge;
}) {
  let [search, setSearch] = useState("");
  let [tag, setTag] = useState("");
  let projects_ = getProjects(projects, search, tag);
  const options = [
    { value: "", label: "All" },
    ...getTags(projects).map((tag) => ({ value: tag, label: tag })),
  ];
  const styles: ClassNamesConfig<(typeof options)[number], false> = {
    control: () => "!bg-transparent !border-none !outline-none !shadow-none",
    clearIndicator: () => "!hidden",
    indicatorSeparator: () => "!hidden",
    indicatorsContainer: () => "!hidden",
    valueContainer: () => "!bg-transparent",
    singleValue: () => "body-4 !text-white",
    menu: () =>
      "!bg-[#0F1021] !border !border-midnight !w-fit whitespace-nowrap",
    option: () => "!text-white hover:!bg-midnight !bg-transparent",
    input: () => "!text-white",
    container: () => "!inline-block",
  };
  return (
    <div className="bg-latenight border border-[#24254E] rounded p-4">
      <p className="body-2 font-bold pb-4">Score Details</p>
      {projects_.length > 0 && (
        <div className="flex gap-4 items-center">
          <div>
            <label className="text-xs text-[#CBD5E1]">Tags:</label>
            <Select
              isSearchable={false}
              classNames={styles}
              defaultValue={options[0]}
              onChange={(val) => {
                setTag(val!.value);
              }}
              options={options}
            />
          </div>
          <SearchInput
            placeholder="Search Project Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}
      <div>
        {projects_.length === 0 && (
          <p className="font-secondary py-[108px] text-xs text-[#64748B] text-center">
            Score details will be displayed when the milestone for judging
            begins.
          </p>
        )}
        {projects_.map((proj) => {
          return (
            <ScoreDetail key={proj.id} challenge={challenge} project={proj} />
          );
        })}
      </div>
    </div>
  );
}
