import { Aspect } from '@/components/aspect';
import { getChallengeById } from '@/services/challenge';
import { unsplash } from '@/utils/unsplash';
import dynamicLoad from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { segmentSchema } from './param-schema';
import { PrizeSection as PrizeSection1 } from './prize-section/63c82bd12ddc570f32ada868';
import { PrizeSection as PrizeSection2 } from './prize-section/63c82bd12ddc570f32ada869';
import { PrizeSection as PrizeSection4 } from './prize-section/63c82bd12ddc570f32ada86a';
import { PrizeSection as PrizeSection5 } from './prize-section/63c82bd12ddc570f32ada86b';
import { PrizeSection as PrizeSection6 } from './prize-section/63c82bd12ddc570f32ada86c';
import { PrizeSection as PrizeSection7 } from './prize-section/63c82bd12ddc570f32ada86d';
import { PrizeSection as PrizeSection11 } from './prize-section/63c82bd12ddc570f32ada86e';
import { PrizeSection as PrizeSection19 } from './prize-section/63c82bd12ddc570f32ada86f';
import { Timeline } from './timeline';
import { Timeline7 } from './timeline-id7';
import { isMileStoneEnabled } from './utils';

import Balancer from 'react-wrap-balancer';
import { Sponsors7 } from './sponsors7';
import { TwitterLogoIcon } from '@radix-ui/react-icons';
import { ScheduleSection } from './schedule-section/3';
import { useTranslation } from '@/app/i18n';
//import HoverCard from '@/components/hover-card';
import { Fragment } from 'react';
import Marquee from 'react-fast-marquee';
import Markdown from '@/components/markdown';

const ConnectButton = dynamicLoad(() => import('./connect-button'), {
  ssr: false,
});

export default async function ChallengeIntro({ params }: any) {
  const { challengeId } = segmentSchema.challengeId.parse(params);
  const challenge = await getChallengeById(challengeId);
  const { lng } = segmentSchema.lng.parse(params);
  const { t } = await useTranslation(lng, 'translation');
  let isTeamingEnabled = false;
  if (challenge.milestones?.length > 0) {
    isTeamingEnabled = isMileStoneEnabled('Teaming', challenge);
  }

  const judges = challenge.judges;

  // 这里的四个字段借助matadata支持中英文显示
  if (lng === 'en' && challenge.yotadata) {
    if (challenge.yotadata.entitle) {
      challenge.title = challenge.yotadata.entitle;
    }
    if (challenge.yotadata.endescription) {
      challenge.description = challenge.yotadata.endescription;
    }
    if (challenge.yotadata.enrequirements) {
      challenge.requirements = challenge.yotadata.enrequirements;
    }
    if (challenge.yotadata.enreviewDimension) {
      challenge.reviewDimension = challenge.yotadata.enreviewDimension;
    }
  } else if (lng === 'zh' && challenge.yotadata) {
    if (challenge.yotadata.zhtitle) {
      challenge.title = challenge.yotadata.zhtitle;
    }
    if (challenge.yotadata.zhdescription) {
      challenge.description = challenge.yotadata.zhdescription;
    }
    if (challenge.yotadata.zhrequirements) {
      challenge.requirements = challenge.yotadata.zhrequirements;
    }
    if (challenge.yotadata.zhreviewDimension) {
      challenge.reviewDimension = challenge.yotadata.zhreviewDimension;
    }
  }

  // todo 删除以下hack部分
  if (challenge.id === '2') {
    if (lng === 'en') {
      challenge.location = 'Online Event';
      for (const it of judges) {
        if (it.name.includes('李达潮')) {
          it.name = 'Lee DaTie';
          it.organization = 'Trainee of William G.';
          it.title = 'Co-founder of M10b HK.';
          continue;
        }
        if (it.name.includes('宋婷')) {
          it.name = 'Song Ting';
          it.organization = 'AI & Blockchain Artist';
          it.title = "China's Foremost Cryptographic Artist";
          continue;
        }
        if (it.name.includes('QIAO_MUZI')) {
          it.organization = 'Web3 Artistic Leader';
          it.title = 'Entrepreneur in the Creative Industry';
          continue;
        }
        if (it.name.includes('释无量叁')) {
          it.organization = 'People Tang illustrator/Tang DAO builder/artist';
          continue;
        }
      }
    }
  }

  return (
    <div className="container flex flex-col gap-16 md:gap-30 ">
      {challenge.milestones?.length > 0 && challenge.id !== '7' ? (
        <Timeline
          milestones={challenge.milestones}
          lng={lng}
          id={challenge.id}
        />
      ) : null}
      {challenge.id === '7' ? (
        <Timeline7
          milestones={challenge.milestones}
          lng={lng}
          id={challenge.id}
        />
      ) : null}
      <div
        className={`${
          !(
            challenge.discordLink ||
            challenge.telegramLink ||
            challenge.telegramLink
          )
            ? 'flex flex-col gap-10 md:gap-10 items-center my-10 mb-0'
            : 'flex flex-col gap-10 md:gap-20 items-center my-10'
        }`}
      >
        <div
          className={`flex flex-col gap-4 md:flex-row md:gap-20 items-center
          ${challenge.milestones?.length === 0 && 'mt-[100px]'}
          `}
        >
          <div className="heading-5 md:heading-3 whitespace-nowrap py-4">
            {t('campaign.t5')}
          </div>
          <div className="body-3 md:body-2 text-white">
            {challenge.description.split('\n').map((s) => (
              <p className="py-3" key={s}>
                {s}
              </p>
            ))}
          </div>
        </div>
        <div>
          {challenge.id === '7' ? (
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
            <>
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
                      {t('campaign.t20')}
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
                    {t('campaign.t6')}
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
                    {t('campaign.t7')}
                  </div>
                </Link>
              ) : null}
            </>
          )}
        </div>
      </div>
      <div className="">
        {challenge.id === '1' ? (
          <PrizeSection1 />
        ) : challenge.id === '2' ? (
          <PrizeSection2 t={t} lng={lng} />
        ) : challenge.id === '3' ? (
          <ScheduleSection />
        ) : challenge.id === '4' ? (
          <PrizeSection4 t={t} />
        ) : challenge.id === '5' ? (
          <PrizeSection5 t={t} lng={lng} />
        ) : challenge.id === '6' ? (
          <PrizeSection6 t={t} lng={lng} />
        ) : challenge.id === '7' ? (
          <PrizeSection7 t={t} lng={lng} />
        ) : challenge.id === '11' ? (
          <PrizeSection11 t={t} lng={lng} />
        ) : challenge.id === '19' ? (
          <PrizeSection19 t={t} lng={lng} challenge={challenge} />
        ) : (
          <div className="container">
            <div className="flex flex-col items-center py-20 px-0 gap-20 bg-[radial-gradient(210%_100%_at_50%_0%,_var(--tw-gradient-stops))] from-day/[0.15] via-night/0 to-day/[0.15] rounded-xl border-solid border-[1px] border-midnight">
              {challenge.yotadata?.award?.entitle ? (
                <h3 className="text-[24px] md:text-[36px] text-day md:text-day [text-shadow:0_4px_36px_rgba(0_255_255_/_0.4)] text-center">
                  {challenge.yotadata.award.entitle}
                </h3>
              ) : (
                <h3 className="text-[24px] md:text-[36px] text-day md:text-day [text-shadow:0_4px_36px_rgba(0_255_255_/_0.4)] text-center">
                  Total Awards: ${challenge.totalAward}{' '}
                  {challenge.awardCurrency}
                </h3>
              )}
              <div className="flex flex-row flex-wrap items-top gap-16 p-8">
                {(challenge.awardAssorts ?? []).map((awardAssort, i) => {
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
                            {awardAssort.awards.map((award, i) => {
                              return (
                                <Fragment key={i}>
                                  <div className="flex flex-col gap-1 w-full">
                                    <p className="body-3 text-white whitespace-nowrap">
                                      {award.awardName}
                                    </p>
                                    {award.goodsName ? (
                                      <>
                                        <div className="flex flex-row justify-between">
                                          <p className="body-3 text-white/60">
                                            ${award.goodsName}
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
              {challenge.yotadata?.award?.other ? (
                <Link
                  href={challenge.yotadata.award.other.link ?? ''}
                  target="_blank"
                >
                  <div className="flex flex-row flex-wrap items-top gap-10 p-8 pt-0">
                    {challenge.yotadata.award.other.entitle ? (
                      <p className="body-3 text-white/60 text-center w-full">
                        {challenge.yotadata.award.other.entitle}
                      </p>
                    ) : null}
                    {challenge.yotadata.award.other.entext ? (
                      <p className="body-4 text-white/60">
                        {challenge.yotadata.award.other.entext}
                      </p>
                    ) : null}
                    {challenge.yotadata.award.other.img ? (
                      <Image
                        src={challenge.yotadata.award.other.img}
                        alt=""
                        width={2242}
                        height={882}
                        className="w-full"
                        style={{ borderRadius: '10px' }}
                      />
                    ) : null}
                  </div>
                </Link>
              ) : null}
              {(challenge.keySponsors ?? []).length > 0 ? (
                <div className="relative w-full flex flex-col gap-10 items-center">
                  <p className="body-1 md:text-[24px] font-bold text-white/30 md:text-white/30">
                    {t('campaign.t29')}
                  </p>
                  <Marquee>
                    {(challenge.keySponsors ?? []).map((sp, i) => {
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
          </div>
        )}
      </div>
      <>
        <div className="mt-16">
          <h3 className="heading-5 md:heading-3 font-bold mb-16 text-center">
            {challenge.id === '4' ? 'Confirmed Mentors' : t('campaign.t8')}
          </h3>
          <div className="flex flex-row flex-wrap gap-6 justify-center">
            {judges.length > 0
              ? judges
                  .sort((a, b) => a.order - b.order)
                  .map((judge) => {
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
                          {judge.title ?? ''}
                        </p>
                        <p className="body-4 text-grey-400">
                          {judge.organization ?? ''}
                        </p>
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
                  })
              : challenge?.yotadata?.judges?.length > 0
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
                                  src={judge.avatarURI ?? unsplash('man')}
                                  className="object-cover w-full h-full"
                                  alt={judge.name}
                                />
                              </Aspect>
                              <p className="body-3 mt-4 mb-2">{judge.name}</p>
                              <p className="body-4 text-grey-400">
                                {judge.title ?? ''}
                              </p>
                              <p className="body-4 text-grey-400">
                                {judge.organization ?? ''}
                              </p>
                            </div>
                          </>
                        );
                      })}
                    </>
                  );
                })
              : null}
            {challenge?.yotadata?.judges?.length > 0 ? null : (
              <div className="w-[180px]">
                <div className="w-[180px] h-[180px] flex items-center justify-center bg-white/5 heading-5 text-gray-500/50 text-center">
                  Coming
                  <br />
                  Soon
                </div>
                <p className="body-3 mt-6 w-full text-grey-400">
                  {t('campaign.t9')}
                </p>
              </div>
            )}
          </div>
        </div>
        {!(challenge.requirements || challenge.reviewDimension) ? null : (
          <div className="container">
            <div className="w-full grid grid-cols-1 md:grid-cols-2  gap-8  mt-16">
              <div className="flex-1 p-8 bg-white/5 border border-grey-800">
                <h3 className="text-[24px] font-bold mb-8 text-white">
                  {t('campaign.t28')}
                </h3>

                {challenge.requirements ? (
                  <Markdown>{challenge.requirements}</Markdown>
                ) : (
                  <p className="text-[14px] text-grey-400">
                    {t('campaign.t27')}
                  </p>
                )}
              </div>
              <div className="flex-1 p-8 bg-white/5 border border-grey-800">
                <h3 className="text-white text-[24px] font-bold mb-8">
                  {t('campaign.t11')}
                </h3>
                {challenge.reviewDimension ? (
                  <Markdown>{challenge.reviewDimension}</Markdown>
                ) : (
                  <p className="text-[14px] text-grey-400">
                    {t('campaign.t27')}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </>
      {challenge.id === '7' ? (
        <Sponsors7 t={t} />
      ) : (challenge.sponsors ?? []).length > 0 ? (
        <div className="container">
          <div>
            <h3 className="text-white  text-[24px] md:text-[36px] font-bold mb-16 text-center">
              {t('cryptoArt.t1')}
            </h3>
            <div className="flex flex-col gap-12 items-center">
              {(challenge.sponsors ?? []).map((s, i) => {
                return (
                  <div className="flex flex-col gap-7 items-center" key={i}>
                    <p className="body-1 md: text-[20px] font-bold text-white/30 md:text-white/30">
                      {s.defname}
                    </p>
                    <div className="flex flex-row flex-wrap gap-0 items-center justify-center">
                      {s.members.map((member, i) => (
                        <img
                          src={member}
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
      ) : null}
      <div className="flex flex-col justify-center items-center pt-[80px] pb-[160px]">
        <p className="heading-6 md:heading-4 text-center">
          <Balancer ratio={0.9}>
            {challenge.type !== 'WORKSHOP'
              ? isTeamingEnabled
                ? `${t('campaign.t12')}`
                : `${t('campaign.t13')}`
              : `${t('campaign.t24')}${challenge.title}${t('campaign.t25')}`}
          </Balancer>
        </p>
        <p className="body-3 md:body-2 text-grey-400 md:text-grey-400  pt-5 pb-8 text-center">
          <Balancer>
            {challenge.type !== 'WORKSHOP'
              ? `${t('campaign.t15')}`
              : `${t('campaign.t16')}`}
          </Balancer>
        </p>
        {challenge.type !== 'WORKSHOP' ? (
          isTeamingEnabled ? (
            <div>
              <Link
                prefetch={false}
                href={`/${lng}/campaigns/${challengeId}/teams`}
                className="btn btn-primary-invert body-4 text-day  uppercase w-64 py-6"
              >
                {`${t('campaign.t17')}`}
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
              {`${t('campaign.t4')}`}
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}