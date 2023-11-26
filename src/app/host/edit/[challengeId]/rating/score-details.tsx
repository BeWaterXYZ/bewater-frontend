"use client";
import { Select } from "@/components/form/control";
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
  return (
    <div className="bg-latenight border border-[#24254E] rounded p-4">
      <p className="body-2">Score Details</p>
      <div className="flex gap-2 items-center">
        <div>
          <label>Tags:</label>
          <select
            defaultValue={tag}
            onChange={(e) => {
              setTag(e.target.value);
            }}
            className="bg-[#0F1021] text-white/90 text-[14px] font-normal"
          >
            <option key={tag} value={""}>
              All
            </option>
            {getTags(projects).map((tag) => {
              return (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              );
            })}
          </select>
        </div>
        <SearchInput
          placeholder="Search project name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        {projects_.map((proj) => {
          return (
            <div
              className="p-4 bg-[#1A1C40] rounded flex justify-between items-center my-2"
              key={proj.id}
            >
              <div className="flex-1">
                <p className="body-3">{proj.name}</p>
                <div className="flex gap-2 items-center">
                  <p className="body-4 text-grey-300">{proj.team.name}</p>
                  {proj.tags.map((t) => {
                    return (
                      <div
                        key={t}
                        className="text-grey-300 body-5 px-1 rounded border uppercase"
                      >
                        {t}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-1 justify-between items-center">
                <div>
                  <p className="text-grey-300 body-4">
                    {proj.projectScore.length === challenge.reviewers.length
                      ? "All Judges done"
                      : `${proj.projectScore.length}/${challenge.reviewers.length} judges done`}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-grey-300 body-3">score</p>
                    <p className="text-day body-1">
                      {proj.projectScore.length > 0
                        ? `${
                            proj.projectScore
                              .flatMap((s) => s.mark)
                              .reduce((partialSum, a) => partialSum + a, 0) /
                            proj.projectScore.length
                          }/${(challenge.scoreDimension ?? []).length * 10}`
                        : "--"}
                    </p>
                  </div>
                  <div>
                   <ScoreDetail challenge={challenge} project={proj}/>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
