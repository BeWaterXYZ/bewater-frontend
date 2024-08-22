"use client";
import {
  prepareProjectTagFilterData,
  prepareProjectShortlistData,
} from "@/components/filter/util";
import { Project, Challenge } from "@/services/types";
import { FilterTag } from "@/components/filter/FilterTag";
import { ShortlistTag } from "@/components/filter/ShortlistTag";
import { useQueryBuilder } from "./query";
import { PageFilterTag } from "@/components/filter/PageFilterTag";

export function ProjectFilter({
  tags,
}: {
  tags:string[];
}) {
  const { toggle, isOn } = useQueryBuilder();

  return (
    <div className="text-left pt-4">
      <div className="body-3 mb-7">Filter</div>
      <div className="my-2">
        <p className="body-5 uppercase my-4">Tags</p>
        {tags
          .map((tag) => {
            return (
              <PageFilterTag
                key={tag}
                keyword="tag"
                value={tag}
                label={tag}
                on={isOn("tag", tag)}
                toggle={toggle}
              />
            );
          })}
      </div>
    </div>
  );
}
