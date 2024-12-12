import Marquee from "react-fast-marquee";
import { Fragment } from "react";
import { formatMoney } from "@/utils/numeral";
import getSymbolFromCurrency from "currency-symbol-map";
import Link from "next/link";
import Image from "next/image";

export function PrizeSection({
  t,
  lng,
  challenge,
}: {
  t: Function;
  lng: string;
  challenge: any;
}) {
  return (
    <div className="flex flex-col items-center py-20 px-0 gap-20 bg-[radial-gradient(210%_100%_at_50%_0%,_var(--tw-gradient-stops))] from-day/[0.15] via-night/0 to-day/[0.15] rounded-xl border-solid border-[1px] border-midnight">
      {/* <h3 className="heading-5 md:heading-3 text-day md:text-day [text-shadow:0_4px_36px_rgba(0_255_255_/_0.4)] text-center">
        Total Awards:{" "}
        {getSymbolFromCurrency(
          challenge.awardCurrency ? challenge.awardCurrency : "USD"
        ) ?? ""}
        {formatMoney(challenge.totalAward)}{" "}
      </h3> */}
      <div className="flex flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-10">
          <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
            {challenge.awardAssorts.length} {t("cryptoArt.t6")}
          </p>
          <div className="flex flex-col xl:flex-row gap-10 xl:px-10">
            <div className="flex flex-col gap-4 md:gap-7 items-center">
              <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center">
                Track 1: Data as Perception – Empowering AI with Decentralized
                Data
              </p>
              <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5 xl:h-full">
                <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full body-3 text-white/60">
                  In this track, we explore how data acts as the
                  &quot;perception&quot; of Crypto AI Agents. We invite teams to
                  develop AI infrastructure for data collection, labeling,
                  privacy, and validation using BNB Chain Greenfield. The focus
                  is on creating innovative data solutions and standards,
                  transforming decentralized data into user value through
                  applications like decentralized insurance, prediction markets,
                  and dynamic NFTs.
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-7 items-center">
              <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center">
                Track 2: Real-Time dApp Development – BUILDING WITH AI INFRA
                AGENTS
              </p>
              <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5 xl:h-full">
                <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full body-3 text-white/60">
                  This track encourages teams to integrate APRO Oracle&apos;s
                  real-time data feeds into their dApps. The goal is to build
                  decentralized applications on BNB Chain that leverage live
                  market and transaction data, offering solutions such as AI
                  trading assistants, decentralized risk management, and dynamic
                  NFT generation. Participants will develop functional dApps
                  that can directly create value for users within 24 hours.
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-7 items-center">
              <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center">
                Track 3: Autonomous AI Agents – Building the Future of AI
                Collaboration
              </p>
              <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5 xl:h-full">
                <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full body-3 text-white/60">
                  In this track, participants will focus on developing
                  autonomous AI Agents using APRO Oracle&apos;s unique
                  communication services tailored for Crypto AI Agents. The
                  emphasis is on creating AI-driven, interactive agents capable
                  of collaboration and autonomous decision-making. Key use cases
                  include building investment-assisting tools, decentralized
                  governance systems, and AI-driven creative solutions, all
                  seamlessly integrating with Binance Web3 Wallet, Trust Wallet,
                  or PancakeSwap to enhance the agents&apos; capabilities.
                </div>
              </div>
            </div>
          </div>
          <div className="w-auto max-w-[620px] mx-5 px-5 py-5 flex z-[1] flex-col sm:flex-row items-center gap-5 body-3 text-white/60">
            Each track is designed to push the boundaries of Crypto AI,
            unlocking new possibilities in data, applications, and autonomous
            agent behavior.
          </div>
        </div>
      </div>
      {/* <div className="relative w-full flex flex-col gap-10 items-center">
        <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
          Prizes
        </p>
        <div className="flex flex-row flex-wrap items-top gap-16 p-8">
          {(challenge.awardAssorts ?? []).map((awardAssort: any, i: any) => {
            return (
              <div
                className="flex-1 flex flex-col items-center gap-10 min-w-[200px]"
                key={i}
              >
                <div className="flex flex-row gap-[min(32px,2vw)] ">
                  <div className="flex flex-col gap-4 md:gap-7 items-center">
                    <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center h-16">
                      {awardAssort.name}
                    </p>
                    <div className="prizeList px-3 py-4 gap-3 md:px-5 md:py-7 md:gap-4  min-w-[200px]">
                      {awardAssort.awards.map((award: any, i: any) => {
                        return (
                          <Fragment key={i}>
                            <div className="flex flex-col gap-1 w-full">
                              <p className="body-3 text-white whitespace-nowrap">
                                {award.awardName}
                              </p>
                              {award.amount > 0 ? (
                                <div className="flex flex-row justify-between">
                                  <p className="body-3 text-white/60">
                                    ${award.amount}
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
      </div> */}
      {(challenge.keySponsors ?? []).length > 0 ? (
        <div className="relative w-full flex flex-col gap-10 items-center">
          <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
            {t("campaign.t29")}
          </p>
          <Marquee>
            {(challenge.keySponsors ?? []).map((sp: string, i: any) => {
              return (
                <div
                  className="rounded-lg border-solid border-[1px] border-white/20 w-48 h-16 md:w-60 md:h-20 flex flex-row items-center justify-center mr-3"
                  key={i}
                >
                  {/* // fixme/ */}
                  <Image
                    src={sp}
                    className="h-8 md:h-10 w-fit"
                    alt="Sponsors"
                    height={32}
                    width={0}
                  />
                </div>
              );
            })}
          </Marquee>
        </div>
      ) : null}
    </div>
  );
}
