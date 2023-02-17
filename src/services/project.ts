import { OptionalExceptFor } from '@/types/utils';
import { agentAnon, agentAuthed } from './agent';
import { ChallengeID, Project, ProjectId, TeamID } from './types';

export async function getChallengeTProjects(challengeId: ChallengeID) {
  const { data } = await agentAnon.get<{ projects: Project[] }>(
    `/challenge/${challengeId}/projects`,
    {},
  );
  return data.projects;
}
export async function getProject(projectId: ProjectId) {
  const { data } = await agentAnon.get<Project>(`/project/${projectId}`, {});
  return data;
}

export async function updateProject(project: OptionalExceptFor<Project, 'id'>) {
  const { data } = await agentAuthed.put<{ project: Project }>(
    `/project/${project.id}`,
    project,
  );
  return data.project;
}

export async function getGitHubRepos(teamId: TeamID) {
  const { data } = await agentAuthed.post<{
    repos: {
      fullName: string;
      url: string;
    }[];
  }>(`/project/github/${teamId}`);
  return data.repos;
}
