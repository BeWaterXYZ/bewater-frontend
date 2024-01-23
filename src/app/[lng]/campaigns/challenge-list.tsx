"use client";
import { Aspect } from "@/components/aspect";
import { Challenge } from "@/services/types";
import { formatYYYYMMMDD } from "@/utils/date";
import { formatMoney } from "@/utils/numeral";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFetchChallengeList } from '@/services/challenge.query';
import { Loading } from '@/components/loading/loading';

interface ChallengeListProps {
  lng: string;
}

const filterMap = [
  ["All", ""],
  ["Challenge", "CHALLENGE"],
  ["Workshop", "WORKSHOP"],
];

export function ChallengeList({ lng }: ChallengeListProps) {
  let [filter, filterSet] = useState('');
  let { data: challenges, isLoading } = useFetchChallengeList();

  if (isLoading) {
    return <Loading />;
  }

  challenges = challenges ?? [];
  challenges.sort((a, b) => Number(b.id) - Number(a.id));

  const { active, completed, paused } = {
    active: challenges.filter((c) => c.status === 'ACTIVE'),
    completed: challenges.filter((c) => c.status === 'COMPLETED'),
    paused: challenges.filter((c) => c.status === 'PAUSED'),
  };

  challenges = [...active, ...paused, ...completed]

  for (const it of challenges) {
    if (it?.yotadata?.title) {
      it.title = lng === 'zh' ? (it.yotadata.title.zh ?? it.yotadata.title.en) : (it.yotadata.title.en ?? it.yotadata.title.zh);
    }
  }

  let filteredChallenges = challenges.filter((c) =>
    filter !== "" ? c.type === filter : true
  );

  return (
    <>
      <div className="flex gap-4 text-white font-secondary my-6">
        {filterMap.map((t) => (
          <button
            key={t[0]}
            onClick={() => filterSet(t[1])}
            className={clsx({
              "text-day": filter === t[1],
            })}
          >
            {t[0]}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge) => (
          <div
            key={challenge.id}
            className="w-full border relative border-[#24254E] rounded overflow-hidden bg-latenight"
          >
            <Link
              className="relative"
              target={challenge.type !== "OTHERS" ? undefined : "_blank"}
              href={
                challenge.type !== "OTHERS"
                  ? (challenge.externalId ? `/${lng}/campaigns/${challenge.externalId}` : `/${lng}/campaigns/${challenge.id}`)
                  : challenge.joinLink ?? ""
              }
            >
              <Aspect ratio={5 / 2}>
                <Image
                  fill
                  src={
                    challenge.bannerUrl ??
                    `/challenge/assets/${challenge.id}withTitle.png`
                  }
                  alt=""
                  className="object-cover w-full h-full"
                />
              </Aspect>
              <div className="relative p-4 flex flex-row justify-between">
                {challenge.totalAward > 0 ? (
                  <div className="absolute bottom-full  text-day text-[24px] font-secondary p-2">
                    {formatMoney(challenge.totalAward)}{" "}
                    {challenge.awardCurrency ? challenge.awardCurrency : 'USD'}
                  </div>
                ) : null}
                <div className="flex-1 overflow-hidden">
                  <div className="body-2 py-1 text-ellipsis truncate">
                    {challenge.title}
                  </div>
                  <div className="body-3 text-grey-500">
                    {`${formatYYYYMMMDD(
                      challenge.startTime
                    )} ->  ${formatYYYYMMMDD(challenge.endTime)}`}
                  </div>
                </div>
                <div className="" style={{ maxWidth: "40%" }}>
                  <div className="body-2 py-1 text-gray-400 invisible">
                    {challenge.location}
                  </div>
                  <div className="body-4 py-1 text-gray-600">
                    {challenge.location === "ONLINE"
                      ? "ONLINE"
                      : challenge.city
                        ? challenge.city
                        : ""}
                  </div>
                </div>
              </div>
              {challenge.type === "OTHERS" ? (
                <div className=" flex  absolute items-center justify-center right-4 top-4 rounded-full border border-white/20 h-8 w-8 bg-black/50 text-white text-[12px] font-secondary">
                  <ArrowTopRightIcon />
                </div>
              ) : null}
              {challenge.hostIcon && challenge.type !== 'OTHERS' ? (
                <div className="flex absolute w-full top-12 h-12 z-10">
                  <Image
                    src={challenge.hostIcon}
                    width={144}
                    height={40}
                    alt=""
                    className="mx-auto h-10"
                    style={{ width: "auto" }}
                  />
                </div>
              ) : null}
            </Link>
            {challenge.status === "ACTIVE" ? (
              <div className="flex gap-2 absolute items-center left-4 top-4 rounded-full border border-white/20 p-2 px-3 bg-black/50 text-white text-[12px] font-secondary z-10">
                <div className="w-2 h-2 rounded bg-day"></div>
                LIVE
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </>
  );
}
