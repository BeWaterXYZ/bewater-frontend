import getSymbolFromCurrency from "currency-symbol-map";
import { formatMoney } from "@/utils/numeral";
import { redirect } from "next/navigation";
import { Aspect } from "@/components/aspect";
import { getChallengeById } from "@/services/challenge";
import { unsplash } from "@/utils/unsplash";
import dynamicLoad from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { segmentSchema } from "./param-schema";
import { PrizeSection as PrizeSection1 } from "./prize-section/63c82bd12ddc570f32ada868";
import { PrizeSection as PrizeSection2 } from "./prize-section/63c82bd12ddc570f32ada869";
import { PrizeSection as PrizeSection4 } from "./prize-section/63c82bd12ddc570f32ada86a";
import { PrizeSection as PrizeSection5 } from "./prize-section/63c82bd12ddc570f32ada86b";
import { PrizeSection as PrizeSection6 } from "./prize-section/63c82bd12ddc570f32ada86c";
import { PrizeSection as PrizeSection7 } from "./prize-section/63c82bd12ddc570f32ada86d";
import { PrizeSection as PrizeSection11 } from "./prize-section/63c82bd12ddc570f32ada86e";
import { PrizeSection as PrizeSection19 } from "./prize-section/63c82bd12ddc570f32ada86f";
import { Timeline } from "./timeline";
import { Timeline7 } from "./timeline-id7";
import { isMileStoneEnabled, isWorkshop, RegexDigit } from "./utils";

import Balancer from "react-wrap-balancer";
import { TwitterLogoIcon } from "@radix-ui/react-icons";
import { ScheduleSection as ScheduleSection3 } from "./schedule-section/3";
import { ScheduleSection as ScheduleSection42 } from "./schedule-section/42";
import { useTranslation } from "@/app/i18n";
//import HoverCard from '@/components/hover-card';
import { Fragment } from "react";
import Marquee from "react-fast-marquee";
import Markdown from "@/components/markdown";
import { Agenda } from "./agenda";
import { EventVenue } from "./event-venue";

const ConnectButton = dynamicLoad(() => import("./connect-button"), {
  ssr: false,
});

export default async function ChallengeIntro({ params }: any) {
  const { lng } = segmentSchema.lng.parse(params);
  const { challengeId } = segmentSchema.challengeId.parse(params);
  const challenge = await getChallengeById(challengeId);

  // console.log('RegexDigit.test(challengeId)', RegexDigit.test(challengeId))

  if (RegexDigit.test(challengeId) || challenge.externalId !== challengeId) {
    return redirect(`/${lng}/campaigns/${challenge.externalId}`);
  }

  // eslint-disable-next-line
  const { t } = await useTranslation(lng, "translation");
  let isTeamingEnabled = false;
  if (challenge.milestones?.length > 0) {
    isTeamingEnabled = isMileStoneEnabled("Teaming", challenge);
  }

  // 这里的四个字段借助json支持中英文显示
  if (challenge.yotadata?.title) {
    challenge.title =
      lng === "zh"
        ? challenge.yotadata.title.zh ?? challenge.yotadata.title.en
        : challenge.yotadata.title.en ?? challenge.yotadata.title.zh;
  }

  if (challenge.yotadata?.description) {
    challenge.description =
      lng === "zh"
        ? challenge.yotadata.description.zh ?? challenge.yotadata.description.en
        : challenge.yotadata.description.en ??
          challenge.yotadata.description.zh;
  }

  if (challenge.yotadata?.requirements) {
    challenge.requirements =
      lng === "zh"
        ? challenge.yotadata.requirements.zh ??
          challenge.yotadata.requirements.en
        : challenge.yotadata.requirements.en ??
          challenge.yotadata.requirements.zh;
  }

  if (challenge.yotadata?.reviewDimension) {
    challenge.reviewDimension =
      lng === "zh"
        ? challenge.yotadata.reviewDimension.zh ??
          challenge.yotadata.reviewDimension.en
        : challenge.yotadata.reviewDimension.en ??
          challenge.yotadata.reviewDimension.zh;
  }

  return (
    <div className="container flex flex-col gap-16 md:gap-30 ">
      <div id="milestone">
        {challenge.milestones?.length > 0 && challenge.id !== "7" ? (
          <Timeline
            milestones={challenge.milestones}
            lng={lng}
            id={challenge.id}
          />
        ) : null}
        {challenge.id === "7" ? (
          <Timeline7
            milestones={challenge.milestones}
            lng={lng}
            id={challenge.id}
          />
        ) : null}
      </div>

      <div
        id="intro"
        className={`${
          !(
            challenge.discordLink ||
            challenge.telegramLink ||
            challenge.telegramLink
          )
            ? "flex flex-col gap-10 md:gap-10 items-center my-10 mb-0"
            : "flex flex-col gap-10 md:gap-20 items-center my-10"
        }`}
      >
        <div
          className={`flex flex-col gap-4 md:flex-row md:gap-20 items-center
          ${challenge.milestones?.length === 0 && "mt-[100px]"}
          `}
        >
          <div className="heading-5 md:heading-3 whitespace-nowrap py-4">
            {t("campaign.t5")}
          </div>
          <div className="body-3 md:body-2 text-white">
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
        <div>
          {challenge.id === "7" ? (
            <>
              <p className="body-3 md:body-1 text-[#00cccc] md:text-[#00cccc]">
                扫码前往 Unity 社区渠道进行报名↓ 活动限额，报名需通过主办方审核
              </p>
              <br />
              <br />
              <Image
                src="/challenge/assets/event7-baoming.jpg"
                width={240}
                height={240}
                alt=""
                className="mx-auto mb-2 md:mb-3 w-[240px] md:w-[240px]"
              />
            </>
          ) : (
            <div className="flex flex-col items-center">
              {challenge.wechatURL ? (
                  <div className="flex flex-col items-center mb-8">
                    <p className="body-3 md:body-1 text-[#00cccc] md:text-[#00cccc]">
                      {`${t("campaign.t31", { name: challenge.hostName ?? ''})}`}
                    </p>
                    <br />
                    <br />
                    <Image
                      src={challenge.wechatURL}
                      width={240}
                      height={240}
                      alt=""
                      className="mx-auto mb-2 md:mb-3 w-[240px] md:w-[240px]"
                    />
                  </div>
                ) :
                null}
              <div className="flex flex-col md:flex-row items-center">
              {challenge.yotadata?.linkObj?.official ? (
                <Link
                  prefetch={false}
                  href={challenge.yotadata.linkObj.official.link}
                  target="_blank"
                  className="flex md:inline-flex group btn btn-primary-invert body-4 text-day uppercase w-64 py-6 mx-6 my-6 md:my-0"
                >
                  <div className="flex flex-row gap-4 items-center">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.9375 3.5625H5.0625C4.23407 3.5625 3.5625 4.23407 3.5625 5.0625V12.9375C3.5625 13.7659 4.23407 14.4375 5.0625 14.4375H12.9375C13.7659 14.4375 14.4375 13.7659 14.4375 12.9375V11.0625M14.4375 6.9375V3.5625H11.0625M14.25 3.75L8.8125 9.1875"
                        stroke="#00FFFF"
                        strokeWidth="1.28"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {challenge.yotadata.linkObj.official.text.en}
                  </div>
                </Link>
              ) : null}
              {challenge?.discordLink ? (
                <>
                  <Link
                    prefetch={false}
                    href={challenge.discordLink}
                    target="_blank"
                    className="flex md:inline-flex group btn btn-primary-invert body-4 text-day uppercase w-64 py-6 mx-6 my-6 md:my-0"
                  >
                    <div className="flex flex-row gap-4 items-center">
                      <svg
                        fill="#00ffff"
                        height="800px"
                        width="800px"
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 189.473 189.473"
                        className="w-4 h-4 fill-current text-day group-hover:text-night transition duration-[.15s] ease-out"
                      >
                        <g>
                          <path
                            d="M152.531,179.476c-1.48,0-2.95-0.438-4.211-1.293l-47.641-32.316l-25.552,18.386c-2.004,1.441-4.587,1.804-6.914,0.972
        c-2.324-0.834-4.089-2.759-4.719-5.146l-12.83-48.622L4.821,93.928c-2.886-1.104-4.8-3.865-4.821-6.955
        c-0.021-3.09,1.855-5.877,4.727-7.02l174.312-69.36c0.791-0.336,1.628-0.53,2.472-0.582c0.302-0.018,0.605-0.018,0.906-0.001
        c1.748,0.104,3.465,0.816,4.805,2.13c0.139,0.136,0.271,0.275,0.396,0.42c1.11,1.268,1.72,2.814,1.835,4.389
        c0.028,0.396,0.026,0.797-0.009,1.198c-0.024,0.286-0.065,0.571-0.123,0.854L159.898,173.38c-0.473,2.48-2.161,4.556-4.493,5.523
        C154.48,179.287,153.503,179.476,152.531,179.476z M104.862,130.579l42.437,28.785L170.193,39.24l-82.687,79.566l17.156,11.638
        C104.731,130.487,104.797,130.533,104.862,130.579z M69.535,124.178l5.682,21.53l12.242-8.809l-16.03-10.874
        C70.684,125.521,70.046,124.893,69.535,124.178z M28.136,86.782l31.478,12.035c2.255,0.862,3.957,2.758,4.573,5.092l3.992,15.129
        c0.183-1.745,0.974-3.387,2.259-4.624L149.227,38.6L28.136,86.782z"
                          />
                        </g>
                      </svg>
                      {t("campaign.t20")}
                    </div>
                  </Link>
                </>
              ) : challenge?.telegramLink ? (
                <Link
                  prefetch={false}
                  href={challenge.telegramLink}
                  target="_blank"
                  className="flex md:inline-flex group btn btn-primary-invert body-4 text-day uppercase w-64 py-6 mx-6 my-6 md:my-0"
                >
                  <div className="flex flex-row gap-4 items-center">
                    <svg
                      fill="#00ffff"
                      height="800px"
                      width="800px"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 189.473 189.473"
                      className="w-4 h-4 fill-current text-day group-hover:text-night transition duration-[.15s] ease-out"
                    >
                      <g>
                        <path
                          d="M152.531,179.476c-1.48,0-2.95-0.438-4.211-1.293l-47.641-32.316l-25.552,18.386c-2.004,1.441-4.587,1.804-6.914,0.972
          c-2.324-0.834-4.089-2.759-4.719-5.146l-12.83-48.622L4.821,93.928c-2.886-1.104-4.8-3.865-4.821-6.955
          c-0.021-3.09,1.855-5.877,4.727-7.02l174.312-69.36c0.791-0.336,1.628-0.53,2.472-0.582c0.302-0.018,0.605-0.018,0.906-0.001
          c1.748,0.104,3.465,0.816,4.805,2.13c0.139,0.136,0.271,0.275,0.396,0.42c1.11,1.268,1.72,2.814,1.835,4.389
          c0.028,0.396,0.026,0.797-0.009,1.198c-0.024,0.286-0.065,0.571-0.123,0.854L159.898,173.38c-0.473,2.48-2.161,4.556-4.493,5.523
          C154.48,179.287,153.503,179.476,152.531,179.476z M104.862,130.579l42.437,28.785L170.193,39.24l-82.687,79.566l17.156,11.638
          C104.731,130.487,104.797,130.533,104.862,130.579z M69.535,124.178l5.682,21.53l12.242-8.809l-16.03-10.874
          C70.684,125.521,70.046,124.893,69.535,124.178z M28.136,86.782l31.478,12.035c2.255,0.862,3.957,2.758,4.573,5.092l3.992,15.129
          c0.183-1.745,0.974-3.387,2.259-4.624L149.227,38.6L28.136,86.782z"
                        />
                      </g>
                    </svg>
                    {t("campaign.t6")}
                  </div>
                </Link>
              ) : null}
              {challenge?.twitterLink ? (
                <Link
                  prefetch={false}
                  href={challenge.twitterLink}
                  target="_blank"
                  className="flex md:inline-flex group btn btn-primary-invert body-4 text-day uppercase w-64 py-6 mx-6 my-6 md:my-0"
                >
                  <div className="flex flex-row gap-4 items-center">
                    <TwitterLogoIcon className="w-4 h-4 fill-current text-day group-hover:text-night transition duration-[.15s] ease-out" />
                    {t("campaign.t7")}
                  </div>
                </Link>
              ) : null}
              {challenge?.yotadata?.tgOtherLink ? (
                <Link
                  prefetch={false}
                  href={challenge.yotadata.tgOtherLink.url}
                  target="_blank"
                  className="flex md:inline-flex group btn btn-primary-invert body-4 text-day uppercase w-64 py-6 mx-6 my-6 md:my-0"
                >
                  <div className="flex flex-row gap-4 items-center">
                    {challenge.yotadata.tgOtherLink.name}
                  </div>
                </Link>
              ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
      <Agenda lng={lng} challenge={challenge} />
      <EventVenue lng={lng} challenge={challenge} />
      {!challenge.yotadata?.disableAwards && (
        <div className="" id="prizes">
          {challenge.id === "1" ? (
            <PrizeSection1 />
          ) : challenge.id === "2" ? (
            <PrizeSection2 t={t} lng={lng} />
          ) : challenge.id === "3" ? (
            <ScheduleSection3 />
          ) : challenge.id === "4" ? (
            <PrizeSection4 t={t} />
          ) : challenge.id === "5" ? (
            <PrizeSection5 t={t} lng={lng} />
          ) : challenge.id === "6" ? (
            <PrizeSection6 t={t} lng={lng} />
          ) : challenge.id === "7" ? (
            <PrizeSection7 t={t} lng={lng} />
          ) : challenge.id === "11" ? (
            <PrizeSection11 t={t} lng={lng} />
          ) : challenge.id === "19" ? (
            <PrizeSection19 t={t} lng={lng} challenge={challenge} />
          ) : challenge.id === "42" ? (
            <ScheduleSection42 />
          ) : (!challenge.yotadata?.disableTrack &&
            <div className="container">
              <div className={clsx("flex flex-col items-center px-0 pb-20 bg-[radial-gradient(210%_100%_at_50%_0%,_var(--tw-gradient-stops))] from-day/[0.15] via-night/0 to-day/[0.15] rounded-xl border-solid border-[1px] border-midnight", {
                'gap-20 !pt-20': (challenge.yotadata?.award?.title || !!challenge.totalAward)
              })}>
                {challenge.yotadata?.award?.title ? (
                  <h3 className="text-[24px] md:text-[36px] text-day md:text-day [text-shadow:0_4px_36px_rgba(0_255_255_/_0.4)] text-center">
                    {lng === "zh"
                      ? challenge.yotadata.award.title.zh ??
                        challenge.yotadata.award.title.en
                      : challenge.yotadata.award.title.en ??
                        challenge.yotadata.award.title.zh}
                  </h3>
                ) : !!challenge.totalAward ? (
                  <h3 className="text-[24px] md:text-[36px] text-day md:text-day [text-shadow:0_4px_36px_rgba(0_255_255_/_0.4)] text-center">
                    Total Awards:{" "}
                    {getSymbolFromCurrency(
                      challenge.awardCurrency ? challenge.awardCurrency : "USD"
                    ) ?? ""}
                    {formatMoney(challenge.totalAward)}{" "}
                    {challenge.awardCurrency ? challenge.awardCurrency : "USD"}
                  </h3>
                ) : null}
                {challenge.yotadata?.award?.truck?.maintitle ? (
                  <p className="body-3 md:body-1 md:heading-5 font-bold text-white/30 md:text-white/30 h-8">
                    {challenge.yotadata.award.truck.maintitle}
                  </p>
                ) : null}
                <div className="flex flex-row flex-wrap items-top gap-16 p-8">
                  {(challenge.awardAssorts ?? []).map((awardAssort, i) => {
                    return (
                      <div
                        className="flex-1 flex flex-col items-center gap-10 min-w-[200px]"
                        key={i}
                      >
                        <div className="flex flex-row gap-[min(32px,2vw)] ">
                          <div className="flex flex-col gap-4 md:gap-7 items-center">
                            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center h-20 line-clamp-3">
                              {awardAssort.name}
                            </p>
                            <div className="prizeList px-3 py-4 gap-3 md:px-5 md:py-7 md:gap-4  min-w-[200px]">
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
                                      {award.goodsName ? (
                                        <>
                                          <div className="flex flex-row justify-between">
                                            <p className="body-3 text-white/60">
                                              {award.goodsName}
                                            </p>
                                            <p className="body-3 text-white/60">
                                              x{award.goodsCount}
                                            </p>
                                          </div>
                                        </>
                                      ) : null}
                                      {award.amount > 0 ? (
                                        <div className="flex flex-row justify-between">
                                          <p className="body-3 text-white/60">
                                            {getSymbolFromCurrency(
                                              challenge.awardCurrency
                                                ? challenge.awardCurrency
                                                : "USD"
                                            ) ?? ""}
                                            {formatMoney(award.amount)}
                                            {challenge.awardCurrency && getSymbolFromCurrency(challenge.awardCurrency) ? '' : ' ' + challenge.awardCurrency }
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
                {challenge.yotadata?.award?.truck?.subtitle ? (
                  <p className="body-3 md:body-1 md:heading-5 font-bold text-white/30 md:text-white/30 h-8">
                    {challenge.yotadata.award.truck.subtitle}
                  </p>
                ) : null}
                {challenge.yotadata?.award?.truck?.data ? (
                  <div
                    className={clsx("", {
                      ["flex flex-row flex-wrap items-top gap-16 p-8"]:
                        challenge.yotadata?.award?.truck?.data,
                    })}
                  >
                    {(challenge.yotadata?.award?.truck?.data ?? []).map(
                      (it: any, i: number) => {
                        return (
                          <div
                            className="flex-1 flex flex-col items-center gap-10 min-w-[200px]"
                            key={i}
                          >
                            <div className="flex flex-row gap-[min(32px,2vw)] ">
                              <div className="flex flex-col gap-4 md:gap-7 items-center">
                                <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center h-16">
                                  {it.title}
                                </p>
                                <div className="prizeList px-3 py-4 gap-3 md:px-5 md:py-7 md:gap-4  min-w-[200px]">
                                  {it.letter.map((item: string, j: number) => {
                                    return (
                                      <Fragment key={j}>
                                        <div className="flex flex-col gap-1 w-full">
                                          <p className="body-3 text-white/60">
                                            {item}
                                          </p>
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
                      }
                    )}
                  </div>
                ) : null}
                {challenge.yotadata?.award?.additional ? (
                  <div className="relative w-full flex flex-col gap-10 items-center">
                    <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
                      {challenge.yotadata.award.additional.en.title}
                    </p>
                    <ul className="w-[80%] flex-col flex gap-2 body-3 md:body-2 text-white/60 md:text-white/60">
                      <li>
                        <Markdown>
                          {challenge.yotadata.award.additional.en.content}
                        </Markdown>
                      </li>
                    </ul>
                  </div>
                ) : null}
                {challenge.yotadata?.award?.other ? (
                  <Link
                    href={challenge.yotadata.award.other.link ?? ""}
                    target="_blank"
                  >
                    <div className="flex flex-row flex-wrap items-top gap-10 p-8 pt-0">
                      {challenge.yotadata.award.other.title ? (
                        <p className="body-3 text-white/60 text-center w-full">
                          {lng === "zh"
                            ? challenge.yotadata.award.other.title.zh ??
                              challenge.yotadata.award.other.title.en
                            : challenge.yotadata.award.other.title.en ??
                              challenge.yotadata.award.other.title.zh}
                        </p>
                      ) : null}
                      {challenge.yotadata.award.other.text ? (
                        <p className="body-4 text-white/60">
                          {lng === "zh"
                            ? challenge.yotadata.award.other.text.zh ??
                              challenge.yotadata.award.other.text.en
                            : challenge.yotadata.award.other.text.en ??
                              challenge.yotadata.award.other.text.zh}
                        </p>
                      ) : null}
                      {challenge.yotadata.award.other.img ? (
                        <Image
                          src={challenge.yotadata.award.other.img}
                          alt=""
                          width={2242}
                          height={882}
                          className="w-full"
                          style={{ borderRadius: "10px" }}
                        />
                      ) : null}
                    </div>
                  </Link>
                ) : null}
                {(challenge.keySponsors ?? []).length > 0 ? (
                  <div className="relative w-full flex flex-col gap-10 items-center">
                    <p className="body-1 md:text-[24px] font-bold text-white/30 md:text-white/30">
                      {t("campaign.t29")}
                    </p>
                    <Marquee>
                      {(challenge.keySponsors ?? []).map((sp, i) => {
                        return (
                          <div
                            className="rounded-lg border-solid border-[1px] border-white/20 w-48 h-16 md:w-60 md:h-20 flex flex-row items-center justify-center mr-3"
                            key={i}
                          >
                            {typeof sp === "string" || !sp.href ? (
                              <img
                                src={typeof sp === "string" ? sp : sp.uri}
                                className="h-8 md:h-10"
                              />
                            ) : (
                              <Link href={sp.href} target="_blank">
                                <img src={sp.uri} className="h-8 md:h-10" />
                              </Link>
                            )}
                          </div>
                        );
                      })}
                    </Marquee>
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      )}
      <>
        {!challenge.yotadata?.disableJudges && (
          <div className="mt-16">
            <h3 className="heading-5 md:heading-3 font-bold mb-16 text-center">
              {challenge.yotadata?.adjudicators
                ? lng === "zh"
                  ? challenge.yotadata.adjudicators.zh ??
                    challenge.yotadata.adjudicators.en
                  : challenge.yotadata.adjudicators.en ??
                    challenge.yotadata.adjudicators.zh
                : t("campaign.t8")}
            </h3>
            <div
              className="flex flex-row flex-wrap gap-6 justify-center"
              id="judge"
            >
              {challenge.judges?.length > 0
                ? challenge.judges.map((judge) => {
                    return (
                      <div key={judge.id!} className="w-[180px] mb-2 ">
                        <Aspect ratio={1 / 1} className="">
                          {/* <HoverCard
                                side="right"
                                card={
                                  <div className="min-w-[100px] max-w-[200px] text-white">
                                    {judge.description ?? ''}
                                  </div>
                                }>
                              <Image
                                fill
                                src={judge.avatarURI}
                                className="object-cover w-full h-full bg-white/5"
                                alt={judge.name}
                              />
                            </HoverCard> */}
                          <Image
                            fill
                            src={judge.avatarURI}
                            className="object-cover w-full h-full bg-white/5"
                            alt={judge.name}
                          />
                        </Aspect>
                        <p className="body-3 mt-4 mb-2 text-white">
                          {judge.name}
                        </p>
                        <p className="body-4 text-grey-400">
                          {judge.title ?? ""}
                        </p>
                        <p className="body-4 text-grey-400">
                          {judge.organization ?? judge.description ?? ""}
                        </p>
                        <div>
                          {judge.twitterLink ? (
                            <Link href={judge.twitterLink} target="_blank">
                              {
                                <TwitterLogoIcon className="text-blue-500 w-5 h-5" />
                              }
                            </Link>
                          ) : null}
                        </div>
                      </div>
                    );
                  })
                : challenge.yotadata?.judges?.length > 0
                ? challenge.yotadata.judges.map((it: any) => {
                    return (
                      <>
                        <p className="body-3 mt-6 w-full text-grey-400 text-center">
                          {it.name}
                        </p>
                        {it.data.map((judge: any) => {
                          return (
                            <>
                              <div className="w-[180px] mb-2">
                                <Aspect ratio={1 / 1}>
                                  <Image
                                    height={150}
                                    width={150}
                                    src={judge.avatarURI ?? unsplash("man")}
                                    className="object-cover w-full h-full"
                                    alt={judge.name}
                                  />
                                </Aspect>
                                <p className="body-3 mt-4 mb-2">{judge.name}</p>
                                <p className="body-4 text-grey-400">
                                  {judge.title ?? ""}
                                </p>
                                <p className="body-4 text-grey-400">
                                  {judge.organization ?? ""}
                                </p>
                              </div>
                            </>
                          );
                        })}
                      </>
                    );
                  })
                : null}
              {challenge.yotadata?.judges?.length > 0 ? null : (
                <div className="w-[180px]">
                  <div className="w-[180px] h-[180px] flex items-center justify-center bg-white/5 heading-5 text-gray-500/50 text-center">
                    Coming
                    <br />
                    Soon
                  </div>
                  <p className="body-3 mt-6 w-full text-grey-400">
                    {t("campaign.t9")}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        {challenge.yotadata?.speakers ? (
          <div className="mt-16">
            <h3 className="heading-5 md:heading-3 font-bold mb-16 text-center">
              {lng === "en"
                ? challenge.yotadata.speakers.title.en
                : challenge.yotadata.speakers.title.zh}
            </h3>
            <div className="flex flex-row flex-wrap gap-6 justify-center">
              {(challenge.yotadata.speakers.data ?? []).map(
                (it: any, i: number) => {
                  return (
                    <>
                      {it.avatar ? (
                        <div key={i!} className="w-[180px] mb-2 ">
                          <Aspect ratio={1 / 1} className="">
                            <Image
                              fill
                              src={it.avatar}
                              className="object-cover w-full h-full bg-white/5"
                              alt={it.name}
                            />
                          </Aspect>
                          <p className="body-3 mt-4 mb-2 text-white">
                            {it.name}
                          </p>
                          <p className="body-4 text-grey-400">
                            {it.title ?? ""}
                          </p>
                        </div>
                      ) : null}
                    </>
                  );
                }
              )}
            </div>
          </div>
        ) : null}
        {!(challenge.requirements || challenge.reviewDimension) ? null : (
          <div className="container" id="requirements">
            <div className="w-full grid grid-cols-1 md:grid-cols-2  gap-8  mt-16">
              <div className="flex-1 p-8 bg-white/5 border border-grey-800">
                <h3 className="text-[24px] font-bold mb-8 text-white">
                  {t("campaign.t28")}
                </h3>

                {challenge.requirements ? (
                  <Markdown>{challenge.requirements}</Markdown>
                ) : (
                  <p className="text-[14px] text-grey-400">
                    {t("campaign.t27")}
                  </p>
                )}
              </div>
              {!challenge.yotadata?.disableJudgeCriteria && (
                <div className="flex-1 p-8 bg-white/5 border border-grey-800">
                  <h3 className="text-white text-[24px] font-bold mb-8">
                    {challenge.yotadata?.judgingCriteria
                      ? lng === "en"
                        ? challenge.yotadata.judgingCriteria?.en ??
                          challenge.yotadata.judgingCriteria?.zh
                        : challenge.yotadata.judgingCriteria?.zh ??
                          challenge.yotadata.judgingCriteria?.en
                      : t("campaign.t11")}
                  </h3>
                  {challenge.reviewDimension ? (
                    <Markdown>{challenge.reviewDimension}</Markdown>
                  ) : (
                    <p className="text-[14px] text-grey-400">
                      {t("campaign.t27")}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </>
      {(challenge.sponsors ?? []).length > 0 ? (
        <div className="container" id="sponsors">
          <div>
            <h3 className="text-white  text-[24px] md:text-[36px] font-bold mb-16 text-center">
              {t("cryptoArt.t1")}
            </h3>
            <div className="flex flex-col gap-12 items-center">
              {(challenge.sponsors ?? []).map((s, i) => {
                return (
                  <div className="flex flex-col gap-7 items-center" key={i}>
                    <p className="body-1 md: text-[20px] font-bold text-white/30 md:text-white/30">
                      {s.defname}
                    </p>
                    <>
                      {s.members && s.members.length > 0 ? (
                        <div className="flex flex-row flex-wrap gap-0 items-center justify-center">
                          {(s.members ?? []).map((member, i) => (
                            <>
                              {typeof member === "string" || !member.href ? (
                                <img
                                  src={
                                    typeof member === "string"
                                      ? member
                                      : member.uri
                                  }
                                  key={i}
                                  className="h-8 md:h-10 mb-4 mx-4"
                                />
                              ) : (
                                <Link
                                  href={member.href}
                                  target="_blank"
                                  key={i}
                                >
                                  <img
                                    src={member.uri}
                                    className="h-8 md:h-10 mb-4 mx-4"
                                  />
                                </Link>
                              )}
                            </>
                          ))}
                        </div>
                      ) : s.descriptions && s.descriptions.length > 0 ? (
                        <div className="flex flex-row flex-wrap gap-0 items-center justify-center">
                          {(s.descriptions ?? []).map((it, i) => (
                            <div
                              key={i}
                              className="w-[80px] mb-2 justify-center mx-3"
                            >
                              <Aspect ratio={1 / 1}>
                                <Image
                                  height={80}
                                  width={80}
                                  src={`${it.uri}`}
                                  className="object-cover w-full h-full"
                                  alt=""
                                />
                              </Aspect>
                              <p className="body-3 mt-4 mb-2">{it.name}</p>
                              <p className="body-4 text-grey-400">{it.org}</p>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
      <div className="flex flex-col justify-center items-center pt-[80px] pb-[160px]">
        <p className="heading-6 md:heading-4 text-center">
          <Balancer ratio={0.9}>
            {!isWorkshop(challenge)
              ? isTeamingEnabled
                ? `${t("campaign.t12")}`
                : `${t("campaign.t13")}`
              : `${t("campaign.t24", { title: challenge.title })}`}
          </Balancer>
        </p>
        <p className="body-3 md:body-2 text-grey-400 md:text-grey-400  pt-5 pb-8 text-center">
          <Balancer>
            {!isWorkshop(challenge)
              ? `${t("campaign.t15")}`
              : `${t("campaign.t16")}`}
          </Balancer>
        </p>
        {!isWorkshop(challenge) ? (
          isTeamingEnabled ? (
            <div>
              <Link
                prefetch={false}
                href={`/${lng}/campaigns/${challengeId}/teams`}
                className="btn btn-primary-invert body-4 text-day  uppercase w-64 py-6"
              >
                {`${t("campaign.t17")}`}
              </Link>
            </div>
          ) : (
            <ConnectButton lng={lng} />
          )
        ) : challenge.joinLink ? (
          <div>
            <Link
              prefetch={false}
              target="_blank"
              href={`${challenge.joinLink}`}
              className="btn btn-primary-invert body-4 text-day  uppercase w-64 py-6"
            >
              {`${t("campaign.t4")}`}
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
