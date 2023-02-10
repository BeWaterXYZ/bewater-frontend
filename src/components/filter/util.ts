import { ProjectTagSet } from '@/constants/options/project-tag';
import { RoleSet } from '@/constants/options/role';
import { Project, Team } from '@/services/types';

export function prepareProjectTagFilterData(projects: Project[]) {
  let data = ProjectTagSet.map((tag) => ({
    tag,
    amount: projects.filter((project) => project.tags.includes(tag)).length,
  }));

  return data;
}

export function prepareRoleFilterData(teams: Team[]) {
  let data = RoleSet.map((role) => ({
    tag: role,
    amount: teams.filter((team) => team.openingRoles.includes(role)).length,
  }));
  return data;
}

export function prepareTeamReadinessFilterData(teams: Team[]) {
  let notReady = teams.filter((t) => t.teamMembers.length < 5).length;
  let data = [
    { tag: 'Opening', amount: notReady },
    { tag: 'Ready', amount: teams.length - notReady },
  ];

  return data;
}
