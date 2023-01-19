import { ProjectTag, Role, Skill } from '@/components/tag';
import { agentAnon, agentAuthed } from '../agent';
import { UserID, UserProfile } from '../user';
import { GroupingRequest, GroupingRequestId } from '../shared';

export type ChallengeID = string;
export interface Challenge {
  id: ChallengeID;
  title: string;
  description: string;
  requirements: string[];
  startTime: string;
  endTime: string;
  teamUpDeadline: string;
  totalAward: number;
  awardCurrency: string;
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELED' | 'PAUSED';
  location: string;
  judgeIDs: string[];
  userIDs: string[];
  awards: Award[];
  milestones: Milestone[];
  judges: Judge[];
  sponsorships: Sponsorship[];
}

export interface Award {
  awardName: string;
  amount: number;
  count: number;
}

export interface Judge {
  id: string;
  name: string;
  title: string;
  organization: string;
  avatarURI: string;
  challengeIDs: number[];
}

export interface Milestone {
  dueDate: string;
  stageName: string;
}

export interface Sponsorship {
  id: number;
  amount: number;
  currency: string;
  challengeId: number;
  sponsorId: string;
  sponsor: Sponsor;
}

export interface Sponsor {
  id: string;
  sponsorName: string;
  logoURI: string;
}

export type TeamID = string;

export interface Team {
  id: TeamID;
  name: string;
  status: string;
  challengeId: ChallengeID;
  openingRoles: Role[];
  skills: Skill[];
  teamMembers: TeamMember[];
  project: Project;
}
export interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  status: string;
  teamId: string;
}
export interface TeamMember {
  id: string;
  teamId: number;
  userId: UserID;
  teamRole: Role;
  isLeader: boolean;
  userProfile: UserProfile;
}

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
      cache: 'force-cache',
      next: { revalidate: 10 },
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
    {
      cache: 'force-cache',
      next: { revalidate: 10 },
    },
  );
  return data.challenge;
}

export async function getChallengeTeams(challengeId: ChallengeID) {
  const { data } = await agentAnon.get<{ teams: Team[] }>(
    `/challenge/${challengeId}/teams`,
    {
      cache: 'force-cache',
      next: { revalidate: 10 },
    },
  );
  return data.teams;
}

// const sleep = (ms:number) => new Promise(res=>setTimeout(() => {
//   res(ms)
// }, ms))

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

export async function sendTeamApplication(
  teamId: Pick<Team, 'id'>['id'],
  request: Omit<GroupingRequest, 'senderId'>,
) {
  const { data } = await agentAuthed.post(`/team/${teamId}/request`, request);
  return data;
}

export async function revokeGroupingRequest(requestId: GroupingRequestId) {
  const { data } = await agentAuthed.put(`/team/request/${requestId}/revoke`);
  return data;
}
export async function acceptGroupingRequest(requestId: GroupingRequestId) {
  const { data } = await agentAuthed.put(`/team/request/${requestId}/accept`);
  return data;
}
export async function declineGroupingRequest(requestId: GroupingRequestId) {
  const { data } = await agentAuthed.put(`/team/request/${requestId}/decline`);
  return data;
}
