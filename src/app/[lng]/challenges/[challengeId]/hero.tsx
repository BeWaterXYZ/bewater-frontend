import { Challenge } from '@/services/types';
import { formatYYYYMMMDD } from '@/utils/date';
import { isMileStoneEnabled } from './utils';
import Link from 'next/link';
import Image from 'next/image';

interface ChallengeHeroProps {
  challenge: Challenge;
}
export function ChallengeHero({ challenge }: ChallengeHeroProps) {
  const isTeamingEnabled = isMileStoneEnabled('Teaming', challenge);

  return (
    <div
      className={`relative overflow-hidden pb-12 md:pb-30 pt-[93px] md:pt-[160px] text-center flex flex-col justify-center  bg-cover bg-center `}
      style={{ backgroundImage: `url(/challenge/assets/${challenge.id}.png)` }}
    >
      {challenge.hostName === 'BeWater' ? (
        <Image
          src="/logo/bewater-h.svg"
          width={120}
          height={24}
          alt="bewater logo"
          className="mx-auto mb-2 md:mb-3 w-[80px] md:w-30"
        />
      ) : (
        <p className="body-4 md:text-[20px]">{challenge.hostName}</p>
      )}
      <h1 className="heading-6 md:heading-2 pb-2 md:pb-3">{challenge.title}</h1>
      <h1 className="body-4 md:text-[24px] uppercase font-light">
        {challenge.location} |{' '}
        {`${formatYYYYMMMDD(challenge.startTime)} - ${formatYYYYMMMDD(
          challenge.endTime,
        )}`}
      </h1>

      {isTeamingEnabled ? (
        <div className="mt-6 md:mt-12">
          <Link
            prefetch={false}
            href={`/en/challenges/${challenge.id}/teams`}
            className="btn btn-primary-invert body-4 text-day uppercase px-4 py-3 md:px-8 md:py-6"
          >
            {'加入 / 创建队伍'}
          </Link>
        </div>
      ) : (
        <div className="mt-6 md:mt-12">
          {/* <div className="btn btn-primary-invert body-4 text-day/70 border-day/30 uppercase px-4 py-3 md:px-8 md:py-6 hover:border-day/30 hover:bg-transparent hover:text-day/70 hover:cursor-default bg-transparent"> */}
          <div className="body-3 md:body-1 md:font-normal text-day/70 md:text-day/70 uppercase px-4 py-3 md:px-8 md:py-6 tracking-widest">
            {`队伍信息及项目提交将于 ${formatYYYYMMMDD(
              challenge.milestones.find((ms) => ms.stageName === 'Teaming')
                ?.dueDate!,
            )} 开放`}
          </div>
        </div>
      )}
      <div className="absolute  block w-[100px] h-[1388px] left-[58%] md:left-[80%] -top-[352px] bg-[rgba(255,89,89,0.6)] mix-blend-screen opacity-[0.16] blur-[22.5px] rotate-[30.25deg]" />
      <div className="absolute  block w-[100px] h-[1388px] left-[10%] md:left-[56%] -top-[287px] bg-[rgba(255,89,89,0.6)] mix-blend-screen opacity-[0.16] blur-[22.5px] rotate-[40.65deg]" />
    </div>
  );
}
