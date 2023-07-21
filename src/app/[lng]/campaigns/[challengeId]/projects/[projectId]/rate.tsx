'use client';

import { useDialogStore } from '@/components/dialog/store';
import { Challenge, Project } from '@/services/types';
import { useClerk } from '@clerk/nextjs';

interface Props {
  challenge: Challenge;
  project: Project;
}
export function Rate(props: Props) {
  const showDialog = useDialogStore((s) => s.open);
  let user = useClerk().user;
  if (!user) return null;
  // fix me
  // if(!props.challenge.judges.some(judge=>judge.name===user?.emailAddresses[0].emailAddress)){
  //   return null
  // }
  return null;
  // let rate = () => {
  //   showDialog('project_rating', {
  //     project: props.project,
  //     rating: [
  //       {
  //         label: 'label1',
  //         rate: 0,
  //       },
  //       {
  //         label: 'label2',
  //         rate: 1,
  //       },
  //       {
  //         label: 'label3',
  //         rate: 2,
  //       },
  //       {
  //         label: 'label4',
  //         rate: 3,
  //       },
  //     ],
  //   });
  // };
  // return (
  //   <div className="border border-grey-800 p-3 mt-6 flex justify-between items-center">
  //     <div className="flex flex-col gap-2">
  //       <p className="font-secondary text-[12px] font-bold text-grey-500">
  //         Score
  //       </p>
  //       <p className="font-secondary text-[18px]  text-grey-300">NA</p>
  //       <p className="font-secondary text-[12px] text-grey-500">
  //         No score yet, rate it before end day.
  //       </p>
  //     </div>
  //     <div>
  //       <button className="btn btn-primary" onClick={rate}>
  //         Rate
  //       </button>
  //     </div>
  //   </div>
  // );
}
