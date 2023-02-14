import { Challenge } from '@/services/types';
import { formatMMMDDYYYY } from '@/utils/date';

interface ChallengeHeroProps {
  challenge: Challenge;
}
export function ChallengeHero({ challenge }: ChallengeHeroProps) {
  return (
    <div className=" relative overflow-hidden pb-7 lg:pb-[192px] pt-[93px] lg:pt-[224px] text-center flex flex-col justify-center bg-[url(/challenge/bg.png)] bg-cover ">
      <p className="mono-4 lg:mono-display-2">{challenge.hostName}</p>
      <h1 className="heading-6 lg:heading-2 pb-2">{challenge.title}</h1>
      <h1 className="mono-3 lg:mono-display-1">
        {' '}
        {`${formatMMMDDYYYY(challenge.startTime)} - ${formatMMMDDYYYY(
          challenge.endTime,
        )}`}
      </h1>
      <div className="absolute  hidden lg:block lg:w-[100px] lg:h-[1388px] left-[80%] -top-[352px] bg-[rgba(255,89,89,0.6)] mix-blend-screen opacity-[0.16] blur-[22.5px] rotate-[30.25deg]" />
      <div className="absolute  hidden lg:block lg:w-[100px] lg:h-[1388px] left-[56%] -top-[287px] bg-[rgba(255,89,89,0.6)] mix-blend-screen opacity-[0.16] blur-[22.5px] rotate-[40.65deg]" />
    </div>
  );
}
