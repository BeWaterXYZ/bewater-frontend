'use client';
import { prepareProjectTagFilterData, prepareProjectShortlistData } from '@/components/filter/util';
import { Project } from '@/services/types';
import { FilterTag } from '@/components/filter/FilterTag';
import { ShortlistTag } from '@/components/filter/ShortlistTag'
import { useQueryBuilder } from '../query';

export function ProjectFilter({ projects }: { projects: Project[] }) {
  const { toggle, isOn } = useQueryBuilder();

  const tagsData = prepareProjectTagFilterData(projects);
  const shortlistD = prepareProjectShortlistData(projects);
  return (
    <div className="text-left pt-4">
      <div className="body-3 mb-7">Filter</div>

      <div className="my-2">
        <p className="body-5 uppercase my-4">status</p>
        {shortlistD
          .filter((item) => item.amount > -1)
          .map((item) => {
            return (
              <ShortlistTag
                key={item.status}
                keyword="shortlist"
                value={item.status}
                label={item.status}
                amount={item.amount}
                on={isOn('shortlist', item.status)}
                toggle={toggle}
              />
            );
          })}
      </div>
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
