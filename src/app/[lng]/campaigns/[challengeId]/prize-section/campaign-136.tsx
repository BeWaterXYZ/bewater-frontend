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
    <div className="container">
      <div className="flex flex-col items-center py-20 px-0 gap-20 bg-[radial-gradient(210%_100%_at_50%_0%,_var(--tw-gradient-stops))] from-day/[0.15] via-night/0 to-day/[0.15] rounded-xl border-solid border-[1px] border-midnight">
        <h3 className="heading-5 md:heading-3 text-day md:text-day [text-shadow:0_4px_36px_rgba(0_255_255_/_0.4)] text-center">
          Total Awards: {formatMoney(challenge.totalAward)}{" "}
          {challenge.awardCurrency ?? "USDT"}
        </h3>
        <div className="flex flex-col items-center gap-16">
          <div className="flex flex-col items-center gap-10">
            <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
              主赛道
            </p>
            <div className="flex flex-col gap-4 md:gap-7 items-center">
              <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center">
                Innovative Dapps
              </p>
              <div className="prizeList2 w-fit md:min-w-[620px] max-w-[620px] mx-5 px-5 py-5">
                <div className="flex z-1 flex-col sm:flex-row items-center gap-5 w-full body-3 text-white/60">
                  创新应用类赛道，AI, 社交, 游戏，消费等你认为可以帮助 Web3 实现
                  Mass Adoption 的应用可报名此赛道。
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-7 items-center">
              <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center">
                Open-Source Tools/Infrastructure
              </p>
              <div className="prizeList2 w-fit md:min-w-[620px] max-w-[620px] mx-5 px-5 py-5">
                <div className="flex z-1 flex-col sm:flex-row items-center gap-5 w-full body-3 text-white/60">
                  开源工具或基础设施类项目赛道，工具、协议、框架等均可。
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-7 items-center">
              <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center">
                xFi3.xFi
              </p>
              <div className="prizeList2 w-fit md:min-w-[620px] max-w-[620px] mx-5 px-5 py-5">
                <div className="flex z-1 flex-col sm:flex-row items-center gap-5 w-full body-3 text-white/60">
                  金融类应用/协议赛道，DeFi, RWA, ReFi
                  等等任何可以促进金融创新，实现金融普惠的项目都可以报名此赛道。
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-7 items-center">
              <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center">
                General
              </p>
              <div className="prizeList2 w-fit md:min-w-[620px] max-w-[620px] mx-5 px-5 py-5">
                <div className="flex z-1 flex-col sm:flex-row items-center gap-5 w-full body-3 text-white/60">
                  通用赛道，其他任何不属于以上三个赛道，但你认为可以激发以太坊生态活力，促进生态发展的项目都可以来报名此赛道。
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-7 items-center">
              <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center">
                Bounty 赛道
              </p>
              <div className="prizeList2 w-fit md:min-w-[620px] max-w-[620px] mx-5 px-5 py-5">
                <div className="flex z-1 flex-col gap-5 w-full body-3 text-white/60">
                  <p>
                    感谢由 TheGraph, Vara, Smartlayer, Bifrost, BGA 赞助的
                    Boutny
                    Track，如果你的项目同时符合他们的规则要求，可额外获得由但他们提供的奖励（也可单独申报他们的赛道）。
                  </p>
                  <p>1. TheGraph 将提供 $2,000 的奖励</p>
                  <p>2. Vara Network (Gear Foundation) 将提供 $2,000 的奖励</p>
                  <p>3. SmartLayer Network 将提供 $1,000 的奖励</p>
                  <p>4. Bifrost 将提供 $1,000 的奖励</p>
                  <p>5. BGA(Blockchain for Good Alliance) 将提供 $500 的奖励</p>
                  <p>
                    👉 Bounty
                    赛道的评审规则及所需支持由各项目进行提供和评判，详情请访问：
                    <Link
                      href="https://docs.google.com/document/d/1fLK_k6GQWXiMLcbucumev0mnVPw81agLe4iOCjxNNQs/edit?usp=sharing"
                      className="border-b border-b-white/60 break-all"
                    >
                      https://docs.google.com/document/d/1fLK_k6GQWXiMLcbucumev0mnVPw81agLe4iOCjxNNQs/edit?usp=sharing
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-7 items-center">
              <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center">
                额外激励
              </p>
              <div className="prizeList2 w-fit md:min-w-[620px] max-w-[620px] mx-5 px-5 py-5">
                <div className="flex z-1 flex-col gap-5 w-full body-3 text-white/60">
                  AWS 将对本次的获胜团队分别提供 $5,000-$15,000
                  不等的亚马逊云资源 Credits，价值超过 $60,000。
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
                      <div className="prizeList px-3 py-4 gap-3 md:px-5 md:py-7 md:gap-4 min-w-[200px]">
                        {awardAssort.awards.map((award: any, i: any) => {
                          return (
                            <Fragment key={i}>
                              <div className="flex flex-col gap-1 w-full">
                                <p className="body-3 text-white text-wrap whitespace-nowrap">
                                  {award.awardName}
                                </p>
                                {award.amount > 0 ? (
                                  <div className="flex flex-row justify-between">
                                    <p className="body-3 text-white/60">
                                      {getSymbolFromCurrency(
                                        challenge.awardCurrency
                                          ? challenge.awardCurrency
                                          : "USD"
                                      ) ?? ""}
                                      {formatMoney(award.amount)}
                                      {challenge.awardCurrency &&
                                      getSymbolFromCurrency(
                                        challenge.awardCurrency
                                      )
                                        ? ""
                                        : " " + challenge.awardCurrency}
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
    </div>
  );
}
