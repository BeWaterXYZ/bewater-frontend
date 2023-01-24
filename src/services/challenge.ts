import { ProjectTag, Role, Skill } from '@/components/tag';
import { agentAnon, agentAuthed } from './agent';
import { Challenge, ChallengeID, Team, TeamID, UserID } from './types';

export interface CreateTeamRequest {
  name: string;
  projectName: string;
  projectDescription: string;
  projectTags: ProjectTag[];
  challengeId: ChallengeID;
  openingRoles: Role[];
  skills: Skill[];
  leaderRole: Role;
}
export interface UpdateTeamRequest {
  name: string;
  projectName: string;
  projectDescription: string;
  projectTags: ProjectTag[];
  openingRoles: Role[];
  skills: Skill[];
}
export async function getChallenges() {
  const { data } = await agentAnon.get<{ challenges: Challenge[] }>(
    `/challenge/timerange`,
    {
      params: {
        startTime: '2022-01-01T19:54:35.308Z',
        endTime: '2023-12-20T19:54:35.308Z',
      },
    },
  );
  return data.challenges;
}

export async function getChallengeById(challengeId: ChallengeID) {
  const { data } = await agentAnon.get<{ challenge: Challenge }>(
    `/challenge/${challengeId}`,
    {},
  );
  return data.challenge;
}

export async function getChallengeTeams(challengeId: ChallengeID) {
  const { data } = await agentAnon.get<{ teams: Team[] }>(
    `/challenge/${challengeId}/teams`,
    {},
  );
  return data.teams;
}

export async function getTeam(teamId: TeamID) {
  const { data } = await agentAnon.get<{ team: Team }>(`/team/${teamId}`, {
    cache: 'force-cache',
    next: { revalidate: 10 },
  });
  return data.team;
}

export async function createTeam(payload: CreateTeamRequest) {
  const { data } = await agentAuthed.post<{ team: Team }>(`/team`, payload);
  return data;
}
export async function updateTeam(teamId: TeamID, payload: UpdateTeamRequest) {
  const { data } = await agentAuthed.put<{ team: Team }>(
    `/team/${teamId}`,
    payload,
  );
  return data.team;
}
export async function dismissTeam(teamId: TeamID) {
  const { data } = await agentAuthed.put<{ team: Team }>(
    `/team/${teamId}/dismiss`,
  );
  return data.team;
}
export async function teamRemoveMember(teamId: TeamID, userId: UserID) {
  const { data } = await agentAuthed.put<{ team: Team }>(
    `/team/${teamId}/remove`,
    {
      userId,
    },
  );
  return data.team;
}
