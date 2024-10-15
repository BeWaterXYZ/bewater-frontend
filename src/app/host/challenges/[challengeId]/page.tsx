"use client";
import { Aspect } from "@/components/aspect";
import HoverCard from "@/components/hover-card";
// import { useLoadingStoreAction } from "@/components/loading/store";
import Markdown from "@/components/markdown";
// import { publishChallengeRequest } from "@/services/challenge";
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

export default function Page({ params, mode, frameWidth }: any) {
  let { challengeId } = segmentSchema.challengeId.parse(params);
  let { data: challenge } = useFetchChallengeById(challengeId);

  // let [publishRequested, publishRequestedSet] = useState(false);
  // let { showLoading, dismissLoading } = useLoadingStoreAction();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challenge?.id]);

  if (!challenge) return null;

  challenge = mock(challenge);

  let isTeamingEnabled = false;
  if (challenge.milestones?.length > 0) {
    isTeamingEnabled = isMileStoneEnabled("Teaming", challenge);
  }

  const isMobile = mode === "mobile" ? true : frameWidth < 768 ? true : false;

  return (
    <div className="bg-night">
      <div
        id="section-hero"
        className={clsx(
          "relative overflow-hidden text-center flex flex-col justify-center bg-cover bg-center",
          {
            "pb-30 pt-[160px]": !isMobile,
            "pb-12 pt-[92px]": isMobile,
          }
        )}
        style={{ backgroundImage: `url("${challenge.bannerUrl}")` }}
      >
        {challenge.hostIcon?.length ? (
          <Image
            src={challenge.yotadata?.mainIcon ?? challenge.hostIcon}
            width={144}
            height={40}
            alt=""
            className={clsx("mx-auto max-w-[80%] w-auto h-full max-h-[40px]", {
              "mb-3": !isMobile,
              "mb-2": isMobile,
            })}
          />
        ) : (
          <p
            className={clsx("body-4", {
              "text-[20px]": !isMobile,
              "": isMobile,
            })}
          >
            {challenge.hostName ?? ""}
          </p>
        )}
        <h1
          className={clsx("", {
            "heading-2 pb-3": !isMobile,
            "heading-6 pb-2": isMobile,
          })}
        >
          {challenge.title}
        </h1>
        <h1
          className={clsx("body-4 uppercase font-light", {
            "text-[24px]": !isMobile,
            "": isMobile,
          })}
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
            <div
              className={clsx("", {
                "mt-12": !isMobile,
                "mt-6": isMobile,
              })}
            >
              <Link
                href=""
                className={clsx(
                  "btn btn-primary-invert body-4 text-day uppercase",
                  {
                    "px-8 py-6": !isMobile,
                    "px-4 py-3": isMobile,
                  }
                )}
              >
                Join / Create Team
              </Link>
            </div>
          ) : (
            <div
              className={clsx("", {
                "mt-12": !isMobile,
                "mt-6": isMobile,
              })}
            >
              <div
                className={clsx("text-day/70 uppercase tracking-widest", {
                  "body-1 font-normal px-8 py-6": !isMobile,
                  "body-3 px-4 py-3": isMobile,
                })}
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
            <div
              className={clsx("", {
                "mt-12": !isMobile,
                "mt-6": isMobile,
              })}
            >
              <Link
                target="_blank"
                href={challenge.joinLink}
                className={clsx(
                  "btn btn-primary rounded-none body-4 text-night uppercase",
                  {
                    "px-8 py-10": "Register Now".length > 26 && !isMobile,
                    "px-4 py-8": "Register Now".length > 26 && isMobile,
                    "px-8 py-6": "Register Now".length <= 26 && !isMobile,
                    "px-4 py-3": "Register Now".length <= 26 && isMobile,
                  }
                )}
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
            <div
              className={clsx("", {
                "mt-12": !isMobile,
                "mt-6": isMobile,
              })}
            >
              <Link
                target="_blank"
                href={challenge.joinLink}
                className={clsx(
                  "btn btn-primary rounded-none body-4 text-night uppercase",
                  {
                    "px-8 py-10": "Register Now".length > 26 && !isMobile,
                    "px-4 py-8": "Register Now".length > 26 && isMobile,
                    "px-8 py-6": "Register Now".length <= 26 && !isMobile,
                    "px-4 py-3": "Register Now".length <= 26 && isMobile,
                  }
                )}
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
      <nav className="w-full body-3 flex justify-center border-b border-white/20 bg-night sticky top-0 z-10 [&_p]:py-3 [&_p]:mx-3 [&_p]:text-center [&_p]:uppercase [&_p]:cursor-pointer">
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
          <div
            className={clsx("flex flex-col items-center my-10", {
              "gap-20": !isMobile,
              "gap-10": isMobile,
            })}
          >
            <div
              className={clsx("flex flex-col my-10 items-center w-full", {
                "flex-row gap-20": !isMobile,
                "flex-col gap-4": isMobile,
              })}
            >
              <div
                className={clsx(
                  "whitespace-nowrap py-4 text-white font-primary font-bold",
                  {
                    "text-[36px]": !isMobile,
                    "text-[32px]": isMobile,
                  }
                )}
              >
                Introduction
              </div>
              <div
                className={clsx("text-white", {
                  "body-2": !isMobile,
                  "text-[18px]": isMobile,
                })}
              >
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
            <div className="flex gap-4 flex-wrap justify-center">
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
              <h3
                className={clsx(
                  "text-day [text-shadow:0_4px_36px_rgba(0_255_255_/_0.4)] text-center font-primary font-bold",
                  {
                    "text-[36px]": !isMobile,
                    "text-[24px]": isMobile,
                  }
                )}
              >
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
                    <div className="flex flex-row gap-[min(32px,2vw)]">
                      <div
                        className={clsx("flex flex-col items-center", {
                          "gap-7": !isMobile,
                          "gap-4": isMobile,
                        })}
                      >
                        <p
                          className={clsx(
                            "uppercase text-[#00cccc] text-center h-20 line-clamp-3",
                            {
                              "body-1": !isMobile,
                              "body-3": isMobile,
                            }
                          )}
                        >
                          {awardAssort.name}
                        </p>
                        <div
                          className={clsx("prizeList", {
                            "px-5 py-7 gap-4": !isMobile,
                            "px-3 py-4 gap-3": isMobile,
                          })}
                        >
                          {awardAssort.awards.map((award, i) => {
                            return (
                              <Fragment key={i}>
                                <div className="flex flex-col gap-1 w-full">
                                  {award.amount === 0 ? (
                                    <div className="flex flex-row justify-between">
                                      <p className="body-3 text-white/60">
                                        {award.awardName}
                                      </p>
                                      <p className="body-3 text-white/60">
                                        x{award.count}
                                      </p>
                                    </div>
                                  ) : (
                                    <p className="body-3 text-white">
                                      {award.awardName}
                                    </p>
                                  )}
                                  {award.amount > 0 ? (
                                    <div className="flex flex-row justify-between">
                                      <p className="body-3 text-white/60">
                                        {getSymbolFromCurrency(
                                          challenge?.awardCurrency
                                            ? challenge.awardCurrency
                                            : "USD"
                                        ) ?? ""}
                                        {formatMoney(award.amount)}
                                        {challenge?.awardCurrency &&
                                        getSymbolFromCurrency(
                                          challenge.awardCurrency
                                        )
                                          ? ""
                                          : " " + challenge?.awardCurrency ??
                                            ""}
                                      </p>
                                      <p className="body-3 text-white/60">
                                        x{award.count}
                                      </p>
                                    </div>
                                  ) : null}
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
              <p
                className={clsx("body-1 font-bold text-white/30 font-primary", {
                  "text-[24px]": !isMobile,
                  "": isMobile,
                })}
              >
                Core Sponsors
              </p>

              <Marquee>
                {(challenge.keySponsors ?? []).map((sp, i) => {
                  return (
                    <div
                      className={clsx(
                        "rounded-lg border-solid border-[1px] border-white/20 flex flex-row items-center justify-center mr-3",
                        {
                          "w-60 h-20": !isMobile,
                          "w-48 h-16": isMobile,
                        }
                      )}
                      key={i}
                    >
                      <Image
                        height={0}
                        width={0}
                        sizes="100%"
                        src={typeof sp === "string" ? sp : sp.uri}
                        className={clsx("w-fit object-contain", {
                          "h-10": !isMobile,
                          "h-8": isMobile,
                        })}
                        alt="Sponsors"
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
          <h3
            className={clsx(
              "text-white font-bold mb-16 text-center font-primary",
              {
                "text-[36px]": !isMobile,
                "text-[24px]": isMobile,
              }
            )}
          >
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
          <div
            className={clsx("w-full grid gap-8 mt-16", {
              "grid-cols-2": !isMobile,
              "grid-cols-1": isMobile,
            })}
          >
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
            <h3
              className={clsx(
                "text-white font-bold mb-16 text-center font-primary",
                {
                  "text-[36px]": !isMobile,
                  "text-[24px]": isMobile,
                }
              )}
            >
              Event Partners
            </h3>
            <div className="flex flex-col gap-12 items-center">
              {challenge.sponsors.map((s, i) => {
                return (
                  <div className="flex flex-col gap-7 items-center" key={i}>
                    <p
                      className={clsx("body-1 font-bold text-white/30", {
                        "text-[20px]": !isMobile,
                        "text-[24px]": isMobile,
                      })}
                    >
                      {s.defname}
                    </p>
                    <div className="flex flex-row flex-wrap gap-0 items-center justify-center">
                      {(s.members ?? []).map((member, i) => (
                        <Image
                          height={0}
                          width={0}
                          sizes="100%"
                          src={typeof member === "string" ? member : member.uri}
                          key={i}
                          className={clsx("mb-4 mx-4 !w-auto object-contain", {
                            "h-10": !isMobile,
                            "h-8": isMobile,
                          })}
                          alt="Sponsors"
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
        <p
          className={clsx("text-center text-white font-primary font-bold", {
            "text-[30px]": !isMobile,
            "text-[20px]": isMobile,
          })}
        >
          <Balancer ratio={0.9}>
            Interested in a campaign? Form your dream team and join us
          </Balancer>
        </p>
        <p
          className={clsx(
            "text-grey-400 pt-5 pb-8 text-center font-secondary",
            {
              "text-[16px]": !isMobile,
              "text-[14px]": isMobile,
            }
          )}
        >
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
