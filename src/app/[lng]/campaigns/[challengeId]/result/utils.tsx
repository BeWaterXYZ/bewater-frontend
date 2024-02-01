import { Challenge, ChallengeTrackResult, TrackAward } from "@/services/types";

export function isResultShow(challenge: Challenge | undefined): boolean {
  if (!challenge) return false;
  const {
    future: { announceResult },
    milestones,
  } = challenge;
  const milestoneTime = [...milestones].pop()?.dueDate!;
  if (announceResult === "1970-01-01T00:00:00.000Z") return false;
  else if (announceResult === "1971-01-01T00:00:00.000Z") {
    return Date.now() > new Date(milestoneTime).getTime();
  } else if (announceResult) {
    return Date.now() > new Date(announceResult).getTime();
  } else return true;
}

export function isShortlistShow(challenge: Challenge | undefined): boolean {
  if (!challenge) return false;
  const {
    future: { announceShortlist },
    milestones,
  } = challenge;
  const milestoneTime = [...milestones].pop()?.dueDate!;
  if (announceShortlist === "1970-01-01T00:00:00.000Z") return false;
  else if (announceShortlist === "1971-01-01T00:00:00.000Z") {
    return Date.now() > new Date(milestoneTime).getTime();
  } else if (announceShortlist) {
    return Date.now() > new Date(announceShortlist).getTime();
  } else return false;
}
