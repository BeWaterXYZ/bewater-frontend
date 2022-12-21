import { Challenge } from '@/services/challenge';
import { formatMMMDDYYYY } from '@/utils/date';

interface ChallengeHeroProps {
  challenge: Challenge;
}
export function ChallengeHero({ challenge }: ChallengeHeroProps) {
  return (
    <div className="h-[300px] text-center flex flex-col justify-center">
      <p className="body-1">Sample Host</p>
      <h1 className="heading-1 py-4">{challenge.title}</h1>
      <h1 className="body-1">
        {' '}
        {`${formatMMMDDYYYY(challenge.startTime)} - ${formatMMMDDYYYY(
          challenge.endTime,
        )}`}
      </h1>
    </div>
  );
}
