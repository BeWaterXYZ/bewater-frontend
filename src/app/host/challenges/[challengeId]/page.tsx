"use client";
import { Aspect } from "@/components/aspect";
import HoverCard from "@/components/hover-card";
import { useLoadingStoreAction } from "@/components/loading/store";
import Markdown from "@/components/markdown";
import { publishChallengeRequest } from "@/services/challenge";
import { useFetchChallengeById } from "@/services/challenge.query";
import { Judge } from "@/services/types";
import { formatMMMDDYYYY, formatYYYYMMMDD } from "@/utils/date";
import { formatMoney } from "@/utils/numeral";
import { TwitterLogoIcon } from "@radix-ui/react-icons";
import getSymbolFromCurrency from "currency-symbol-map";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import Balancer from "react-wrap-balancer";
import { segmentSchema } from "../../segment-params";
import { Timeline } from "../timeline";
import { mock } from "./mock";
import clsx from "clsx";
import {
  isChallenge,
  isMileStoneEnabled,
  isWorkshop,
} from "@/app/[lng]/campaigns/[challengeId]/utils";

export default function Page({ params }: any) {
  let { challengeId } = segmentSchema.challengeId.parse(params);
  let { data: challenge } = useFetchChallengeById(challengeId);
  let [publishRequested, publishRequestedSet] = useState(false);
  let { showLoading, dismissLoading } = useLoadingStoreAction();

  let publish = () => {
    try {
      showLoading();
      publishChallengeRequest(challenge?.id!);
      publishRequestedSet(true);
    } catch (err) {
    } finally {
      dismissLoading();
    }
  };
  useEffect(() => {
    if (challenge) {
      let hash = location.hash;
      if (hash.startsWith("#section-")) {
        setTimeout(() => {
          let target = document.getElementById(hash.substring(1));
          // console.log({ target });
          target?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [challenge?.id]);

  if (!challenge) return null;

  let isOTHERS = challenge.type === "OTHERS";

  challenge = mock(challenge);

  let isTeamingEnabled = false;
  if (challenge.milestones?.length > 0) {
    isTeamingEnabled = isMileStoneEnabled("Teaming", challenge);
  }

  return (
    <div className="bg-night">
      <div
        id="section-hero"
        className={`relative overflow-hidden pb-12 md:pb-30 pt-[93px] md:pt-[160px] text-center flex flex-col justify-center bg-cover bg-center`}
        style={{ backgroundImage: `url("${challenge.bannerUrl}")` }}
      >
        {challenge.hostIcon?.length ? (
          <Image
            src={challenge.yotadata?.mainIcon ?? challenge.hostIcon}
            width={144}
            height={40}
            alt=""
            className="mx-auto mb-2 md:mb-3 max-w-[80%] w-auto h-full max-h-[40px]"
          />
        ) : (
          <p className="body-4 md:text-[20px]">{challenge.hostName ?? ""}</p>
        )}
        <h1 className="heading-6 md:heading-2 pb-2 md:pb-3">
          {challenge.title}
        </h1>
        <h1
          className="body-4 md:text-[24px] uppercase font-light"
          suppressHydrationWarning
        >
          {challenge.location === "ONLINE" ? `ONLINE | ` : null}
          {(challenge.location === "OFFLINE" ||
            challenge.location === "MIXED" ||
            challenge.location === "OTHERS") &&
          challenge.city
            ? `${challenge.city} | `
            : null}
          {formatMMMDDYYYY(challenge.startTime)}
          {challenge.startTime !== challenge.endTime &&
            ` - ${formatMMMDDYYYY(challenge.endTime)}`}
        </h1>
        {isChallenge(challenge) ? (
          isTeamingEnabled ? (
            <div className="mt-6 md:mt-12">
              <Link
                href=""
                className="btn btn-primary-invert body-4 text-day uppercase px-4 py-3 md:px-8 md:py-6"
              >
                Join / Create Team
              </Link>
            </div>
          ) : (
            <div className="mt-6 md:mt-12">
              <div
                className="body-3 md:body-1 md:font-normal text-day/70 md:text-day/70 uppercase px-4 py-3 md:px-8 md:py-6 tracking-widest"
                suppressHydrationWarning
              >
                {`TEAM INFORMATION AND PROJECT SUBMISSION WILL BE OPEN ON ${formatMMMDDYYYY(
                  challenge.milestones.find((ms) => ms.stageName === "Teaming")
                    ?.dueDate!
                )}`}
              </div>
            </div>
          )
        ) : null}
        {isChallenge(challenge) && "Register Now" ? (
          challenge.joinLink ? (
            <div className="mt-6 md:mt-12">
              <Link
                target="_blank"
                href={challenge.joinLink}
                className={`btn btn-primary rounded-none body-4 text-night uppercase ${
                  "Register Now".length > 26
                    ? "px-4 py-8 md:px-8 md:py-10"
                    : "px-4 py-3 md:px-8 md:py-6"
                }`}
              >
                <p
                  className="text-center max-w-[250px]"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {"Register Now"}
                </p>
              </Link>
            </div>
          ) : null
        ) : null}
        {isWorkshop(challenge) ? (
          challenge.joinLink ? (
            <div className="mt-6 md:mt-12">
              <Link
                target="_blank"
                href={challenge.joinLink}
                className={`btn btn-primary rounded-none body-4 text-night uppercase ${
                  "Register Now".length > 26
                    ? "px-4 py-8 md:px-8 md:py-10"
                    : "px-4 py-3 md:px-8 md:py-6"
                }`}
              >
                <p
                  className="text-center max-w-[250px]"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {"Register Now"}
                </p>
              </Link>
            </div>
          ) : null
        ) : null}
      </div>
      <nav className="w-full body-3 flex justify-center border-b border-white/20 bg-night sticky top-0 md:top-0 z-10 [&_p]:py-3 [&_p]:mx-3 [&_p]:text-center [&_p]:uppercase [&_p]:cursor-pointer">
        <p className="text-day border-b-2 border-day [text-shadow:0_0_6px_theme(colors.day)]">
          INTRODUCTION
        </p>
        <p>TEAMS</p>
        <p>PROJECTS</p>
        <p>RESULT</p>
      </nav>
      <div
        id="section-milestone"
        className="relative py-[100px] border-b border-dashed border-white/30"
      >
        <div className="container">
          <Timeline milestones={challenge.milestones} />
        </div>
      </div>
      <div
        id="section-intro"
        className="relative py-[100px] border-b border-dashed border-white/30"
      >
        <div className="container">
          <div className="flex flex-col gap-10 md:gap-20 items-center my-10">
            <div className="flex flex-col gap-4 md:flex-row md:gap-20 items-center w-full">
              <div className="text-[32px] md:text-[36px] whitespace-nowrap py-4 text-white font-primary font-bold">
                Introduction
              </div>
              <div className="text-[18px] md:body-2 text-white">
                {challenge.description?.endsWith("--edit-by-markdown") ? (
                  <Markdown style={{ color: "white" }}>
                    {challenge.description.substring(
                      0,
                      challenge.description.length - "--edit-by-markdown".length
                    )}
                  </Markdown>
                ) : (
                  (challenge.description ?? "").split("\n").map((s, i) => (
                    <p className="py-3" key={i}>
                      {s}
                    </p>
                  ))
                )}
              </div>
            </div>
            <div className="flex gap-4 flex-wrap">
              {challenge.telegramLink ? (
                <Link
                  className="btn btn-primary-invert min-w-[256px] py-6 flex gap-2 text-xs"
                  href={challenge.telegramLink}
                >
                  <Image
                    src="/icons/blue/telegram.svg"
                    height={16}
                    width={16}
                    alt="telegram"
                  />
                  JOIN OUR TG GROUP
                </Link>
              ) : null}
              {challenge.discordLink ? (
                <Link
                  className="btn btn-primary-invert min-w-[256px] py-6 flex gap-2 text-xs"
                  href={challenge.discordLink}
                >
                  <Image
                    src="/icons/blue/discord.svg"
                    height={16}
                    width={16}
                    alt="discord"
                  />
                  Discord Link
                </Link>
              ) : null}
              {challenge.twitterLink ? (
                <Link
                  className="btn btn-primary-invert min-w-[256px] py-6 flex gap-2 text-xs"
                  href={challenge.twitterLink}
                >
                  <TwitterLogoIcon height={16} width={16} />
                  FOLLOW OFFICIAL TWITTER
                </Link>
              ) : null}
              {challenge.wechatURL ? (
                <HoverCard
                  card={
                    <div>
                      <Image
                        src={challenge.wechatURL}
                        height={256}
                        width={256}
                        alt="wechat"
                      />
                    </div>
                  }
                >
                  <button className="btn btn-primary-invert min-w-[256px] py-6 flex gap-2 text-xs">
                    <Image
                      src="/icons/blue/wechat.svg"
                      height={16}
                      width={16}
                      alt="wechat"
                    />{" "}
                    WeChat QR code
                  </button>
                </HoverCard>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div
        id="section-prizes"
        className="relative py-16 border-b border-dashed border-white/30"
      >
        <div className="container">
          <div
            className={clsx(
              "flex flex-col items-center px-0 pb-20 bg-[radial-gradient(210%_100%_at_50%_0%,_var(--tw-gradient-stops))] from-day/[0.15] via-night/0 to-day/[0.15] rounded-xl border-solid border-[1px] border-midnight",
              {
                "!pt-20 gap-20":
                  challenge.totalAward || challenge.awardAssorts?.length,
              }
            )}
          >
            {challenge.totalAward ? (
              <h3 className="text-[24px] md:text-[36px] text-day md:text-day [text-shadow:0_4px_36px_rgba(0_255_255_/_0.4)] text-center font-primary font-bold">
                Total Awards:{" "}
                {getSymbolFromCurrency(
                  challenge?.awardCurrency ? challenge.awardCurrency : "USD"
                ) ?? ""}
                {formatMoney(challenge.totalAward ?? 0)}{" "}
                {challenge?.awardCurrency ? challenge.awardCurrency : "USD"}
              </h3>
            ) : null}
            <div className="flex flex-row flex-wrap items-top gap-16 p-8">
              {(challenge.awardAssorts ?? []).map((awardAssort, i) => {
                return (
                  <div
                    className="flex-1 flex flex-col items-center gap-10"
                    key={i}
                  >
                    <div className="flex flex-row gap-[min(32px,2vw)] ">
                      <div className="flex flex-col gap-4 md:gap-7 items-center">
                        <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center h-20 line-clamp-3">
                          {awardAssort.name}
                        </p>
                        <div className="prizeList px-3 py-4 gap-3 md:px-5 md:py-7 md:gap-4">
                          {awardAssort.awards.map((award, i) => {
                            return (
                              <Fragment key={i}>
                                <div className="flex flex-col gap-1 w-full">
                                  <p className="body-3 text-white whitespace-nowrap">
                                    {award.awardName}
                                  </p>
                                  <div className="flex flex-row justify-between">
                                    <p className="body-3 text-white/60">
                                      {getSymbolFromCurrency(
                                        challenge?.awardCurrency
                                          ? challenge.awardCurrency
                                          : "USD"
                                      ) ?? ""}
                                      {formatMoney(award.amount)}
                                    </p>
                                    <p className="body-3 text-white/60">
                                      x{award.count}
                                    </p>
                                  </div>
                                </div>
                                <hr className="border-none bg-white/20 h-[0.5px] w-full" />
                              </Fragment>
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
              <p className="body-1 md:text-[24px] font-bold text-white/30 md:text-white/30 font-primary">
                Core Sponsors
              </p>
              <Marquee>
                {(challenge.keySponsors ?? []).map((sp, i) => {
                  return (
                    <div
                      className="rounded-lg border-solid border-[1px] border-white/20 w-48 h-16 md:w-60 md:h-20 flex flex-row items-center justify-center mr-3"
                      key={i}
                    >
                      {/* // fixme/ */}
                      <img
                        src={typeof sp === "string" ? sp : sp.uri}
                        className="h-8 md:h-10"
                      />
                    </div>
                  );
                })}
              </Marquee>
            </div>
          </div>
        </div>
      </div>
      <div
        id="section-judge"
        className="relative py-16 border-b border-dashed border-white/30"
      >
        <div className="container">
          <h3 className="text-white text-[24px] md:text-[36px] font-bold mb-16 text-center font-primary">
            Adjudicators
          </h3>
          <div className="flex flex-row flex-wrap gap-6 justify-center">
            {(challenge.judges && challenge.judges.length > 0
              ? challenge.judges
              : [
                  {
                    id: "random",
                    name: "Judge Name",
                    title: "Judge Title",
                    avatarURI: "/assets/judge-avatar.png",
                    description: "this is description",
                  } as Judge,
                ]
            )
              // .sort((a, b) => a.order - b.order)
              .map((judge, index) => {
                return (
                  <div key={judge.id!} className="w-[180px] mb-2 ">
                    <Aspect ratio={1 / 1} className="">
                      <HoverCard
                        side="right"
                        card={
                          <div className="min-w-[100px] max-w-[200px]">
                            {judge.description}
                          </div>
                        }
                      >
                        <Image
                          fill
                          src={judge.avatarURI}
                          className="object-cover w-full h-full bg-white/5"
                          alt={judge.name}
                        />
                      </HoverCard>
                    </Aspect>
                    <p className="body-3 mt-4 mb-2 text-white">{judge.name}</p>
                    <p className="body-4 text-grey-400">{judge.title}</p>
                    <div>
                      {judge.twitterLink ? (
                        <Link href={judge.twitterLink}>
                          {
                            <TwitterLogoIcon className="text-blue-500 w-5 h-5" />
                          }
                        </Link>
                      ) : null}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div
        id="section-requirements"
        className="relative py-16 border-b border-dashed border-white/30"
      >
        <div className="container">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <div className="flex-1 p-8 bg-white/5 border border-grey-800">
              <h3 className="text-[24px] font-bold mb-8 text-white font-secondary">
                Event Details
              </h3>
              <Markdown>{challenge.requirements}</Markdown>
            </div>
            <div className="flex-1 p-8 bg-white/5 border border-grey-800">
              <h3 className="text-white text-[24px] font-bold mb-8 font-secondary">
                Judging Criteria
              </h3>
              <Markdown>{challenge.reviewDimension}</Markdown>
            </div>
          </div>
        </div>
      </div>
      <div
        id="section-sponsors"
        className="relative py-16 border-b border-dashed border-white/30"
      >
        <div className="container">
          <div>
            <h3 className="text-white text-[24px] md:text-[36px] font-bold mb-16 text-center font-primary">
              Event Partners
            </h3>
            <div className="flex flex-col gap-12 items-center">
              {challenge.sponsors.map((s, i) => {
                return (
                  <div className="flex flex-col gap-7 items-center" key={i}>
                    <p className="body-1 md: text-[20px] font-bold text-white/30 md:text-white/30">
                      {s.defname}
                    </p>
                    <div className="flex flex-row flex-wrap gap-0 items-center justify-center">
                      {(s.members ?? []).map((member, i) => (
                        <img
                          src={typeof member === "string" ? member : member.uri}
                          key={i}
                          className="h-8 md:h-10 mb-4 mx-4"
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center pt-[80px] pb-[160px]">
        <p className="text-[20px] md:text-[30px] text-center text-white font-primary font-bold">
          <Balancer ratio={0.9}>
            Interested in a campaign? Form your dream team and join us
          </Balancer>
        </p>
        <p className="text-[14px] md:text-[16px] text-grey-400 md:text-grey-400 pt-5 pb-8 text-center font-secondary">
          <Balancer>
            Nearly 25,000 pre-registered developers and designers have already
            claimed their BeWater Early Bird badges
          </Balancer>
        </p>
        <div>
          <div className="btn btn-primary-invert text-xs text-day uppercase w-64 py-6">
            Go to Team Page
          </div>
        </div>
      </div>
    </div>
  );
}
