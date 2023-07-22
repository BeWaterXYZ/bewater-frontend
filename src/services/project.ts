import { OptionalExceptFor } from '@/types/utils';
import { agentAnon, agentAuthed } from './agent';
import { ChallengeID, Project, ProjectId, RepoStats, TeamID } from './types';

export async function getChallengeTProjects(challengeId: ChallengeID) {
  const { data } = await agentAnon.get<{ projects: Project[] }>(
    `/challenge/${challengeId}/projects`,
    {},
  );
  return data.projects;
}
export async function getProject(projectId: ProjectId) {
  const { data } = await agentAnon.get<{ project: Project }>(
    `/project/${projectId}`,
    {},
  );
  return data.project;
}

export async function updateProject(project: OptionalExceptFor<Project, 'id'>) {
  const { data } = await agentAuthed.put<{ project: Project }>(
    `/project/${project.id}`,
    project,
  );
  return data.project;
}

export async function getProjectRating(projectId: ProjectId) {
  const { data } = await agentAuthed.get<{ mark: number[] }>(
    `/project/${projectId}/rank`,
    {},
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
  const { data } = await agentAuthed.post(`/project/${projectId}/rank`, {
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
  const { data } = await agentAnon.get<RepoStats>('/project/stats', {
    params: {
      teamId,
      githubURI,
    },
  });
  return data;
}
