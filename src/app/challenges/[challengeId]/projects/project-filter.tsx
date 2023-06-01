'use client';
import { prepareProjectTagFilterData } from '@/components/filter/util';
import { Project } from '@/services/types';
import { FilterTag } from '@/components/filter/FilterTag';
import { useQueryBuilder } from '../query';

export function ProjectFilter({ projects }: { projects: Project[] }) {
  let { toggle, isOn } = useQueryBuilder();

  let tagsData = prepareProjectTagFilterData(projects);
  return (
    <div className="text-left pt-4">
      <div className="body-3 mb-7">Filter</div>

      <div className="my-2">
        <p className="body-5 uppercase my-4">Tags</p>
        {tagsData
          .filter((item) => item.amount > 0)
          .map((item) => {
            return (
              <FilterTag
                key={item.tag}
                keyword="tag"
                value={item.tag}
                label={item.tag}
                amount={item.amount}
                on={isOn('tag', item.tag)}
                toggle={toggle}
              />
            );
          })}
      </div>
    </div>
  );
}
