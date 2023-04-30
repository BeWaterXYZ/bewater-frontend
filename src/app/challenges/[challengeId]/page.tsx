import { Aspect } from '@/components/aspect';
import { getChallengeById, getChallenges } from '@/services/challenge';
import { formatMoney } from '@/utils/numeral';
import { unsplash } from '@/utils/unsplash';
import clsx from 'clsx';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { segmentSchema } from './param-schema';
import { Timeline } from './timeline';
import { isMileStoneEnabled } from './utils';
import { PrizeSection } from './prize-section';
import { Sponsors } from './sponsors';

import Balancer from 'react-wrap-balancer';

export default async function ChallengeIntro({ params }: any) {
  const { challengeId } = segmentSchema.challengeId.parse(params);
  const challenge = await getChallengeById(challengeId);
  console.log({ challenge });
  const { awards, sponsorships } = challenge;
  const isTeamingEnabled = isMileStoneEnabled('Teaming', challenge);

  return (
    <div className="container flex flex-col gap-10 md:gap-30">
      <div className="hidden lg:block">
        <Timeline milestones={challenge.milestones} />
      </div>

      <div className="flex flex-col md:flex-row md:gap-20 items-center">
        <div className="heading-5 md:heading-3 whitespace-nowrap py-4">
          赛事简介
        </div>
        <div className="body-2 text-white">
          {challenge.description.split('\n').map((s) => (
            <p className="py-3" key={s}>
              {s}
            </p>
          ))}
        </div>
      </div>
      <div className="">
        <PrizeSection />
      </div>
      <div>
        <h3 className="heading-5 md:heading-3 font-bold mb-16 text-center">
          大赛评审团
        </h3>
        <div className="flex flex-row flex-wrap gap-8 justify-center">
          {challenge.judges.map((judge) => {
            return (
              <div key={judge.id} className="w-[150px]">
                <Aspect ratio={1 / 1}>
                  <Image
                    height={150}
                    width={150}
                    src={unsplash('women')}
                    className="object-cover w-full h-full"
                    alt={judge.name}
                  />
                </Aspect>
                <p className="body-3 mt-6">{judge.name}</p>
                <p className="body-4 text-grey-400">{judge.organization}</p>
              </div>
            );
          })}
          <div className="w-[150px]">
            <div className="w-[150px] h-[150px] flex items-center justify-center bg-white/5 heading-5 text-gray-500/50 text-center">
              Coming Soon
            </div>
            <p className="body-3 mt-6 w-full text-grey-400">
              更多评委即将揭晓...
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex gap-8 flex-col md:flex-row my-16">
        <div className="flex-1 p-8 bg-white/5 border border-grey-800">
          <h3 className="heading-5 font-bold mb-8">参赛要求</h3>
          <ol className="list-decimal">
            {challenge.requirements.map((r) => (
              <li key={r} className="list-inside text-grey-400">
                <span className="body-3 text-grey-400">{r}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex-1 p-8 bg-white/5 border border-grey-800">
          <h3 className="heading-5 font-bold mb-8">评审维度</h3>
          <p className="body-3 text-grey-400">
            本次 BeWater Web3 创新大赛评审的打分将从以下几个维度给出综合评价:
          </p>
          <ol className="list-decimal">
            {challenge.reviewDimension.map((r) => (
              <li key={r} className=" list-inside text-grey-400">
                <span className="body-3 text-grey-400">{r}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* <div className="max-w-full">
        <h3 className="heading-4 font-bold my-8 text-center">Official Links</h3>
        <div className="w-full my-4">
          {challenge.socialLinks.twitterURI ? (
            <div className="flex border-b border-b-grey-800 py-4 gap-3">
              <Image
                src="/icons/twitter.svg"
                height="20"
                width="20"
                alt="twitter"
              ></Image>
              <p className="body-3"> {challenge.socialLinks.twitterURI} </p>
            </div>
          ) : null}
          {challenge.socialLinks.discordURI ? (
            <div className="flex border-b border-b-grey-800 py-4 gap-3">
              <Image
                src="/icons/discord.svg"
                height="20"
                width="20"
                alt="discord"
              ></Image>
              <p className="body-3"> {challenge.socialLinks.discordURI} </p>
            </div>
          ) : null}

          {challenge.socialLinks.officialWebsiteURI ? (
            <div className="flex border-b border-b-grey-800 py-4 gap-3">
              <Image
                src="/icons/globe.svg"
                height="20"
                width="20"
                alt="twitter"
              ></Image>
              <p className="body-3">
                {challenge.socialLinks.officialWebsiteURI}
              </p>
            </div>
          ) : null}
          {challenge.socialLinks.email ? (
            <div className="flex border-b border-b-grey-800 py-4 gap-3">
              <Image
                src="/icons/email.svg"
                height="20"
                width="20"
                alt="twitter"
              ></Image>
              <p className="body-3"> {challenge.socialLinks.email} </p>
            </div>
          ) : null}
        </div>
      </div> */}

      <Sponsors />
      <div className="flex flex-col justify-center items-center pt-[80px] pb-[160px]">
        <p className="heading-6 md:heading-4 text-center">
          <Balancer ratio={0.9}>
            {isTeamingEnabled
              ? 'Interested? Make your team and embrace it.'
              : '现在加入 BeWater，为创新和改变贡献出自己的力量'}
          </Balancer>
        </p>
        <p className="body-3 md:body-2 text-grey-400 md:text-grey-400  pt-5 pb-8 text-center">
          <Balancer>
            {isTeamingEnabled
              ? 'Join over 4,000+ hackers all over the world.'
              : '已有近 25000 名预注册的开发者和设计师领取了 BeWater 早鸟徽章'}
          </Balancer>
        </p>
        {isTeamingEnabled ? (
          <div>
            <Link
              href={`/challenges/${challengeId}/teams`}
              className="btn btn-primary-invert body-4 text-day  uppercase w-64 py-6"
            >
              Go to team page
            </Link>
          </div>
        ) : (
          <div>
            <Link
              href={`/connect`}
              className="btn btn-primary-invert body-4 text-day  uppercase w-64 py-6"
            >
              加入 BeWater
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { challengeId } = segmentSchema.challengeId.parse(params);
  const challenge = await getChallengeById(challengeId);
  return {
    title: 'BeWater - ' + challenge.title,
    description: challenge.description,
  };
}
