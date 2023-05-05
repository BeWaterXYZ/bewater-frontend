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

  return (
    <div className="mt-10 my-6  gap-10 flex justify-between flex-col lg:flex-row">
      <div className="flex-1 h-36  p-8 flex flex-col lg:flex-row items-center justify-around rounded bg-gradient-to-b from-[#310D37] to-[#310d3700] border border-[#310D37]">
        <div>
          <Image
            src="/challenge/clock.svg"
            alt="Picture of the author"
            width={80}
            height={80}
            className="m-1"
          />
        </div>
        <div className="flex flex-col justify-around md:items-start">
          <p className="body-2 text-[#701A75] font-bold uppercase mt-8 lg:mt-0">
            {wordingMap['Teaming']}
          </p>
          <p className="heading-5 mt-2 md:mt-0">
            {' '}
            <Countdown deadline={curMileStone.dueDate} />
          </p>
        </div>
      </div>
      <div className="flex-1 h-36  p-8 flex flex-col lg:flex-row items-center justify-around rounded bg-gradient-to-b from-[#1C104A] to-[#1c104a00] border border-[#1C104A]">
        <div>
          <Image
            src="/challenge/team.svg"
            alt="Picture of the author"
            width={80}
            height={80}
            className="m-1"
          />
        </div>
        {curMileStone.stageName === 'Teaming' ? (
          <div className="flex flex-col justify-around">
            <div className="inline-flex items-center body-2">
              <strong className="text-[30px] text-indigo-200">
                {team_len}
              </strong>
              <p className=" uppercase ml-2 ">teams are ready to challenge</p>
            </div>
            <div className="inline-flex items-center body-2">
              <strong className="text-[30px] text-indigo-200  bg-[linear-gradient(150.64deg,_#F62584_0%,_#480CA7_100%)] [background-clip:text] [-webkit-text-fill-color:transparent]">
                {team_active_len}
              </strong>
              <p className=" uppercase ml-2 ">teams are looking for builders</p>
            </div>
          </div>
        ) : null}

        {curMileStone.stageName === 'Project Submission' ? (
          <div className="flex flex-col justify-around md:items-start ">
            <p className="body-2 text-[#3730A3] font-bold uppercase mt-8 lg:mt-0">
              TEAM FORMATION HAS ENDED
            </p>
            <div className="inline-flex items-center body-2">
              <strong className="text-[30px] text-indigo-200  bg-[linear-gradient(150.64deg,_#F62584_0%,_#480CA7_100%)] [background-clip:text] [-webkit-text-fill-color:transparent]">
                {team_len}
              </strong>
              <p className=" uppercase ml-2 ">teams in this challenge</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
