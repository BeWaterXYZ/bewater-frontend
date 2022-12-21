import { Aspect } from '@/components/aspect';
import { Challenge } from '@/services/challenge';
import { formatMMMDDYYYY } from '@/utils/date';
import Link from 'next/link';
import { unsplash } from '../../utils/unsplash';

interface ChallengeListProps {
  challenges: Challenge[];
}
export function ChallengeList({ challenges }: ChallengeListProps) {
  return (
    <ul>
      {challenges.map((challenge) => (
        <li key={challenge.id} className="my-2">
          <Link href={`/challenges/${challenge.id}/intro`}>
            <div className="grid gap-4 grid-cols-300">
              <div className="flex flex-col justify-around py-4">
                <div className="body-1">
                  {`${formatMMMDDYYYY(challenge.startTime)} - ${formatMMMDDYYYY(
                    challenge.endTime,
                  )}`}
                </div>
                <div className="body-1">{challenge.status} </div>
              </div>
              <div className="flex flex-col justify-around py-4">
                <div className="body-1">{challenge.title}</div>
                <div className="body-1">xxxx xxx xxxx</div>
              </div>
              <div>
                <Aspect ratio={5 / 2}>
                  <img
                    src={unsplash()}
                    alt="crypto"
                    className="object-cover w-full h-full"
                  />
                </Aspect>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
