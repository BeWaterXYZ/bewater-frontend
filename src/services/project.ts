import { agentAnon } from './agent';
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
