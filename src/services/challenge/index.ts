import { Roles, Skill } from '@/components/tag';
import { agentAnon } from '../agent';
import { UserProfile } from '../user';

export interface Challenge {
  id: number;
  title: string;
  description: string;
  requirements: string[];
  startTime: string;
  endTime: string;
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
  dueDate: Date;
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
  description: string;
  status: string;
  challengeId: number;
  openingRoles: Roles[];
  tags: string[];
  skills: Skill[];
  teamMembers: TeamMember[];
}

export interface TeamMember {
  id: string;
  teamId: number;
  userId: string;
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

export async function getChallengeById(challengeId: string) {
  const { data } = await agentAnon.get<{ challenge: Challenge }>(
    `/challenge/${challengeId}`,
    {
      cache: 'force-cache',
      next: { revalidate: 10 },
    },
  );
  return data.challenge;
}

export async function getChallengeTeams(challengeId: string) {
  const { data } = await agentAnon.get<{ teams: Team[] }>(
    `/challenge/${challengeId}/teams`,
    {
      cache: 'force-cache',
      next: { revalidate: 10 },
    },
  );
  return data.teams;
}
export async function getTeam(teamId: string) {
  const { data } = await agentAnon.get<{ team: Team }>(`/team/${teamId}`, {
    cache: 'force-cache',
    next: { revalidate: 10 },
  });
  return data.team;
}
