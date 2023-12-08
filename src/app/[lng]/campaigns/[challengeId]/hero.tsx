"use client";
import { Challenge } from "@/services/types";
import { formatYYYYMMMDD, formatMMMDDYYYY } from "@/utils/date";
import { isMileStoneEnabled, isWorkshop, isChallenge } from "./utils";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from '@/app/i18n/client';

interface ChallengeHeroProps {
  challenge: Challenge;
  lng: string;
}

export function ChallengeHero({ challenge, lng }: ChallengeHeroProps) {
  const { t } = useTranslation(lng, 'translation');

  let isTeamingEnabled = false;
  if (challenge.milestones?.length > 0) {
    isTeamingEnabled = isMileStoneEnabled("Teaming", challenge);
  }
  let topRegisterBtnText: any = t("campaign.t4");
  if (isChallenge(challenge)) {
    topRegisterBtnText = challenge.yotadata?.topRegisterBtnText
      ? challenge.yotadata.topRegisterBtnText
      : null;
  } else if (isWorkshop(challenge) && challenge.linkText) {
    topRegisterBtnText = challenge.linkText;
  }

  if (challenge.yotadata?.title) {
    challenge.title =
      lng === "zh"
        ? challenge.yotadata.title.zh ?? challenge.yotadata.title.en
        : challenge.yotadata.title.en ?? challenge.yotadata.title.zh;
  }

  return (
    <div
      id="hero"
      className={`relative overflow-hidden pb-12 md:pb-30 pt-[93px] md:pt-[160px] text-center flex flex-col justify-center  bg-cover bg-center `}
      style={{
        backgroundImage: `url("${challenge.yotadata?.mainBanner ?? challenge.bannerUrl
          }")`,
      }}
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
      <h1 className="heading-6 md:heading-2 pb-2 md:pb-3">{challenge.title}</h1>
      <h1 className="body-4 md:text-[24px] uppercase font-light">
        {challenge.location === "ONLINE" ? `${t("campaign.t30")} | ` : null}
        {(challenge.location === "OFFLINE" ||
          challenge.location === "MIXED" ||
          challenge.location === "OTHERS") &&
          challenge.city
          ? `${challenge.city} | `
          : null}
        {`${lng === "zh"
          ? formatYYYYMMMDD(challenge.startTime)
          : formatMMMDDYYYY(challenge.startTime)
          }`}
        {challenge.startTime !== challenge.endTime &&
          ` - ${lng === "zh"
            ? formatYYYYMMMDD(challenge.endTime)
            : formatMMMDDYYYY(challenge.endTime)
          }`}
      </h1>
      {isChallenge(challenge) ? (
        isTeamingEnabled ? (
          <div className="mt-6 md:mt-12">
            <Link
              href={`/${lng}/campaigns/${challenge.id}/teams`}
              className="btn btn-primary-invert body-4 text-day uppercase px-4 py-3 md:px-8 md:py-6"
            >
              {t("campaign.t1")}
            </Link>
          </div>
        ) : (
          <div className="mt-6 md:mt-12">
            {/* <div className="btn btn-primary-invert body-4 text-day/70 border-day/30 uppercase px-4 py-3 md:px-8 md:py-6 hover:border-day/30 hover:bg-transparent hover:text-day/70 hover:cursor-default bg-transparent"> */}
            <div className="body-3 md:body-1 md:font-normal text-day/70 md:text-day/70 uppercase px-4 py-3 md:px-8 md:py-6 tracking-widest">
              {`${t("campaign.t2")} ${lng === "zh"
                ? formatYYYYMMMDD(
                  challenge.milestones.find(
                    (ms) => ms.stageName === "Teaming"
                  )?.dueDate!
                )
                : formatMMMDDYYYY(
                  challenge.milestones.find(
                    (ms) => ms.stageName === "Teaming"
                  )?.dueDate!
                )
                } ${t("campaign.t3")}`}
            </div>
          </div>
        )
      ) : null}
      {isChallenge(challenge) && topRegisterBtnText ? (
        challenge.joinLink ? (
          <div className="mt-6 md:mt-12">
            <Link
              target="_blank"
              href={challenge.joinLink}
              className={`btn btn-primary rounded-none body-4 text-night uppercase ${topRegisterBtnText.length > 26
                ? "px-4 py-8 md:px-8 md:py-10"
                : "px-4 py-3 md:px-8 md:py-6"
                }`}
            >
              <p
                className="text-center max-w-[250px]"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {topRegisterBtnText}
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
              className={`btn btn-primary rounded-none body-4 text-night uppercase ${topRegisterBtnText.length > 26
                ? "px-4 py-8 md:px-8 md:py-10"
                : "px-4 py-3 md:px-8 md:py-6"
                }`}
            >
              <p
                className="text-center max-w-[250px]"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {topRegisterBtnText}
              </p>
            </Link>
          </div>
        ) : null
      ) : null}
    </div>
  );
}
