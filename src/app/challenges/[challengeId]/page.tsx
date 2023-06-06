"use client";
import { segmentSchema } from "@/app/segment-params";
import { TestEdit } from "./edit/test";
import { Uploader } from "@/components/uploader";
import { useFetchChallengeById } from "@/services/challenge.query";
import Image from "next/image";
import { formatYYYYMMMDD } from "@/utils/date";
import Link from "next/link";

export default function Page({ params }: any) {
  let { challengeId } = segmentSchema.challengeId.parse(params);
  const { data: challenge } = useFetchChallengeById(challengeId);
  console.log(challengeId, challenge);
  if (!challenge) return null;

  return (
    <div>
      <div className="container h-[72px] flex flex-row justify-between items-center">
        <Link href="/">{"<- Back"}</Link>
        <div className="text-[14px]">
          {" Now You're Editing"}{" "}
          <span className="text-day">{challenge.title}</span>
        </div>
        <button className="btn btn-primary">Publish Request</button>
      </div>
      <div
        className={`relative overflow-hidden pb-12 md:pb-30 pt-[100px] md:pt-[160px] text-center flex flex-col justify-center  bg-cover bg-center `}
        style={{
          backgroundImage: `url(${
            challenge.bannerUrl ?? "/assets/default-challenge-bg.png"
          })`,
        }}
      >
        {challenge.hostName === "BeWater" ? (
          <Image
            src="/logo/bewater-h.svg"
            width={120}
            height={24}
            alt="bewater logo"
            className="mx-auto mb-2 md:mb-3 w-[80px] md:w-30"
          />
        ) : (
          <p className="body-4 md:text-[20px]">{challenge.hostName}</p>
        )}
        <h1 className="text-[48px] md:heading-2 pb-2 md:pb-3">
          {challenge.title}
        </h1>
        <h1 className="text-[24px] md:text-[24px] uppercase font-light">
          {challenge.location} |{" "}
          {`${formatYYYYMMMDD(challenge.startTime)} - ${formatYYYYMMMDD(
            challenge.endTime
          )}`}
        </h1>
        <div className="absolute  block w-[100px] h-[1388px] left-[58%] md:left-[80%] -top-[352px] bg-[rgba(255,89,89,0.6)] mix-blend-screen opacity-[0.16] blur-[22.5px] rotate-[30.25deg]" />
        <div className="absolute  block w-[100px] h-[1388px] left-[10%] md:left-[56%] -top-[287px] bg-[rgba(255,89,89,0.6)] mix-blend-screen opacity-[0.16] blur-[22.5px] rotate-[40.65deg]" />
      </div>
    </div>

    //   return (
    //     <div className="container my-4 pt-20 flex flex-1 ">
    //       challenge

    //       <TestEdit />
    //     </div>
    //   );
  );
}
