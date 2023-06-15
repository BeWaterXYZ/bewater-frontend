import { agentAuthed } from "./agent";
import { Challenge, ChallengeID, Judge } from "./types";

export async function getChallenges() {
  // const { data } = await agentAnon.get<{ challenges: Challenge[] }>(
  //   `/challenge/timerange`,
  //   {
  //     params: {
  //       startTime: '2022-01-01T19:54:35.308Z',
  //       endTime: '2023-12-20T19:54:35.308Z',
  //     },
  //   },
  // );
  // return data.challenges;
}

export async function getChallengeById(challengeId: ChallengeID) {
  const { data } = await agentAuthed.get<{ challenge: Challenge }>(
    `/challenge/${challengeId}`,
    {}
  );
  return data.challenge;
}
export async function getChallengeList() {
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
export async function updateChallenge(
  challenge: Partial<Challenge>
) {
  const { data } = await agentAuthed.put<Challenge>(
    `/host-challenge/${challenge.id}`,
    challenge
  );
  return data;
}
