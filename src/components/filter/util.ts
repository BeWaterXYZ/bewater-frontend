import { RoleSet } from "@/constants/options/role";
import { Project, Team, ProjectStatus } from "@/services/types";

export function prepareProjectTagFilterData(projects: Project[]) {
  const data: {
    tag: string;
    amount: number;
  }[] = [];

  const tmpMap: {
    [key: string]: number;
  } = {};
  for (const it of projects) {
    if (it.tags) {
      for (const tag of it.tags) {
        if (!tag) {
          continue;
        }
        if (tmpMap[tag]) {
          ++tmpMap[tag];
        } else {
          tmpMap[tag] = 1;
        }
      }
    }
  }
  for (const it of Object.keys(tmpMap)) {
    data.push({
      tag: it,
      amount: tmpMap[it],
    });
  }

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
    { tag: "Opening", amount: notReady },
    { tag: "Ready", amount: teams.length - notReady },
  ];

  return data;
}

export function prepareProjectShortlistData(projects: Project[]) {
  const selected: {
    status: string;
    amount: number;
  } = {
    status: "Shortlist",
    amount: 0,
  };

  const rejected: {
    status: string;
    amount: number;
  } = {
    status: "Rejected",
    amount: 0,
  };

  for (const it of projects) {
    if (it.status === ("SELECTED" as ProjectStatus)) {
      selected.amount += 1;
    } else if (it.status === ("REJECTED" as ProjectStatus)) {
      rejected.amount += 1;
    }
  }

  return [selected, rejected];
}
