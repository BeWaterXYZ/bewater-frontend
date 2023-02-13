import { OptionalExceptFor } from '@/types/utils';
import { agentAnon, agentAuthed } from './agent';
import { ChallengeID, Project, ProjectId } from './types';

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

export async function updateProject(
  project: OptionalExceptFor<Project, 'id' | 'mediaURLs'>,
) {
  const { data } = await agentAuthed.put<Project>(
    `/project/${project.id}`,
    project,
  );
  return data;
}
