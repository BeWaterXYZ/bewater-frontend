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
  // console.log("challenge134", challenge);
  return (
    <div className="flex flex-col items-center py-20 px-0 gap-20 bg-[radial-gradient(210%_100%_at_50%_0%,_var(--tw-gradient-stops))] from-day/[0.15] via-night/0 to-day/[0.15] rounded-xl border-solid border-[1px] border-midnight">
      <h3 className="heading-5 md:heading-3 text-day md:text-day [text-shadow:0_4px_36px_rgba(0_255_255_/_0.4)] text-center">
        Total Awards:{" "}
        {/* {getSymbolFromCurrency(
          challenge.awardCurrency ? challenge.awardCurrency : "USD"
        ) ?? ""} */}
        {"$"}
        {formatMoney(challenge.totalAward)}
        {" " + challenge.awardCurrency}
      </h3>
      <div className="flex flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-10">
          <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
            {challenge.awardAssorts.length} {t("cryptoArt.t6")}
          </p>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center">
              NEAR Bounty
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex z-[1] flex-col items-center gap-5 w-full body-3 text-white/60">
                NEAR is seeking innovative projects that leverage NEAR&rsquo;s
                AI tech stack and ecosystem partner integrations to push the
                boundaries of user-owned AI and decentralized applications.
                Ideal submissions will demonstrate creative use of AI
                experiences, such as:
              </div>
              <ul className="pl-4 mt-3 list-disc flex z-[1] flex-col items-center w-full body-3 text-white/60">
                <li>
                  On-chain AI agents capable of autonomous decision-making and
                  transactions in DeFi ecosystems.{" "}
                </li>

                <li>
                  AI-powered applications that utilize real-time social data for
                  decentralized prediction markets or sentiment analysis.
                </li>
                <li>
                  Privacy-preserving AI models that leverage blockchain for
                  secure, user-controlled data sharing.
                </li>
                <li>
                  Decentralized machine learning platforms that incentivize
                  community contributions and model improvements.
                </li>
                <li>
                  AI-driven governance systems for DAOs or other decentralized
                  organizations.
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center">
              Bitte Bounty
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex flex-col gap-5 w-full body-3 text-white/60 z-10 [&_a]:border-b [&_a]:border-b-white/60 [&_a]:break-all">
                <p>
                  Bitte is an AI Wallet on Near Protocol with an open agent
                  marketplace. They are simplifying on-chain interactions
                  through human-readable conversations, making blockchain
                  accessible to everyone.
                </p>
                <p>
                  Bitte Bounty Track Guideline：:&nbsp;
                  <Link
                    href="https://docs.google.com/document/d/1RGtaciIHUL9iyqTyFAitwzWJr7e1OV7_fuuJlz8Nk7c/edit
https://templates.mintbase.xyz/bounty"
                  >
                    https://docs.google.com/document/d/1RGtaciIHUL9iyqTyFAitwzWJr7e1OV7_fuuJlz8Nk7c/edit
                    https://templates.mintbase.xyz/bounty
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center">
              Hyperbolic Bounty
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex flex-col gap-5 w-full body-3 text-white/60 z-10 [&_a]:border-b [&_a]:border-b-white/60 [&_a]:break-all">
                <p>
                  Address incentive challenges in AI use cases. Design crypto
                  incentive layers for existing AI solutions, or create new
                  asset types within AI products to tackle incentive issues.
                </p>
                <p>
                  Hyperbolic Bounty Track Guideline：:&nbsp;
                  <Link href="https://docs.google.com/document/d/1Ltrr-fGsjrA7uem7E-bqr2ABJ5FZ5iPZc6RW1XWzrWw/edit#heading=h.jslorxj9v5qa">
                    https://docs.google.com/document/d/1Ltrr-fGsjrA7uem7E-bqr2ABJ5FZ5iPZc6RW1XWzrWw/edit#heading=h.jslorxj9v5qa
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center">
              Exabits Bounty
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex flex-col gap-5 w-full body-3 text-white/60 z-10 [&_a]:border-b [&_a]:border-b-white/60 [&_a]:break-all">
                <p>
                  Exabits provides a revolutionary platform that democratizes
                  access to AI GPU compute resources. By tokenizing compute,
                  Exabits allows individual users to own and benefit from
                  high-performance AI infrastructure. Participants&apos;
                  contributions go towards the expansion of enterprise-grade GPU
                  clusters, enhancing compute capacity and efficiency while
                  earning maximum returns.
                </p>
                <p>
                  Exabits Bounty Track Guideline：:&nbsp;
                  <Link href="https://docs.google.com/document/d/1AgaUysbixQA6wZZqzFY-xHiHQAZbn-IZaFqbdA6PQqQ/edit?usp=sharing">
                    https://docs.google.com/document/d/1AgaUysbixQA6wZZqzFY-xHiHQAZbn-IZaFqbdA6PQqQ/edit?usp=sharing
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
                              <p className="body-3 text-white">
                                {award.awardName}
                              </p>
                              {award.amount > 0 ? (
                                <div className="flex flex-row justify-between">
                                  <p className="body-3 text-white/60">
                                    {awardAssort.name === "NEAR Bounty" ? (
                                      <span>
                                        ${formatMoney(award.amount)} worth of
                                        NEAR tokens
                                      </span>
                                    ) : awardAssort.name ===
                                      "Hyperbolic Bounty" ? (
                                      <span>${formatMoney(award.amount)}</span>
                                    ) : awardAssort.name === "Bitte Bounty" ? (
                                      <span>${formatMoney(award.amount)}</span>
                                    ) : awardAssort.name ===
                                      "Exabits Bounty" ? (
                                      <span>
                                        ${formatMoney(award.amount)} worth of
                                        GPU computing power
                                      </span>
                                    ) : (
                                      <span>${formatMoney(award.amount)}</span>
                                    )}
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
                  {/* <Image
                    src={sp}
                    className="h-8 md:h-10 w-fit"
                    alt="Sponsors"
                    height={32}
                    width={0}
                  /> */}
                  <img src={sp} alt="Sponsors" className="h-8 md:h-10 object-cover"/>
                </div>
              );
            })}
          </Marquee>
        </div>
      ) : null}
    </div>
  );
}
