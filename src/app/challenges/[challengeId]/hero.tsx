import { Challenge } from '@/services/types';
import { formatYYYYMMMDD } from '@/utils/date';
import { isMileStoneEnabled } from './utils';
import Link from 'next/link';

interface ChallengeHeroProps {
  challenge: Challenge;
}
export function ChallengeHero({ challenge }: ChallengeHeroProps) {
  const isTeamingEnabled = isMileStoneEnabled('Teaming', challenge);

  return (
    <div className=" relative overflow-hidden pb-7 lg:pb-[192px] pt-[93px] lg:pt-[224px] text-center flex flex-col justify-center bg-[url(/challenge/bg.png)] bg-cover ">
      <p className="body-4 lg:text-[20px]">{challenge.hostName}</p>
      <h1 className="heading-6 lg:heading-2 pb-2">{challenge.title}</h1>
      <h1 className="body-3 lg:text-[24px] uppercase">
        {challenge.location} |{' '}
        {`${formatYYYYMMMDD(challenge.startTime)} - ${formatYYYYMMMDD(
          challenge.endTime,
        )}`}
      </h1>

      {isTeamingEnabled ? (
        <div className="mt-10">
          <Link
            href={`/challenges/${challenge.id}/teams`}
            className="btn btn-primary-invert body-4 text-day  uppercase w-64 py-6"
          >
            Join / create a team
          </Link>
        </div>
      ) : null}
      <div className="absolute  hidden lg:block lg:w-[100px] lg:h-[1388px] left-[80%] -top-[352px] bg-[rgba(255,89,89,0.6)] mix-blend-screen opacity-[0.16] blur-[22.5px] rotate-[30.25deg]" />
      <div className="absolute  hidden lg:block lg:w-[100px] lg:h-[1388px] left-[56%] -top-[287px] bg-[rgba(255,89,89,0.6)] mix-blend-screen opacity-[0.16] blur-[22.5px] rotate-[40.65deg]" />
    </div>
  );
}
