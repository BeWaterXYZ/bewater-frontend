import PrizeList from '@/components/prize-list';
import SponsorsCell from '@/components/sponsor-marquee-cell';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';
import { Fragment } from 'react';

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
        {`$${challenge.totalAward} total in prizes to be won !`}
      </h3>
      <div className="flex flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-10">
          <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
            6 {t('cryptoArt.t6')}
          </p>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center">
              ChatGPT Plugin X K.Transformer
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                <ul className="body-3 text-white/60 list-disc list-inside">
                  <li>
                    登录 K.Transformer 的官网
                    https://transformer.knn3.xyz/，并注册账号
                  </li>
                  <br />
                  <li>
                    使用 K.Transformer 的自定义 API，创建一个有价值的 ChatGPT
                    Plugin，具体能够解决一个实际问题或满足一个需求。文档：https://docs.knn3.xyz/welcome/k.transformer
                  </li>
                  <br />
                  <li>评判标准：确保创建的 ChatGPT 插件正常使用</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center">
              Build dApps with K.Transformer
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                <ul className="body-3 text-white/60 list-disc list-inside">
                  <li>
                    登录 K.Transformer 的官网
                    https://transformer.knn3.xyz/，并注册账号
                  </li>
                  <br />
                  <li>
                    开发者可以使用 K.Transformer 的 SQL 模板、AI 辅助 SQL
                    编写、Lambda 工作流或者自己编写
                    SQL，并接入您的产品或设想一个创新的应用场景案例，比如您可以考虑开发一个
                    gamefi、一个数据查询工具或一个生成图片的应用。文档：https://docs.knn3.xyz/welcome/k.transformer
                  </li>
                  <br />
                  <li>
                    测试和优化：开发完成后，对您的应用进行测试和必要的优化，确保
                    K.Transformer 的功能正确地集成，并且应用能够按照预期工作
                  </li>
                  <br />
                  <li>
                    评判标准：需要使用 K.Transformer 的 workflow 来开发自己的
                    DApps 或网页
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center">
              Questflow X K.Transformer Innovation Challenge
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                <ul className="body-3 text-white/60 list-disc list-inside">
                  <li>
                    访问 Questflow 网站
                    https://www.questflow.ai，注册/登录到您的账户
                  </li>
                  <br />
                  <li>
                    结合 Questflow X K.Transformer 的平台功能打造一个落地的 Web3
                    应用场景
                  </li>
                  <br />
                  <li>
                    评判标准：项目必须结合 Questflow X K.Transformer
                    两个产品的功能，并且与 Web3 应用场景有关
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center">
              Developing Products on Relation Protocol #task1
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                <ul className="body-3 text-white/60 list-disc list-inside">
                  <li>
                    根据 Relation protocol 或 Relation social Grahp
                    开发一些相关产品，包括但不限于：简单易上手的小游戏，可以在社区使用或者能够产生基于
                    Relation Protocol 和 Relation social graph 或符合 Semantic
                    SBT 标准的社交数据。链接：docs.relationlabs.ai
                  </li>
                  <br />
                  <li>
                    评判标准：开发产品需要与 Relation Protocol
                    有深度的接入，能够产品链上社交数据或者 Semantic-SBTs
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center">
              Developing Products on Relation Protocol #task2
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                <ul className="body-3 text-white/60 list-disc list-inside">
                  <li>
                    接入 Relation Profile
                    NFT的（.soul解析）。链接：docs.relationlabs.ai
                  </li>
                  <br />
                  <li>
                    评判标准：能够在平台通过 Relation Profile NFT
                    进行反向解析，并且通过搜索，能够抓取 Relation Profile NFT
                    所链接的相关 Relation 社交数据
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center">
              社区最喜爱奖
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                <ul className="body-3 text-white/60 list-disc list-inside">
                  <li>社区喜爱项目奖 600U，由获得投票数最高的前三名项目瓜分</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center">
              阳光普照奖
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                <ul className="body-3 text-white/60 list-disc list-inside">
                  <li>
                    由投中前三名项目的社区用户平均瓜分（比如40名用户投中票数排名前三的项目，每位用户获得10U），投票时间：8.24-8.30
                  </li>
                  <br />
                  <li>
                    参与流程：1. 用户必须在 .Bit 平台领取 .moledao 域名，使用
                    .Bit Voty 工具投票；2. 每个用户最多投 3 张票；3.
                    奖金直接发放给 .Moledao 域名绑定的钱包地址
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full flex flex-col gap-10 items-center">
        <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
          Prize Introduction
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
          <p className="body-1 md:text-[24px] font-bold text-white/30 md:text-white/30">
            {t('campaign.t29')}
          </p>
          <Marquee>
            {(challenge.keySponsors ?? []).map((sp: string, i: any) => {
              return (
                <div
                  className="rounded-lg border-solid border-[1px] border-white/20 w-48 h-16 md:w-60 md:h-20 flex flex-row items-center justify-center mr-3"
                  key={i}
                >
                  {/* // fixme/ */}
                  <img src={sp} className="h-8 md:h-10" />
                </div>
              );
            })}
          </Marquee>
        </div>
      ) : null}
    </div>
  );
}
