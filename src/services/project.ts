import { OptionalExceptFor } from "@/types/utils";
import { agentAnon, agentAuthed } from "./agent";
import {
  ChallengeID,
  Project,
  ProjectId,
  RepoStats,
  TeamID,
  ProjectStatus,
} from "./types";

export async function getChallengeTProjects(challengeId: ChallengeID) {
  const { data } = await agentAuthed.get<{ projects: Project[] }>(
    `/challenge/${challengeId}/projects`,
    {}
  );
  return data.projects;
}

export async function getProjects(
  limit: number,
  filterOptions: { filterTags?: string[]; challengeTitle?: string[], githubTags?: string[], searchQuery?: string } = {},
  cursorId?: string
) {
  const { data } = await agentAuthed.get<{ projects: Project[] }>(
    `/project/projects`,
    {
      params: {
        limit,
        filterTags: filterOptions?.filterTags?.join(","),
        challengeTitle: filterOptions?.challengeTitle?.join(","),
        githubTags: filterOptions?.githubTags?.join(","),
        cursorId,
        search: filterOptions?.searchQuery,
      },
    }
  );
  return { projects: data.projects, cursorId, filterOptions };
}
export async function getProjectFilterOptions() {
  const { data } = await agentAuthed.get<{
    filterTags: string[];
    titles: string[];
    githubTags: string[];
  }>(`challenge/filterOptions`);
  return data;
}

export async function getProject(projectId: ProjectId) {
  const { data } = await agentAnon.get<{ project: Project }>(
    `/project/${projectId}`
  );
  return data.project;
}

export async function updateProject(project: OptionalExceptFor<Project, "id">) {
  const { data } = await agentAuthed.put<{ project: Project }>(
    `/project/${project.id}`,
    project
  );
  return data.project;
}

export async function getProjectRating(projectId: ProjectId) {
  const { data } = await agentAuthed.get<{ mark: number[] }>(
    `/project/${projectId}/score`,
    {}
  );
  return data.mark;
}

export async function updateProjectRating({
  projectId,
  mark,
}: {
  projectId: ProjectId;
  mark: number[];
}) {
  const { data } = await agentAuthed.post(`/project/${projectId}/score`, {
    mark,
  });
  return data;
}

export async function getGitHubRepos(teamId: TeamID) {
  const { data } = await agentAuthed.post<{
    repos: {
      fullName: string;
      url: string;
      updatedAt: string;
    }[];
  }>(`/project/github/${teamId}`);
  return data.repos;
}

export async function getProjectRepoStats(teamId: TeamID, githubURI: string) {
  const { data } = await agentAnon.get<RepoStats>("/project/stats", {
    params: {
      teamId,
      githubURI,
    },
  });
  return data;
}

export function putProjectStatus(projectId: ProjectId, status: ProjectStatus) {
  return agentAuthed.post(`/project/${projectId}/project-status`, {
    status,
  });
}
