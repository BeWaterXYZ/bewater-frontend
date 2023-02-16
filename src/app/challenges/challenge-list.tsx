import { Aspect } from '@/components/aspect';
import { Challenge } from '@/services/types';
import { formatMMMDDYYYY, formatYYYYMMMDD } from '@/utils/date';
import { unsplash } from '@/utils/unsplash';
import Image from 'next/image';
import Link from 'next/link';

/**
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
                    <Image
                      fill
                      src={challenge.bannerUrl ?? unsplash()}
                      alt="crypto"
                      className="object-cover w-full h-full"
                    />
                  </Aspect>
                </div>
              </div>
            </div>

 */
interface ChallengeListProps {
  challenges: Challenge[];
}
export function ChallengeList({ challenges }: ChallengeListProps) {
  return (
    <div className="flex  gap-5 flex-col lg:flex-row my-8">
      {challenges.map((challenge) => (
        <div
          key={challenge.id}
          className="w-full border border-[#24254E] rounded overflow-hidden bg-[#0B0C24]"
        >
          <Link href={`/challenges/${challenge.id}`}>
            <Aspect ratio={5 / 2}>
              <Image
                fill
                src={challenge.bannerUrl ?? unsplash()}
                alt="crypto"
                className="object-cover w-full h-full"
              />
            </Aspect>
            <div className="p-4">
              <div className="mono-3">{challenge.title}</div>
              <div className="mono-3 text-grey-500">
                {`${formatYYYYMMMDD(challenge.startTime)} ->  ${formatYYYYMMMDD(
                  challenge.endTime,
                )}`}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
