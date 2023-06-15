"use client";
import { useLoadingWhen } from "@/components/loading/store";
import { useFetchChallenges } from "@/services/challenge.query";
import { unsplash } from "@/utils/unsplash";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export function Dashboard() {
  let { data: challenges, isLoading } = useFetchChallenges();
  useLoadingWhen(isLoading);
  if (!challenges) return;
  return (
    <div className="w-full grid grid-cols-[2fr,_1fr]">
      <div>
        {/* <div>filters</div> */}
        <div>
          {challenges.map((challenge) => {
            return (
              <Link
                href={`/challenges/${challenge.id}`}
                className="flex  border-b border-grey-800 p-4 justify-between"
                key={challenge.id}
              >
                <div className="flex gap-4">
                  <div className="relative rounded-full overflow-hidden w-[60px] h-[60px]">
                    <Image
                      src={challenge.bannerUrl ?? unsplash("host")}
                      fill
                      alt={challenge.title}
                    />
                  </div>
                  <div>
                    <p className="text-[16px]">{challenge.title}</p>
                    <p className="text-[14px] text-grey-500">
                      {/* fixme */}
                      {challenge.startTime.substring(0, 10)} {"->"}
                      {challenge.endTime.substring(0, 10)}
                    </p>
                  </div>
                </div>
                <div>
                  <button className={clsx('btn',{
                    'bg-[rgba(100,_116,_139,_0.1)] border-[rgba(100,_116,_139,_0.2)] text-grey-500': challenge.status ==='DRAFT'
                  })}>{challenge.status}</button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div>
        <div className="w-full flex justify-end">
          <Link href="/challenges/new" className="btn btn-primary">
            + Draft a new campaign
          </Link>
        </div>
      </div>
    </div>
  );
}
