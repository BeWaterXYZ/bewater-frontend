"use client";
import "./style.css";
import { Challenge, ChallengeTrackResult, TrackAward } from "@/services/types";
import { ResultCard } from "./result-card";
import { useFetchChallengeTeams } from "@/services/team.query";
import { useFetchChallengeById } from "@/services/challenge.query";
import { segmentSchema } from "../param-schema";
import { Loading } from "@/components/loading/loading";
import { formatMoneyWithCurreny } from "@/utils/numeral";
import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { isResultShow, isShortlistShow } from './utils'

export default function Page({ params }: any) {
  const { challengeId } = segmentSchema.challengeId.parse(params);
  const { data: challenge, isLoading } = useFetchChallengeById(challengeId);
  const { data: teams, isLoading: isLoadingTeam } =
    useFetchChallengeTeams(challengeId);
  if (isLoading || isLoadingTeam) {
    return <Loading />;
  }
  // console.log(challenge)
  // console.log(teams)
  const showResult = isResultShow(challenge);
  const showShortlist = isShortlistShow(challenge);
  // console.log(showResult, showShortlist)

  if (showResult) {
    return <Result params={params} challenge={challenge} teams={teams} />;
  } else if (showShortlist) {
    redirect("result/shortlist");
  } else {
    return <></>
  }
}

function Result({ params, challenge, teams }: any) {
  const { lng } = segmentSchema.lng.parse(params);
  const { result, awardCurrency, shortlist } = challenge;

  const countTrackAward = (awards: Array<TrackAward>) =>
    awards.reduce((amount, trackAward) => amount + (trackAward.award ??= 0), 0);
  const totalAward = result.reduce(
    (award: number, trackResult: ChallengeTrackResult) =>
      award + countTrackAward(trackResult.awards),
    0
  );
  const awardTeamsCount = result.reduce(
    (amount: number, trackResult: ChallengeTrackResult) =>
      amount + (trackResult.awards.length ??= 0),
    0
  );
  return (
    <>
      {!!shortlist && (
        <div className="container-xl mt-[40px] text-center flex flex-col items-center select-none cursor-pointer">
          <div>
            <div className="w-[320px] h-[40px] flex text-[#64748B]">
              <div className="flex-1 border-[1px] border-[#00FFFF] text-[#00FFFF] flex items-center justify-center">
                Award
              </div>
              <Link
                href="result/shortlist"
                className="block flex-1 border-[1px] border-[#64748B] border-l-0 flex items-center justify-center"
              >
                Shortlist
              </Link>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <div className="relative body-2 text-center my-10 p-6 m-auto">
          {!challenge.yotadata?.hideResultAward && (
            <>
              ✨ {awardTeamsCount} of over {teams.length} teams won a total
              prize pool of{" "}
              <span className="text-day">
                {formatMoneyWithCurreny(totalAward, awardCurrency)}
              </span>{" "}
              <div
                className="absolute w-full h-[1px] bottom-0 left-0"
                style={{
                  background: "linear-gradient(to right, #01DCBA,#7F30CB",
                }}
              ></div>
            </>
          )}
        </div>
      </div>
      {result.map((w: ChallengeTrackResult) => {
        return (
          <div className="container" key={w.track}>
            <h2 className="text-center heading-4 my-4">{w.track}</h2>
            <p className="rp-text-gradient body-2 text-center my-4 mb-8">
              {formatMoneyWithCurreny(countTrackAward(w.awards), awardCurrency)}{" "}
              Granted to {w?.awards.length} projects
            </p>
            {w.awards.map((a, index) => (
              <div
                key={index}
                className="relative my-8 w-full flex flex-col gap-8"
              >
                {a.prize === 1 ? (
                  <FirstPrize
                    key={index}
                    lng={lng}
                    award={a}
                    awardCurrency={awardCurrency}
                  />
                ) : (
                  <OtherPrize
                    key={index}
                    lng={lng}
                    award={a}
                    awardCurrency={awardCurrency}
                  />
                )}
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
}

function FirstPrize({ award, awardCurrency, lng }: any) {
  return (
    <div
      className="relative w-full  pb-16 md:pb-10 p-10  rounded-xl flex flex-col items-center"
      style={{
        background:
          " radial-gradient(23.73% 61.17% at 8.02% 11.08%, rgba(48, 83, 209, 0.3) 0%, rgba(34, 131, 187, 0) 99.99%, rgba(34, 132, 187, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(101.29% 198.2% at 50% -98.2%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 81.45%, rgba(0, 0, 0, 0.4) 100%), radial-gradient(173.35% 1719.94% at 4.11% 93%, #080336 0%, #7406CB 68.23%, #6B1162 100%)",
      }}
    >
      <div
        className="relative h-[216px]  w-full flex justify-center"
        style={{}}
      >
        <Image
          src={"/icons/medal-1.png"}
          alt="github"
          fill
          className="object-contain"
        />
      </div>
      <ResultCard
        teamId={award.teamId}
        thumbnail
        score={award.score}
        lng={lng}
      />

      {award.award && (
        <div className="absolute md:static md:pt-8 w-full flex justify-center md:w-auto bottom-4 left-4">
          <div className="p-2 px-4 text-white/30 body-3 bg-white/5 rounded-full ">
            {formatMoneyWithCurreny(award.award, awardCurrency)}
          </div>
        </div>
      )}
    </div>
  );
}

function OtherPrize({ award, awardCurrency, lng }: any) {
  return (
    <div
      className="relative w-full pb-16 md:pb-10 p-10  rounded-xl flex flex-wrap  justify-center md:justify-between"
      style={{
        background: "linear-gradient(256.33deg, #0C1E60 0.53%, #190E38 100%)",
      }}
    >
      <div
        className="relative flex-1  h-[216px] md:h-auto  flex justify-center"
        style={{}}
      >
        {(() => {
          switch (award.prize) {
            case 2:
              return (
                <Image
                  src={"/icons/medal-2.png"}
                  alt="github"
                  fill
                  className="object-contain"
                />
              );
            case 3:
              return (
                <Image
                  src={"/icons/medal-3.png"}
                  alt="github"
                  fill
                  className="object-contain"
                />
              );
            default:
              return (
                <div
                  className=" relative flex-1 h-[216px] md:h-auto flex justify-center text-white body-0 items-center "
                  style={{}}
                >
                  {" "}
                  {award.awardName}
                </div>
              );
          }
        })()}
      </div>
      <div className="flex-1">
        <ResultCard
          teamId={award.teamId}
          thumbnail
          score={award.score}
          lng={lng}
        />
      </div>
      {award.award && (
        <div className="absolute w-full flex justify-center md:w-auto bottom-4 left-4">
          <div className="p-2 px-4 text-white/30 body-3 bg-white/5 rounded-full ">
            {formatMoneyWithCurreny(award.award, awardCurrency)}
          </div>
        </div>
      )}
    </div>
  );
}
