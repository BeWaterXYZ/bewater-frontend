'use client';
import { Team, Challenge } from '@/services/types';
import Image from 'next/image';
import { Countdown } from './countdown';

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

  return (
    <div className="my-10  gap-10 flex justify-between flex-col lg:flex-row">
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
        <div className="flex flex-col justify-around">
          <p className="body-1 text-[#701A75] font-bold">
            TEAM FORMATION WILL END IN
          </p>
          <p className="heading-5">
            {' '}
            <Countdown deadline={challenge.teamUpDeadline} />
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
          />
        </div>
        <div className="flex flex-col justify-around">
          <p className="body-2 ">
            <strong className="heading-4">{team_len}</strong> teams are ready to
            challenge
          </p>
          <p className="body-2 ">
            <strong className="heading-4   text-[#F62584] ">
              {team_active_len}
            </strong>{' '}
            teams are looking for builders
          </p>
        </div>
      </div>
    </div>
  );
}
