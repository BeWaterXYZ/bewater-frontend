import { Aspect } from '@/components/aspect';
import { Challenge } from '@/services/types';
import { formatYYYYMMMDD } from '@/utils/date';
import Image from 'next/image';
import Link from 'next/link';

interface ChallengeListProps {
  challenges: Challenge[];
  lng: string;
}

export function ChallengeList({ challenges, lng }: ChallengeListProps) {
  for (const it of challenges) {
    if (lng === 'en' && it.yotadata) {
      if (it.yotadata.entitle) {
        it.title = it.yotadata.entitle;
      }
    } else if (lng === 'zh' && it.yotadata) {
      if (it.yotadata.zhtitle) {
        it.title = it.yotadata.zhtitle;
      }
    }
  }
  return (
    <div className="flex  gap-5 flex-col lg:flex-row my-8">
      {challenges.map((challenge) => (
        <div
          key={challenge.id}
          className="w-full border border-[#24254E] rounded overflow-hidden bg-latenight"
        >
          <Link href={`/${lng}/campaigns/${challenge.id}`}>
            <Aspect ratio={5 / 2}>
              <Image
                fill
                src={
                  challenge.bannerUrl ??
                  `/challenge/assets/${challenge.id}withTitle.png`
                }
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
