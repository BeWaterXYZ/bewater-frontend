import { Challenge, Milestone } from '@/services/types';
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
