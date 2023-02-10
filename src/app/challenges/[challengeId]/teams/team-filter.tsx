'use client';
import { FilterTag } from '@/components/filter/FilterTag';
import {
  prepareProjectTagFilterData,
  prepareRoleFilterData,
} from '@/components/filter/util';
import { Team } from '@/services/types';
import { useQueryBuilder } from '../query';

export function TeamFilter({ teams }: { teams: Team[] }) {
  let { toggle, isOn } = useQueryBuilder();

  let tagsData = prepareProjectTagFilterData(teams.map((t) => t.project));
  // let readinessData = prepareTeamReadinessFilterData(teams);
  let rolesData = prepareRoleFilterData(teams);
  return (
    <div className="text-left">
      <div className="body-3 mb-4">Filter</div>
      {/* <div className="my-2">
        <p className="body-5 uppercase my-4 ">Status</p>
        {readinessData.map((item) => {
          return (
            <FilterTag
              key={item.tag}
              keyword="status"
              value={item.tag}
              label={item.tag}
              amount={item.amount}
            />
          );
        })}
      </div> */}

      <div className="my-2">
        <p className="body-5 uppercase my-4 ">Roles</p>
        {rolesData
          .filter((item) => item.amount > 0)
          .map((item) => {
            return (
              <FilterTag
                key={item.tag}
                keyword="role"
                value={item.tag}
                label={item.tag}
                amount={item.amount}
                on={isOn('role', item.tag)}
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
