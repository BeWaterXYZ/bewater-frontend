'use client';
import { prepareProjectTagFilterData, prepareProjectShortlistData } from '@/components/filter/util';
import { Project, Challenge } from '@/services/types';
import { FilterTag } from '@/components/filter/FilterTag';
import { ShortlistTag } from '@/components/filter/ShortlistTag'
import { useQueryBuilder } from '../query';

export function ProjectFilter({ projects, challenge }: { projects: Project[], challenge: Challenge }) {
  const { toggle, isOn } = useQueryBuilder();

  let showSL = false;
  if (Array.isArray(challenge.shortlist)) {
    const timeedge = new Date('2000-01-01T00:00:00.000Z')
    if (!challenge.future.announceShortlist) {
      showSL = true;
    } else if (new Date(challenge.future.announceShortlist) < timeedge) {
      /* empty */
    } else if (new Date(challenge.future.announceShortlist) < new Date()) {
      showSL = true;
    }
  }

  const tagsData = prepareProjectTagFilterData(projects);
  const shortlistD = prepareProjectShortlistData(projects);
  return (
    <div className="text-left pt-4">
      <div className="body-3 mb-7">Filter</div>
      {
        showSL && (<div className="my-2">
        <p className="body-5 uppercase my-4">status</p>
        {shortlistD
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
      </div>)
      }
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
