import { Aspect } from '@/components/aspect';
import { Challenge } from '@/services/types';
import { formatMMMDDYYYY, formatYYYYMMMDD } from '@/utils/date';
import { unsplash } from '@/utils/unsplash';
import Image from 'next/image';
import Link from 'next/link';

interface ChallengeListProps {
  challenges: Challenge[];
  lng: string;
}
export function ChallengeList({ challenges, lng }: ChallengeListProps) {
  return (
    <div className="flex  gap-5 flex-col lg:flex-row my-8">
      {challenges.map((challenge) => (
        <div
          key={challenge.id}
          className="w-full border border-[#24254E] rounded overflow-hidden bg-latenight"
        >
          <Link prefetch={false} href={`/${lng}/challenges/${challenge.id}`}>
            <Aspect ratio={5 / 2}>
              <Image
                width={640}
                height={256}
                src={challenge.bannerUrl ?? unsplash()}
                alt="crypto"
                className="object-cover w-full h-full"
              />
            </Aspect>
            <div className="p-4">
              <div className="body-3 py-1">{challenge.title}</div>
              <div className="body-3 text-grey-500">
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
