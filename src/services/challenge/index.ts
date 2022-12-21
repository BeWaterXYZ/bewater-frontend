import { agentAnon } from '../agent';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  startTime: string;
  endTime: string;
  totalAward: number;
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELED' | 'PAUSED';
  location: string;
  judges: Judge[];
  awards: Award[];
  sponsors: Sponsor[];
}

export interface Award {
  id: string;
  awardName: string;
  amount: number;
  count: number;
  challengeId: string;
}

export interface Judge {
  id: string;
  name: string;
  title: string;
  organization: string;
  avatarURI: string;
  challengeId: string;
}

export interface Sponsor {
  id: string;
  sponsorName: string;
  logoURI: string;
  fundingAmount: number;
  challengeId: string;
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
