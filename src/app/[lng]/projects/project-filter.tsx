"use client";
import {
  prepareProjectTagFilterData,
  prepareProjectShortlistData,
} from "@/components/filter/util";
import { Project, Challenge } from "@/services/types";
import { FilterTag } from "@/components/filter/FilterTag";
import { ShortlistTag } from "@/components/filter/ShortlistTag";
import { useQueryBuilder } from "./query";
import { PageFilterOption } from "@/components/filter/PageFilterTag";

export function ProjectFilter({
  filterOptions,
}: {
  filterOptions: { tags: string[]; titles: string[] };
}) {
  const { toggle, isOn } = useQueryBuilder();

  return (
    <div className="text-left pt-4">
      <div className="body-3 mb-7">Filter</div>
      <div className="my-2">
        <p className="body-5 uppercase my-4">Campaigns</p>
        {filterOptions.titles.map((title, index) => {
          return (
            <PageFilterOption
              key={`${title}-${index}`}
              keyword="challengeTitle"
              value={title}
              label={title}
              on={isOn("challengeTitle", title)}
              toggle={toggle}
            />
          );
        })}
      </div>
    </div>
  );
}
