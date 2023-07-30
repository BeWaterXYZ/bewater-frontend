'use client';

import { useDialogStore } from '@/components/dialog/store';
import { useFetchProjectRating } from '@/services/project.query';
import { Challenge, Project } from '@/services/types';
import { useClerk } from '@clerk/nextjs';

const textMaps = [
  'Innovation Uniqueness',
  'Technical Implementation',
  'User Experience',
  'Practicality & Value Creation',
  'Presentation and Demo',
];

interface Props {
  challenge: Challenge;
  project: Project;
}
export function Rate(props: Props) {
  const showDialog = useDialogStore((s) => s.open);
  let user = useClerk().user;
  const { data: rating } = useFetchProjectRating(props.project.id);
  if (!user) return null;
  let isJudge = props.challenge.judges.some(
    (judge) =>
      judge.email?.toLowerCase() ===
      user?.emailAddresses[0].emailAddress.toLowerCase(),
  );
  if (!isJudge) {
    return null;
  }

  let rate = () => {
    showDialog('project_rating', {
      project: props.project,
      // fixme
      rating: (rating?.length ?? 0 > 0 ? rating : [0, 0, 0, 0, 0])!.map(
        (r, i) => ({
          label: textMaps[i],
          rate: r,
        }),
      ),
    });
  };
  let totalRating = rating?.reduce((p, c) => p + c, 0) ?? 0;
  return (
    <div className="border border-grey-800 p-3 mt-6 flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <p className="font-secondary text-[12px] font-bold text-grey-500">
          Score
        </p>
        {totalRating > 0 ? (
          <>
            <div className="text-day text-[24px] font-secondary">
              {totalRating}/{(rating?.length ?? 0) * 10}
            </div>
            <p className="font-secondary text-[12px] text-grey-500">
              You can change the score before the event ends.
            </p>
          </>
        ) : (
          <>
            <p className="font-secondary text-[18px]  text-grey-300">NA</p>
            <p className="font-secondary text-[12px] text-grey-500">
              No score yet, rate it before end day.
            </p>
          </>
        )}
      </div>
      <div>
        <button className="btn btn-primary" onClick={rate}>
          Rate
        </button>
      </div>
    </div>
  );
}
