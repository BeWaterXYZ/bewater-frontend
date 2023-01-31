'use client';
import { ProjectTagSet } from '@/constants/options/project-tag';
import { RoleSet } from '@/constants/options/role';
import { Team } from '@/services/types';
import clsx from 'clsx';
import { useQueryBuilder } from '../projects/query';

function FilterTag({
  keyword,
  value,
  label,
  amount,
}: {
  keyword: string;
  value: string;
  label: string;
  amount?: number;
}) {
  let { toggle, isOn } = useQueryBuilder();

  let onToggle = (key: string, value: string) => () => {
    toggle(key, value);
  };
  let on = isOn(keyword, value);
  return (
    <div className="w-full flex justify-between">
      <label
        className={clsx(
          'body-4 flex items-center my-1 cursor-pointer',
          on ? 'text-white' : 'text-[#94A3B8]',
        )}
      >
        <input
          className="mr-2 w-4 h-4 block"
          type="checkbox"
          checked={isOn(keyword, value)}
          onChange={onToggle(keyword, value)}
        ></input>
        <span>{label}</span>
      </label>
      <div className={clsx('body-4', on ? 'text-white' : 'text-[#94A3B8]')}>
        {amount}
      </div>
    </div>
  );
}

function prepareProjectTagFilterData(teams: Team[]) {
  let data = ProjectTagSet.map((tag) => ({
    tag,
    amount: teams.filter((team) => team.project.tags.includes(tag)).length,
  }));

  return data;
}

function prepareRoleFilterData(teams: Team[]) {
  let data = RoleSet.map((role) => ({
    tag: role,
    amount: teams.filter((team) => team.openingRoles.includes(role)).length,
  }));
  return data;
}

function prepareTeamReadinessFilterData(teams: Team[]) {
  let notReady = teams.filter((t) => t.teamMembers.length < 5).length;
  let data = [
    { tag: 'Opening', amount: notReady },
    { tag: 'Ready', amount: teams.length - notReady },
  ];

  return data;
}
export function TeamFilter({ teams }: { teams: Team[] }) {
  let tagsData = prepareProjectTagFilterData(teams);
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
              />
            );
          })}
      </div>
    </div>
  );
}
