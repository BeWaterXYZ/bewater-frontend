import { Challenge } from '@/services/types';
import { formatMMMDDYYYY } from '@/utils/date';

interface ChallengeHeroProps {
  challenge: Challenge;
}
export function ChallengeHero({ challenge }: ChallengeHeroProps) {
  return (
    <div className="pb-7 lg:pb-[192px] pt-[93px] lg:pt-[224px] text-center flex flex-col justify-center bg-[url(/challenge/bg.png)] bg-contain ">
      <p className="desc-6 lg:desc-2">{challenge.hostName}</p>
      <h1 className="heading-6 lg:heading-2 lg:pb-2">{challenge.title}</h1>
      <h1 className="desc-4 lg:desc-1 font-light">
        {' '}
        {`${formatMMMDDYYYY(challenge.startTime)} - ${formatMMMDDYYYY(
          challenge.endTime,
        )}`}
      </h1>
    </div>
  );
}
