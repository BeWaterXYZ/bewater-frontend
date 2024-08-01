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
      <div className="relative w-full flex flex-col gap-10 items-center">
        <h3 className="text-[24px] md:text-[36px] text-day md:text-day [text-shadow:0_4px_36px_rgba(0_255_255_/_0.4)] text-center">
          Tracks
        </h3>
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
                    {i === 0 && (
                      <div className="prizeList px-3 py-4 gap-3 md:px-5 md:py-7 md:gap-4 min-w-[200px]">
                        <Fragment>
                          <div className="flex flex-col gap-1 w-full">
                            <p className="body-3 text-white">
                              1 DGR NFT + 500 vDBX award
                            </p>
                            <div className="flex flex-row justify-end">
                              <p className="body-3 text-white/60">x40</p>
                            </div>
                          </div>
                          <hr className="border-none bg-white/20 h-[0.5px] w-full" />
                        </Fragment>
                      </div>
                    )}
                    {i === 1 && (
                      <div className="prizeList px-3 py-4 gap-3 md:px-5 md:py-7 md:gap-4 min-w-[200px]">
                        <Fragment>
                          <div className="flex flex-col gap-1 w-full">
                            <p className="body-3 text-white">
                              30,000 U Price Pool
                            </p>
                            <div className="flex flex-row justify-between">
                              <p className="body-3 text-white/60">
                                deliver to the Top 10 teams
                              </p>
                            </div>
                          </div>
                          <hr className="border-none bg-white/20 h-[0.5px] w-full" />
                        </Fragment>
                      </div>
                    )}
                    {i === 2 && (
                      <div className="prizeList px-3 py-4 gap-3 md:px-5 md:py-7 md:gap-4 min-w-[200px]">
                        <Fragment>
                          <div className="flex flex-col gap-1 w-full">
                            <p className="body-3 text-white">First Prize</p>
                            <div className="flex flex-row justify-between">
                              <p className="body-3 text-white/60">1,500 U</p>
                            </div>
                          </div>
                          <hr className="border-none bg-white/20 h-[0.5px] w-full" />
                        </Fragment>
                        <Fragment>
                          <div className="flex flex-col gap-1 w-full">
                            <p className="body-3 text-white">Second Prize</p>
                            <div className="flex flex-row justify-between">
                              <p className="body-3 text-white/60">1,000 U</p>
                            </div>
                          </div>
                          <hr className="border-none bg-white/20 h-[0.5px] w-full" />
                        </Fragment>
                        <Fragment>
                          <div className="flex flex-col gap-1 w-full">
                            <p className="body-3 text-white">Third Prize</p>
                            <div className="flex flex-row justify-between">
                              <p className="body-3 text-white/60">500 U</p>
                            </div>
                          </div>
                          <hr className="border-none bg-white/20 h-[0.5px] w-full" />
                        </Fragment>
                      </div>
                    )}
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
