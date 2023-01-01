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
            <div className="flex  flex-wrap  py-8 ">
              <div className="w-full lg:w-1/3  flex flex-col justify-between ">
                <div className="body-2">
                  {`${formatMMMDDYYYY(challenge.startTime)} - ${formatMMMDDYYYY(
                    challenge.endTime,
                  )}`}
                </div>
                <div className="body-2 invisible">{challenge.status} </div>
              </div>
              <div className="w-full lg:w-1/3  flex flex-col justify-between ">
                <div className="body-2">{challenge.title}</div>
                <div className="body-2 invisible">xxxx xxx xxxx</div>
              </div>
              <div className="w-full lg:w-1/3 flex lg:justify-end">
                <div className="w-48 rounded overflow-hidden ">
                  <Aspect ratio={5 / 2}>
                    <img
                      src={unsplash()}
                      alt="crypto"
                      className="object-cover w-full h-full"
                    />
                  </Aspect>
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
