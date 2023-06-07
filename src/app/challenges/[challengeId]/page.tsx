"use client";
import { segmentSchema } from "@/app/segment-params";
import { EditBanner } from "./edit/banner";
import { useFetchChallengeById } from "@/services/challenge.query";
import Image from "next/image";
import { formatYYYYMMMDD } from "@/utils/date";
import Link from "next/link";
import { Timeline } from "../timeline";
import { Aspect } from "@/components/aspect";
import { EditMilestones } from "./edit/milestones";
import { EditJudges } from "./edit/judges";

export default function Page({ params }: any) {
  let { challengeId } = segmentSchema.challengeId.parse(params);
  const { data: challenge } = useFetchChallengeById(challengeId);
  if (!challenge) return null;

  return (
    <div className="bg-night">
      {/* top bar */}
      <div className="container h-[72px] flex flex-row justify-between items-center">
        <Link href="/">{"<- Back"}</Link>
        <div className="text-[14px]">
          {" Now You're Editing"}{" "}
          <span className="text-day">{challenge.title}</span>
        </div>
        <button className="btn btn-primary">Publish Request</button>
      </div>
      {/* banner section */}
      <div
        className={`relative h-[600px] overflow-hidden pb-12 md:pb-30 pt-[100px] md:pt-[160px] text-center flex flex-col justify-center  bg-cover bg-center `}
        style={{
          backgroundImage: `url(${
            challenge.bannerUrl ?? "/assets/default-challenge-bg.png"
          })`,
        }}
      >
        <div className="absolute top-4 right-4">
          <EditBanner challenge={challenge} />
        </div>
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
      </div>
      {/* timeline */}
      <div className="relative py-16 border-b border-dashed border-white/30">
        <div className="absolute top-4 right-4">
          <EditMilestones challenge={challenge} />
        </div>
        <div className="container">
          <Timeline milestones={challenge.milestones} />
        </div>
      </div>
      {/* intro */}

      <div className="relative py-16 border-b border-dashed border-white/30">
        <div className="absolute top-4 right-4">
          <EditBanner challenge={challenge} />
        </div>
        <div className="container">
          <div className="flex flex-col gap-10 md:gap-20 items-center my-10">
            <div className="flex flex-col gap-4 md:flex-row md:gap-20 items-center ">
              <div className="text-[32px] md:heading-3 whitespace-nowrap py-4">
                赛事简介
              </div>
              <div className="text-[18px] md:body-2 text-white">
                {challenge.description.split("\n").map((s) => (
                  <p className="py-3" key={s}>
                    {s}
                  </p>
                ))}
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>

      {/* judges */}
      <div className="relative py-16 border-b border-dashed border-white/30">
        <div className="absolute top-4 right-4">
          <EditJudges challenge={challenge} />
        </div>
        <div className="container">
          <h3 className="heading-5 md:heading-3 font-bold mb-16 text-center">
            大赛评审团
          </h3>
          <div className="flex flex-row flex-wrap gap-6 justify-center">
            {challenge.judges
              .sort((a, b) => a.order - b.order)
              .map((judge) => {
                return (
                  <div key={judge.id} className="w-[180px] mb-2">
                    <Aspect ratio={1 / 1}>
                      <Image
                        height={150}
                        width={150}
                        src={judge.avatarURI}
                        className="object-cover w-full h-full"
                        alt={judge.name}
                      />
                    </Aspect>
                    <p className="body-3 mt-4 mb-2">{judge.name}</p>
                    <p className="body-4 text-grey-400">{judge.organization}</p>
                    <p className="body-4 text-grey-400">{judge.title}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {/* requirements  */}
      <div className="relative py-16 border-b border-dashed border-white/30">
        <div className="absolute top-4 right-4">
          <EditBanner challenge={challenge} />
        </div>
        <div className="container">
          <div className="w-full grid grid-cols-1 md:grid-cols-2  gap-8  mt-16">
            <div className="flex-1 p-8 bg-white/5 border border-grey-800">
              <h3 className="text-[24px] font-bold mb-8">参赛要求</h3>
              <ol className="list-decimal">
                {challenge.requirements.map((r) => (
                  <li
                    key={r}
                    className="list-inside text-grey-400 mb-3 indent-[-1em] pl-[1em]"
                  >
                    <span className="text-[14px] text-grey-400">{r}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex-1 p-8 bg-white/5 border border-grey-800">
              <h3 className="text-[24px] font-bold mb-8">评审维度</h3>
              <ol className="list-decimal">
                {challenge.reviewDimension.map((r) => (
                  <li
                    key={r}
                    className=" list-inside text-grey-400 mb-3 indent-[-1em] pl-[1em]"
                  >
                    <span className="text-[14px] text-grey-400">{r}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
