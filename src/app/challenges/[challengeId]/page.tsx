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
import { EditIntro } from "./edit/intro";
import { EditRequirements } from "./edit/requirements";
import { EditSponsors } from "./edit/sponsors";
import { EditAwards } from "./edit/awards";
import Marquee from "react-fast-marquee";

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
        <Image
          src={challenge.hostIcon}
          width={120}
          height={24}
          alt="bewater logo"
          className="mx-auto mb-2 md:mb-3 w-[80px] md:w-30"
        />

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
          <EditIntro challenge={challenge} />
        </div>
        <div className="container">
          <div className="flex flex-col gap-10 md:gap-20 items-center my-10">
            <div className="flex flex-col gap-4 md:flex-row md:gap-20 items-center w-full">
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
      {/* awards */}
      <div className="relative py-16 border-b border-dashed border-white/30">
        <div className="absolute top-4 right-4">
          <EditAwards challenge={challenge} />
        </div>
        <div className="container">
          <div className="flex flex-col items-center py-20 px-0 gap-20 bg-[radial-gradient(210%_100%_at_50%_0%,_var(--tw-gradient-stops))] from-day/[0.15] via-night/0 to-day/[0.15] rounded-xl border-solid border-[1px] border-midnight">
            <h3 className="heading-5 md:heading-3 text-day md:text-day [text-shadow:0_4px_36px_rgba(0_255_255_/_0.4)] text-center">
              Total Awards: ${challenge.totalAward} {challenge.awardCurrency}
            </h3>
            <div className="flex flex-row flex-wrap items-center gap-16">
              {(challenge.awardAssorts ?? []).map((awardAssort, i) => {
                return (
                  <div className="flex flex-col items-center gap-10" key={i}>
                    <div className="flex flex-row gap-[min(32px,2vw)] ">
                      <div className="flex flex-col gap-4 md:gap-7 items-center">
                        <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
                          {awardAssort.name}
                        </p>
                        <div className="prizeList px-3 py-4 gap-3 md:px-5 md:py-7 md:gap-4">
                          {awardAssort.awards.map((award, i) => {
                            return (
                              <>
                                <div className="flex flex-col gap-1 w-full">
                                  <p className="body-3 ">{award.awardName}</p>
                                  <div className="flex flex-row justify-between">
                                    <p className="body-3 text-white/60">
                                      ${award.amount}
                                    </p>
                                    <p className="body-3 text-white/60">
                                      x{award.count}
                                    </p>
                                  </div>
                                </div>
                                <hr className="border-none bg-white/20 h-[0.5px] w-full" />
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="relative w-full flex flex-col gap-10 items-center">
              <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
                Key Sponsors
              </p>
              <Marquee>
                {(challenge.keySponsors ?? []).map((sp, i) => {
                  return (
                    <div
                      className="rounded-lg border-solid border-[1px] border-white/20 w-48 h-16 md:w-60 md:h-20 flex flex-row items-center justify-center mr-3"
                      key={i}
                    >
                      {/* // fixme/ */}
                      <img src={sp} className="h-8 md:h-10" />
                    </div>
                  );
                })}
              </Marquee>
            </div>
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
          <EditRequirements challenge={challenge} />
        </div>
        <div className="container">
          <div className="w-full grid grid-cols-1 md:grid-cols-2  gap-8  mt-16">
            <div className="flex-1 p-8 bg-white/5 border border-grey-800">
              <h3 className="text-[24px] font-bold mb-8">参赛要求</h3>
              <ol className="list-decimal">
                {challenge.requirements.split("\n").map((r, i) => (
                  <li
                    key={i}
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
                {challenge.reviewDimension.split("\n").map((r, i) => (
                  <li
                    key={i}
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

      {/* sponsors  */}
      <div className="relative py-16 border-b border-dashed border-white/30">
        <div className="absolute top-4 right-4">
          <EditSponsors challenge={challenge} />
        </div>
        <div className="container">sponsors here</div>
      </div>
    </div>
  );
}
