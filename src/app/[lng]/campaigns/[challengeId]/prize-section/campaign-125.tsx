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
      <h3 className="heading-5 md:heading-3 text-day md:text-day [text-shadow:0_4px_36px_rgba(0_255_255_/_0.4)] text-center">
        Total Awards:{" "}
        {getSymbolFromCurrency(
          challenge.awardCurrency ? challenge.awardCurrency : "USD"
        ) ?? ""}
        {formatMoney(challenge.totalAward)}{" "}
      </h3>
      <div className="flex flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-10">
          <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
            {challenge.awardAssorts.length} {t("cryptoArt.t6")}
          </p>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center">
              AI STACK/PERFORMANCE
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full body-3 text-white/60">
                Build around the AI stack of compute, data, and model. Enhance
                AI infrastructure and apply it to crypto use cases, including
                improved performance, automation, and verifiable inference.
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center">
              AGENTS/DAPP
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full body-3 text-white/60">
                Explore new applications at the intersection of AI and crypto in
                areas such as trading, the creator economy, gaming, social, and
                consumer sectors. Unlock innovative possibilities.
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center">
              TOKENIZED AI AND INCENTIVES
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full body-3 text-white/60">
                Address incentive challenges in AI use cases. Design crypto
                incentive layers for existing AI solutions, or create new asset
                types within AI products to tackle incentive issues.
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center">
              SECURITY AND PRIVACY
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full body-3 text-white/60">
                Leverage blockchain technology as a trustless layer to tackle AI
                security and privacy concerns, aiming to combat the threat of
                deepfakes and bolster overall security through blockchain
                solutions.
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center">
              BOUNTY TRACK
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex flex-col gap-5 w-full body-3 text-white/60 z-10 [&_a]:border-b [&_a]:border-b-white/60 [&_a]:break-all">
                <p>
                  Projects will be scored for the general tracks first, with the
                  chance to win ADDITIONAL bounty prizes. You can consider
                  sponsor bounties when deciding which ecosystem to build upon
                  for extra bounty prizes. Our sponsors have outlined the
                  following bounty requirements:
                </p>
                <p>
                  Exabits: Providing $1800 worth of computing power to the Grand
                  Prize winner, and an additional $800 worth of computing power
                  to each of the four first-place winners in the General Tracks.
                </p>
                <p>
                  ORA Bounty Track Guideline:&nbsp;
                  <Link href="https://oraprotocol.notion.site/ORA-Hackathon-Bounties-ac634bc873034ab08ed74d9055f3ebe4">
                    https://oraprotocol.notion.site/ORA-Hackathon-Bounties-ac634bc873034ab08ed74d9055f3ebe4
                  </Link>
                </p>
                <p>
                  Galadriel Bounty Track Guideline:&nbsp;
                  <Link href="https://nftport.notion.site/Bewater-Bounty-5da645851f39423c868bcbb3f7365051">
                    https://nftport.notion.site/Bewater-Bounty-5da645851f39423c868bcbb3f7365051
                  </Link>
                </p>
                <p>
                  Neo Bounty Track Guideline:&nbsp;
                  <Link href="https://docs.google.com/document/d/140mIL1LYd5bIUdtImy4Ffzvp6mxt64dmwG_73j8eqeo/edit?usp=sharing">
                    https://docs.google.com/document/d/140mIL1LYd5bIUdtImy4Ffzvp6mxt64dmwG_73j8eqeo/edit?usp=sharing
                  </Link>
                </p>
                <p>
                  Hyperbolic Bounty Track Guideline:&nbsp;
                  <Link href="https://hyperboliclabs.notion.site/Hyperbolic-BeWater-Hackathon-ab27980c3e724b33b6cbcaca6c5ad3e9">
                    https://hyperboliclabs.notion.site/Hyperbolic-BeWater-Hackathon-ab27980c3e724b33b6cbcaca6c5ad3e9
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full flex flex-col gap-10 items-center">
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
      </div>
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
