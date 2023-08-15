import { Challenge, Milestone } from '@/services/types';
import { log } from 'console';
import { compareDesc, parseISO } from 'date-fns';

export function isMileStoneEnabled(
  milestone: Milestone['stageName'],
  challenge: Challenge,
) {
  let menuMileStone = challenge.milestones.find(
    (ml) => ml.stageName === milestone,
  );

  return compareDesc(parseISO(menuMileStone!.dueDate), new Date()) > 0;
}

export function isWorkshop(challenge: Challenge) {
  if (challenge.type === 'WORKSHOP' || challenge.metadata?.realType === 'WORKSHOP') {
    return true;
  }
  return false;
}

export function isChallenge(challenge: Challenge) {
  // if no real type, as challenge by default
  // console.log(challenge);
  if (challenge.type === 'CHALLENGE' && (!challenge.metadata?.realType || challenge.metadata?.realType === 'CHALLENGE')) {
    return true;
  }
  return false;
}
