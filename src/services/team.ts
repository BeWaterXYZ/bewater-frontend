import { agentAnon, agentAuthed } from './agent';
import {
  ChallengeID,
  Team,
  TeamID,
  TeamMember,
  UserID,
  UserProfile,
} from './types';
import { CreateTeamRequest, UpdateTeamRequest } from './challenge';
import { RoleUnion } from '@/constants/options/role';

interface CreateTeamResponse {
  team?: Team;
  teamLeader?: UserProfile;
  leaderAlreadyInChallenge: boolean;
}

export async function getChallengeTeams(challengeId: ChallengeID) {
  const { data } = await agentAnon.get<{ teams: Team[] }>(
    `/challenge/${challengeId}/teams`,
    {},
  );
  return data.teams ?? [];
}

export async function getTeam(teamId: TeamID) {
  const { data } = await agentAnon.get<{ team: Team }>(`/team/${teamId}`);
  return data.team;
}

export async function createTeam(payload: CreateTeamRequest) {
  const { data } = await agentAuthed.post<CreateTeamResponse>(`/team`, payload);
  return data;
}
export async function updateTeam(
  teamId: TeamID,
  payload: Partial<UpdateTeamRequest>,
) {
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

export async function teamUpdateMemberRole(
  teamId: TeamID,
  userId: UserID,
  teamRole: RoleUnion,
) {
  const { data } = await agentAuthed.put<{ teamMember: TeamMember }>(
    `/team/${teamId}/updateMember`,
    {
      userId,
      teamRole,
    },
  );
  return data.teamMember;
}
