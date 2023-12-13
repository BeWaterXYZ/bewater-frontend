import { RoleUnion } from "@/constants/options/role";
import { SkillUnion } from "@/constants/options/skill";
import { agentAnon, agentAuthed } from "./agent";
import {
  Challenge,
  ChallengeID,
  ChallengeInvitation,
  Shortlist,
  UserID,
} from "./types";

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
        startTime: "2022-01-01T19:54:35.308Z",
        endTime: "2025-01-01T00:00:00.000Z",
      },
    }
  );
  return data.challenges;
}

export async function getChallengeById(challengeId: ChallengeID) {
  const { data } = await agentAuthed.get<{ challenge: Challenge }>(
    `/challenge/${challengeId}`,
    {}
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

export async function getHostChallengeList(id?: string) {
  const { data } = await agentAuthed.get<{ challenges: Challenge[] }>(
    `/host-challenge/self-challenges${id ? "?challengeId=" + id : ""}`,
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

export async function deleteChallenge(challengeId: ChallengeID) {
  const { data } = await agentAuthed.delete<Challenge>(
    `/host-challenge/${challengeId}`
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

export async function inviteToChallenge(id: ChallengeID, emails: string[]) {
  const { data } = await agentAuthed.post(
    `/host-challenge/${id}/invitation`,
    emails
  );
  return data;
}

export async function getChallengeInvitation(id: ChallengeID) {
  const { data } = await agentAuthed.get<ChallengeInvitation[]>(
    `/host-challenge/${id}/invitation`
  );
  return data;
}

export function getHostChallengePage(version: number, id?: string) {
  return agentAuthed.get(
    `/host-challenge/self-challenges?version=${version}${id ? "&challengeId=" + id : ""}`
  );
}

export async function inviteRatingJudge(
  challengeId: ChallengeID,
  userId: UserID
) {
  const { data } = await agentAuthed.post(
    `/challenge/${challengeId}/reviewer`,
    { userId }
  );
  return data;
}

export async function deleteRatingJudge(
  challengeId: ChallengeID,
  userId: UserID
) {
  const { data } = await agentAuthed.delete(
    `/challenge/${challengeId}/reviewer`,
    {
      data: { userId },
    }
  );
  return data;
}

export async function getChallengeShortlist(challengeId: ChallengeID) {
  const { data } = await agentAuthed.get<Shortlist[]>(
    `/challenge/${challengeId}/shortlist`
  );
  return data;
}
export type UpdateShortlistForm = {
  shortlist: Shortlist[];
  announceShortlist?: null | string;
  announceResult?: null | string;
};
export async function updateChallengeShortlist(
  challengeId: ChallengeID,
  form: UpdateShortlistForm
) {
  const { data } = await agentAuthed.post(
    `/host-challenge/${challengeId}/shortlist`,
    form
  );

  return data;
}
