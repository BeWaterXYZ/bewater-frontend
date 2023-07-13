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
import { Sponsors } from './sponsors';
import { Timeline } from './timeline';
import { Timeline as Timeline4 } from './timeline-id4';
import { Timeline as Timeline7 } from './timeline-id7';
import { isMileStoneEnabled } from './utils';

import Balancer from 'react-wrap-balancer';
import { Sponsors2 } from './sponsors2';
import { Sponsors3 } from './sponsors3';
import { Sponsors4 } from './sponsors4';
import { Sponsors5 } from './sponsors5';
import { Sponsors6 } from './sponsors6';
import { Sponsors7 } from './sponsors7';
import { TwitterLogoIcon } from '@radix-ui/react-icons';
import { ScheduleSection } from './schedule-section/3';
import { useTranslation } from '@/app/i18n';
import HoverCard from '@/components/hover-card';
import { Fragment } from 'react';
import Marquee from 'react-fast-marquee';

const ConnectButton = dynamicLoad(() => import('./connect-button'), {
  ssr: false,
});

export default async function ChallengeIntro({ params }: any) {
  //console.log(`params ${JSON.stringify(params)}`);
  const { challengeId } = segmentSchema.challengeId.parse(params);
  //console.log(`challengeId ${challengeId}`);
  const challenge = await getChallengeById(challengeId);
  //console.log(`challengeId ${challengeId}`, challenge);

  const { lng } = segmentSchema.lng.parse(params);
  const { t } = await useTranslation(lng, 'translation');
  const isTeamingEnabled = isMileStoneEnabled('Teaming', challenge);

  const judges = challenge.judges;

  var judges6: any;

  if (challenge.id === '6') {
    judges6 = challenge.metadata;
  }

  if (challenge.id === '2') {
    if (lng === 'en') {
      challenge.title = "A Midsummer CryptoArt's Dream";
      challenge.description =
        "A Midsummer CryptoArt's Dream: Showcase Your Creativity, Explore the Infinite Possibilities of Cryptographic Art!\nA Midsummer CryptoArt's Dream is a collaborative event organized by DeBox and NonceGeekDAO, hosted on BeWater. It aims to explore the infinite possibilities of cryptographic art. We invite all artists, designers, programmers, and creators to join us in creating a brilliant summer dedicated to cryptographic art!";
      challenge.requirements =
        '1. Stickers: Please submit preview images, sample packs, and animated gifs. Share the samples using a cloud storage service.\n2. ProgrammingGC: Please submit your artwork in the form of H5, and you can use Codepen to showcase your artwork.\n3. Other Artworks: Please submit preview images and sample packs.';
      challenge.reviewDimension =
        '1. The adjudicators will score participants\' artworks based on four dimensions: concept and idea, technical expression, stylistic highlights, and overall quality. The judges will provide feedback and reasoning for their evaluations.\n2. Additionally, an "Audience Choice" award will be established, which will be determined by votes from DeBox users.';
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
      {challenge.id === '1' || challenge.id === '2' ? (
        <Timeline milestones={challenge.milestones} lng={lng} />
      ) : null}
      {parseInt(challenge.id) > 3 && challenge.id !== '7' ? (
        <Timeline4
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
          challenge.id === '4'
            ? 'flex flex-col gap-10 md:gap-10 items-center my-10 mb-0'
            : 'flex flex-col gap-10 md:gap-20 items-center my-10'
        }`}
      >
        <div
          className={`flex flex-col gap-4 md:flex-row md:gap-20 items-center ${
            challenge.id === '3' && 'mt-[100px]'
          }`}
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
        {/* 优先级 DC > TG > 推特 */}
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
          ) : challenge?.discordLink ? (
            <>
              <Link
                prefetch={false}
                href={challenge.discordLink}
                target="_blank"
                className="group btn btn-primary-invert body-4 text-day  uppercase w-64 py-6 "
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
              className="group btn btn-primary-invert body-4 text-day  uppercase w-64 py-6 "
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
          ) : challenge?.twitterLink ? (
            <Link
              prefetch={false}
              href={challenge.twitterLink}
              target="_blank"
              className="group btn btn-primary-invert body-4 text-day  uppercase w-64 py-6"
            >
              <div className="flex flex-row gap-4 items-center">
                <TwitterLogoIcon className="w-4 h-4 fill-current text-day group-hover:text-night transition duration-[.15s] ease-out" />
                {t('campaign.t7')}
              </div>
            </Link>
          ) : null}
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
        ) : (
          <div className="container">
            <div className="flex flex-col items-center py-20 px-0 gap-20 bg-[radial-gradient(210%_100%_at_50%_0%,_var(--tw-gradient-stops))] from-day/[0.15] via-night/0 to-day/[0.15] rounded-xl border-solid border-[1px] border-midnight">
              <h3 className="text-[24px] md:text-[36px] text-day md:text-day [text-shadow:0_4px_36px_rgba(0_255_255_/_0.4)] text-center">
                Total Awards: ${challenge.totalAward} {challenge.awardCurrency}
              </h3>
              <div className="flex flex-row flex-wrap items-center gap-16">
                {(challenge.awardAssorts ?? []).map((awardAssort, i) => {
                  return (
                    <div className="flex flex-col items-center gap-10" key={i}>
                      <div className="flex flex-row gap-[min(32px,2vw)] ">
                        <div className="flex flex-col gap-4 md:gap-7 items-center">
                          <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
                            {awardAssort.name}
                          </p>
                          <div className="prizeList px-3 py-4 gap-3 md:px-5 md:py-7 md:gap-4">
                            {awardAssort.awards.map((award, i) => {
                              return (
                                <Fragment key={i}>
                                  <div className="flex flex-col gap-1 w-full">
                                    <p className="body-3 text-white">
                                      {award.awardName}
                                    </p>
                                    <div className="flex flex-row justify-between">
                                      <p className="body-3 text-white/60">
                                        ${award.amount}
                                      </p>
                                      <p className="body-3 text-white/60">
                                        x{award.count}
                                      </p>
                                    </div>
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
                <p className="body-1 md:text-[24px] font-bold text-white/30 md:text-white/30">
                  Key Sponsors
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
            </div>
          </div>
        )}
      </div>
      {challenge.id !== '3' && challenge.id !== '7' ? (
        <>
          <div className="mt-16">
            <h3 className="heading-5 md:heading-3 font-bold mb-16 text-center">
              {challenge.id === '4' ? 'Confirmed Mentors' : t('campaign.t8')}
            </h3>
            <div className="flex flex-row flex-wrap gap-6 justify-center">
              {judges
                .sort((a, b) => a.order - b.order)
                .map((judge) => {
                  return (
                    <div key={judge.id!} className="w-[180px] mb-2 ">
                      <Aspect ratio={1 / 1} className="">
                        <HoverCard
                          side="right"
                          card={
                            <div className="min-w-[100px] max-w-[200px] text-white">
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

                      <p className="body-3 mt-4 mb-2 text-white">
                        {judge.name}
                      </p>
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
              {challenge.id === '6' ? (
                <>
                  <p className="body-3 mt-6 w-full text-grey-400 text-center">
                    生态评审嘉宾
                  </p>
                  {judges6.j1.map((judge: any) => {
                    return (
                      <div key={judges6.key++} className="w-[180px] mb-2">
                        <Aspect ratio={1 / 1}>
                          <Image
                            height={150}
                            width={150}
                            src={judge.avatarURI ?? unsplash('man')}
                            className="object-cover w-full h-full"
                            alt={judge.name}
                            title={judge.description}
                          />
                        </Aspect>
                        <p className="body-3 mt-4 mb-2">{judge.name}</p>
                        <p className="body-4 text-grey-400">{judge.title}</p>
                      </div>
                    );
                  })}
                  <p className="body-3 mt-6 w-full text-grey-400 text-center">
                    赞助评审嘉宾
                  </p>
                  {judges6.j2.map((judge: any) => {
                    return (
                      <div key={judges6.key++} className="w-[180px] mb-2">
                        <Aspect ratio={1 / 1}>
                          <Image
                            height={150}
                            width={150}
                            src={judge.avatarURI ?? unsplash('man')}
                            className="object-cover w-full h-full"
                            alt={judge.name}
                            title={judge.description}
                          />
                        </Aspect>
                        <p className="body-3 mt-4 mb-2">{judge.name}</p>
                        <p className="body-4 text-grey-400">{judge.title}</p>
                      </div>
                    );
                  })}
                  <p className="body-3 mt-6 w-full text-grey-400 text-center">
                    社区评审嘉宾
                  </p>
                  {judges6.j3.map((judge: any) => {
                    return (
                      <div key={judges6.key++} className="w-[180px] mb-2">
                        <Aspect ratio={1 / 1}>
                          <Image
                            height={150}
                            width={150}
                            src={judge.avatarURI ?? unsplash('man')}
                            className="object-cover w-full h-full"
                            alt={judge.name}
                            title={judge.description}
                          />
                        </Aspect>
                        <p className="body-3 mt-4 mb-2">{judge.name}</p>
                        <p className="body-4 text-grey-400">{judge.title}</p>
                      </div>
                    );
                  })}
                  <p className="body-3 mt-6 w-full text-grey-400 text-center">
                    媒体评审嘉宾
                  </p>
                  {judges6.j4.map((judge: any) => {
                    return (
                      <div key={judges6.key++} className="w-[180px] mb-2">
                        <Aspect ratio={1 / 1}>
                          <Image
                            height={150}
                            width={150}
                            src={judge.avatarURI ?? unsplash('man')}
                            className="object-cover w-full h-full"
                            alt={judge.name}
                            title={judge.description}
                          />
                        </Aspect>
                        <p className="body-3 mt-4 mb-2">{judge.name}</p>
                        <p className="body-4 text-grey-400">{judge.title}</p>
                      </div>
                    );
                  })}
                </>
              ) : null}
              {challenge.id === '6' ? null : (
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
          {parseInt(challenge.id) > 11 ? (
            <div className="container">
              <div className="w-full grid grid-cols-1 md:grid-cols-2  gap-8  mt-16">
                <div className="flex-1 p-8 bg-white/5 border border-grey-800">
                  <h3 className="text-[24px] font-bold mb-8 text-white">
                    Submission Requirements
                  </h3>
                  <ol className="list-decimal">
                    {challenge.requirements
                      .split('\n')
                      .filter(Boolean)
                      .map((r, i) => (
                        <li
                          key={i}
                          className="list-none text-grey-400 mb-3 indent-[-1em] pl-[1em]"
                        >
                          <span className="text-[14px] text-grey-400">{r}</span>
                        </li>
                      ))}
                  </ol>
                </div>
                <div className="flex-1 p-8 bg-white/5 border border-grey-800">
                  <h3 className="text-white text-[24px] font-bold mb-8">
                    Judging Criteria
                  </h3>
                  <ol className="list-decimal">
                    {challenge.reviewDimension
                      .split('\n')
                      .filter(Boolean)
                      .map((r, i) => (
                        <li
                          key={i}
                          className=" list-none text-grey-400 mb-3 indent-[-1em] pl-[1em]"
                        >
                          <span className="text-[14px] text-grey-400">{r}</span>
                        </li>
                      ))}
                  </ol>
                </div>
              </div>
            </div>
          ) : null}

          {challenge?.requirements.length > 1 ? (
            <div
              className={`w-full grid grid-cols-1 ${
                challenge?.requirements.length > 1 &&
                challenge?.reviewDimension.length > 1
                  ? 'md:grid-cols-2'
                  : 'md:grid-cols-1'
              }  gap-8  mt-16`}
            >
              <div className="flex-1 p-8 bg-white/5 border border-grey-800">
                <h3 className="heading-5 font-bold mb-8">
                  {challenge.id !== '5' ? t('campaign.t10') : 'Event Details'}
                </h3>
                <ul className="list-decimal">
                  {challenge.requirements.split('\n').map((r) => (
                    <li
                      key={r}
                      className="list-none text-grey-400 mb-3 indent-[-1em] pl-[1em]"
                    >
                      <span className="body-3 text-grey-400">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {parseInt(challenge.id) < 6 ? (
                <>
                  {challenge?.reviewDimension.length > 1 ? (
                    <div className="flex-1 p-8 bg-white/5 border border-grey-800">
                      <h3 className="heading-5 font-bold mb-8">
                        {t('campaign.t11')}
                      </h3>
                      <ul className="list-decimal">
                        {challenge.reviewDimension.split('\n').map((r) => (
                          <li
                            key={r}
                            className=" list-none text-grey-400 mb-3 indent-[-1em] pl-[1em]"
                          >
                            <span className="body-3 text-grey-400">{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </>
              ) : null}
              {challenge.id === '6' ? (
                <div className="flex-1 p-8 bg-white/5 border border-grey-800">
                  <h3 className="heading-5 font-bold mb-8">
                    {t('campaign.t11')}
                  </h3>
                  <ul className="list-decimal">
                    <p className="body-3 text-grey-400">评审分数构成：</p>
                    <br />
                    <li className=" list-none text-grey-400 mb-3 indent-[-1em] pl-[1em]">
                      <span className="body-3 text-grey-400">
                        1. 生态专业评审团（占比50%）
                      </span>
                    </li>
                    <li className=" list-none text-grey-400 mb-3 indent-[-1em] pl-[1em]">
                      <span className="body-3 text-grey-400">
                        2. 赞助评审（占比40%）
                      </span>
                    </li>
                    <li className=" list-none text-grey-400 mb-3 indent-[-1em] pl-[1em]">
                      <span className="body-3 text-grey-400">
                        3. 社区+媒体评审团（占比10%）
                      </span>
                    </li>
                    <br />
                    <ul className="list-decimal">
                      <p className="body-3 text-grey-400">评审打分标准：</p>
                      <br />
                      <li className=" list-none text-grey-400 mb-3 indent-[-1em] pl-[1em]">
                        <span className="body-3 text-grey-400">
                          满分100，每个评委为每个项目打分一次,为保证公平公正评委将不能为自己所在赛道的项目打分。
                        </span>
                      </li>
                      <li className=" list-none text-grey-400 mb-3 indent-[-1em] pl-[1em]">
                        <span className="body-3 text-grey-400">
                          1. 产品体验：20
                        </span>
                      </li>
                      <li className=" list-none text-grey-400 mb-3 indent-[-1em] pl-[1em]">
                        <span className="body-3 text-grey-400">
                          2. 技术壁垒：20
                        </span>
                      </li>
                      <li className=" list-none text-grey-400 mb-3 indent-[-1em] pl-[1em]">
                        <span className="body-3 text-grey-400">
                          3. 商业模式：20
                        </span>
                      </li>
                      <li className=" list-none text-grey-400 mb-3 indent-[-1em] pl-[1em]">
                        <span className="body-3 text-grey-400">
                          4. 团队配置：20
                        </span>
                      </li>
                      <li className=" list-none text-grey-400 mb-3 indent-[-1em] pl-[1em]">
                        <span className="body-3 text-grey-400">
                          5. 估值水平：20
                        </span>
                      </li>
                      <li className=" list-none text-grey-400 mb-3 indent-[-1em] pl-[1em]">
                        <span className="body-3 text-grey-400">
                          项目最终得分=[(专业评审加权总分-最高分数-最低分数）/9]*50%+[(赞助评审加权总分-最高分数-最低分数）/赞助商数量-2]*40%+[(社区媒体评审加权总分-最高分数-最低分数）/17]*10%
                        </span>
                      </li>
                    </ul>
                  </ul>
                </div>
              ) : null}
            </div>
          ) : null}
        </>
      ) : null}

      {challenge.id === '1' ? (
        <Sponsors />
      ) : challenge.id === '2' ? (
        <Sponsors2 t={t} />
      ) : challenge.id === '3' ? (
        <Sponsors3 />
      ) : challenge.id === '4' ? (
        <Sponsors4 t={t} />
      ) : challenge.id === '5' ? (
        <Sponsors5 t={t} />
      ) : challenge.id === '6' ? (
        <Sponsors6 t={t} />
      ) : challenge.id === '7' ? (
        <Sponsors7 t={t} />
      ) : (
        <div className="container">
          <div>
            <h3 className="text-white  text-[24px] md:text-[36px] font-bold mb-16 text-center">
              Sponsors
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
      )}

      {parseInt(challenge.id) < 4 ||
      challenge.id === '5' ||
      challenge.id === '6' ||
      challenge.id === '7' ? (
        <div className="flex flex-col justify-center items-center pt-[80px] pb-[160px]">
          <p className="heading-6 md:heading-4 text-center">
            <Balancer ratio={0.9}>
              {challenge.id !== '3'
                ? isTeamingEnabled
                  ? `${t('campaign.t12')}`
                  : `${t('campaign.t13')}`
                : `${t('campaign.t14')}`}
            </Balancer>
          </p>
          <p className="body-3 md:body-2 text-grey-400 md:text-grey-400  pt-5 pb-8 text-center">
            <Balancer>
              {challenge.id !== '3'
                ? `${t('campaign.t15')}`
                : `${t('campaign.t16')}`}
            </Balancer>
          </p>
          {challenge.id !== '3' ? (
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
          ) : (
            <div>
              <Link
                prefetch={false}
                target="_blank"
                href="https://forms.gle/qZ5KbnCufSNVeVkv8"
                className="btn btn-primary-invert body-4 text-day  uppercase w-64 py-6"
              >
                {`${t('campaign.t4')}`}
              </Link>
            </div>
          )}
        </div>
      ) : null}
      {challenge.id === '4' ? (
        <div className="flex flex-col justify-center items-center pt-[80px] pb-[160px]">
          <p className="heading-6 md:heading-4 text-center">
            <Balancer ratio={0.9}>JOIN ZK HACKER CAMP NOW</Balancer>
          </p>
          <p className="body-3 md:body-2 text-grey-400 md:text-grey-400  pt-5 pb-8 text-center">
            <Balancer>
              Registration Period: Jun 26th- July 21st 9PM SGT
            </Balancer>
          </p>
          <div>
            <Link
              prefetch={false}
              href={`https://docs.google.com/forms/d/128cimlspqKBj4EfAAB9dUIN4zgG0og4u4r837Ul1VJo/viewform?pli=1&edit_requested=true`}
              className="btn btn-primary-invert body-4 text-day  uppercase w-64 py-6"
            >
              Join
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
