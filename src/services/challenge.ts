// import { ProjectTagUnion } from '@/constants/options/project-tag';
import { RoleUnion } from '@/constants/options/role';
import { SkillUnion } from '@/constants/options/skill';
import { agentAnon, agentAuthed } from './agent';
import { Challenge, ChallengeID } from './types';

export interface CreateTeamRequest {
  name: string;
  projectName: string;
  projectDescription: string;
  projectTags: string[];
  challengeId: ChallengeID;
  openingRoles: RoleUnion[];
  skills: SkillUnion[];
  leaderRole: RoleUnion;
}
export interface UpdateTeamRequest {
  name: string;
  projectName: string;
  projectDescription: string;
  projectTags: string[];
  openingRoles: RoleUnion[];
  skills: SkillUnion[];
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



export async function getHostChallengeById(challengeId: ChallengeID) {
  const { data } = await agentAuthed.get<{ challenge: Challenge }>(
    `/host-challenge/${challengeId}`,
    {}
  );
  return data.challenge;
}
export async function getHostChallengeList() {
  const { data } = await agentAuthed.get<{ challenges: Challenge[] }>(
    `/host-challenge/self-challenges`,
    {}
  );
  return data.challenges;
}
export async function createChallenge(challenge: Partial<Challenge>) {
  const { data } = await agentAuthed.post<Challenge>(
    `/host-challenge`,
    challenge
  );
  return data;
}
export async function updateChallenge(challenge: Partial<Challenge>) {
  const { data } = await agentAuthed.put<Challenge>(
    `/host-challenge/${challenge.id}`,
    challenge
  );
  return data;
}
export async function publishChallengeRequest(challengeId: ChallengeID) {
  const { data } = await agentAuthed.post<Challenge>(
    `/host-challenge/publish-request`,
    { id: challengeId }
  );
  return data;
}
