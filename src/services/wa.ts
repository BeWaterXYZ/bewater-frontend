import { agentAuthed } from "./agent";

export function postPvData(userStamp: string, challengeId: string) {
  return agentAuthed.post(`/host-utils/${userStamp}/report`, {
    challengeId,
  });
}
