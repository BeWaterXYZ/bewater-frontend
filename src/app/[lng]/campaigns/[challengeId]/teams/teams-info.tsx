'use client';
import { Challenge, Milestone, Team } from '@/services/types';
import { compareDesc, parseISO } from 'date-fns';
import Image from 'next/image';
import { Countdown } from './countdown';

function getCurMileStone(milestones: Milestone[]) {
  return milestones.filter(
    (ms) => compareDesc(parseISO(ms.dueDate), new Date()) < 0,
  )[0];
}

const wordingMap: Record<Milestone['stageName'], string> = {
  Teaming: 'TEAM FORMATION WILL END IN',
  'Project Submission': 'SUBMISSION WILL END IN',
  Preparation: '',
  Result: '',
  Review: '',
  NOP: '',
};

interface ChallengeTeamsInfoProps {
  teams: Team[];
  challenge: Challenge;
}
export function ChallengeTeamsInfo({
  teams,
  challenge,
}: ChallengeTeamsInfoProps) {
  const team_len = teams.length;
  const team_active_len = teams.filter((t) => t.status === 'ACTIVE').length;
  const curMileStone = getCurMileStone(challenge.milestones);

  if (!curMileStone) return null;

  let submissionEndTime: string | null = null;
  for (const it of challenge.milestones) {
    if ('Project Submission' === it.stageName) {
      submissionEndTime = it.dueDate;
      break;
    }
  }

  let isCountDown = false;
  if (submissionEndTime) {
    isCountDown = (compareDesc(parseISO(submissionEndTime), new Date()) < 0)
  }

  return (
    <div className="mt-10 my-6 gap-5 flex justify-between flex-col lg:flex-row">
      <div className="flex-1 h-36  p-8 flex flex-col lg:flex-row items-center justify-around rounded bg-gradient-to-b from-[#310D37] to-[#310d3700] border border-[#310D37]">
        <div>
          <Image
            src="/challenge/assets/clock.svg"
            alt="Picture of the author"
            width={80}
            height={80}
            className="m-1"
          />
        </div>
        { isCountDown ? (
        <div className="flex flex-col justify-around items-center lg:items-start">
          <p className="body-2 text-[#701A75] font-bold uppercase mt-8 lg:mt-0">
            {wordingMap['Teaming']}
          </p>
          <p className="mt-2">
            {' '}
            <Countdown deadline={curMileStone.dueDate} />
          </p>
        </div>) : null }
      </div>
      <div className="flex-1 h-36  p-8 flex flex-col lg:flex-row items-center justify-around rounded bg-gradient-to-b from-[#1C104A] to-[#1c104a00] border border-[#1C104A]">
        <div>
          <Image
            src="/challenge/assets/team.svg"
            alt="Picture of the author"
            width={80}
            height={80}
            className="m-1"
          />
        </div>
        {curMileStone.stageName === 'Teaming' ? (
          <div className="flex flex-col justify-around items-center lg:items-start">
            <p className="body-2 text-[#3730A3] font-bold uppercase mt-8 lg:mt-0">
              TEAM FORMATION HAS STARTED
            </p>
            <div className="inline-flex items-center mt-2">
              <strong className="heading-5 text-indigo-200  bg-[linear-gradient(150.64deg,_#F62584_0%,_#480CA7_100%)] [background-clip:text] [-webkit-text-fill-color:transparent]">
                {team_len}
              </strong>
              <p className=" uppercase ml-3 text-indigo-200 body-1">
                teams in the challenge
              </p>
            </div>
          </div>
        ) : // <div className="flex flex-col justify-around">
        //   <div className="inline-flex items-center">
        //     <strong className="heading-5 text-indigo-200">{team_len}</strong>
        //     <p className=" uppercase ml-3 text-indigo-200 body-1">
        //       teams are ready to challenge
        //     </p>
        //   </div>
        //   <div className="inline-flex items-center mt-2">
        //     <strong className="heading-5 text-indigo-200  bg-[linear-gradient(150.64deg,_#F62584_0%,_#480CA7_100%)] [background-clip:text] [-webkit-text-fill-color:transparent]">
        //       {team_active_len}
        //     </strong>
        //     <p className=" uppercase ml-3 text-indigo-200 body-1">
        //       teams are looking for builders
        //     </p>
        //   </div>
        // </div>
        null}

        {curMileStone.stageName === 'Project Submission' ? (
          <div className="flex flex-col justify-around items-center lg:items-start">
            <p className="body-2 text-[#3730A3] font-bold uppercase mt-8 lg:mt-0">
              TEAM FORMATION HAS STARTED
            </p>
            <div className="inline-flex items-center mt-2">
              <strong className="heading-5 text-indigo-200  bg-[linear-gradient(150.64deg,_#F62584_0%,_#480CA7_100%)] [background-clip:text] [-webkit-text-fill-color:transparent]">
                {team_len}
              </strong>
              <p className=" uppercase ml-3 text-indigo-200 body-1">
                teams in the challenge
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
