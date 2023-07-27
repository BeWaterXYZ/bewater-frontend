import { Aspect } from '@/components/aspect';
import { Challenge } from '@/services/types';
import { formatYYYYMMMDD } from '@/utils/date';
import { formatMoney } from '@/utils/numeral';
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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {challenges.map((challenge) => (
        <div
          key={challenge.id}
          className="w-full border relative border-[#24254E] rounded overflow-hidden bg-latenight"
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
            <div className="relative p-4 flex flex-row justify-between">
              {challenge.totalAward > 0 ? (
                <div className="absolute bottom-full  text-day text-[24px] font-secondary p-2">
                  {formatMoney(challenge.totalAward)} {challenge.awardCurrency}
                </div>
              ) : null}
              <div className="flex-1 overflow-hidden">
                <div className="body-2 py-1 text-ellipsis truncate">
                  {challenge.title}
                </div>
                <div className="body-3 text-grey-500">
                  {`${formatYYYYMMMDD(
                    challenge.startTime,
                  )} ->  ${formatYYYYMMMDD(challenge.endTime)}`}
                </div>
              </div>
              <div className="">
                <div className="body-2 py-1 text-gray-400 invisible">
                  {challenge.location}
                </div>
                <div className="body-4 py-1 text-gray-600">
                  {challenge.location}
                </div>
              </div>
            </div>
          </Link>
          {challenge.status === 'ACTIVE' ? (
            <div className=" flex gap-2 absolute items-center left-4 top-4 rounded-full border border-white/20 p-2 px-3 bg-black/50 text-white text-[12px] font-secondary">
              <div className="w-2 h-2 rounded bg-day"></div>
              LIVE
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
