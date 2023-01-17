import { Roles, Skill } from '@/components/tag';
import { agentAnon, agentAuthed } from '../agent';
import { UserID, UserProfile } from '../user';
import { GroupingRequest, GroupingRequestId } from '../shared';

export interface Challenge {
  id: number;
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

export interface Team {
  id: number;
  name: string;
  ideaTitle: string;
  ideaDescription: string;
  status: string;
  challengeId: number;
  openingRoles: Roles[];
  ideaTags: string[];
  skills: Skill[];
  teamMembers: TeamMember[];
}

export interface TeamMember {
  id: string;
  teamId: number;
  userId: UserID;
  teamRole: Roles;
  isLeader: boolean;
  userProfile: UserProfile;
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

export async function getChallengeById(challengeId: number) {
  const { data } = await agentAnon.get<{ challenge: Challenge }>(
    `/challenge/${challengeId}`,
    {
      cache: 'force-cache',
      next: { revalidate: 10 },
    },
  );
  return data.challenge;
}

export async function getChallengeTeams(challengeId: number) {
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

export async function getTeam(teamId: number) {
  const { data } = await agentAnon.get<{ team: Team }>(`/team/${teamId}`, {
    cache: 'force-cache',
    next: { revalidate: 10 },
  });
  return data.team;
}

export async function teamRemoveMember(teamId: number, userId: string) {
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
  request: GroupingRequest,
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
