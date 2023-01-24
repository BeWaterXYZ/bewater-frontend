import { Challenge } from '@/services/types';
import { formatMMMDDYYYY } from '@/utils/date';

interface ChallengeHeroProps {
  challenge: Challenge;
}
export function ChallengeHero({ challenge }: ChallengeHeroProps) {
  return (
    <div className="lg:min-h-[400px] pb-12 pt-[100px] text-center flex flex-col justify-center bg-[url(/challenge/bg.png)] bg-contain ">
      <p className="body-1 hidden">Sample Host</p>
      <h1 className="heading-6 lg:heading-1 py-4 ">{challenge.title}</h1>
      <h1 className="body-2 lg:heading-5 font-normal">
        {' '}
        {`${formatMMMDDYYYY(challenge.startTime)} - ${formatMMMDDYYYY(
          challenge.endTime,
        )}`}
      </h1>
    </div>
  );
}
