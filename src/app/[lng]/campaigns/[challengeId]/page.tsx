import { Aspect } from '@/components/aspect';
import { getChallengeById } from '@/services/challenge';
import { unsplash } from '@/utils/unsplash';
import dynamicLoad from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { segmentSchema } from './param-schema';
import { PrizeSection as PrizeSection1 } from './prize-section/63c82bd12ddc570f32ada868';
import { PrizeSection as PrizeSection2 } from './prize-section/63c82bd12ddc570f32ada869';
import { Sponsors } from './sponsors';
import { Timeline } from './timeline';
import { isMileStoneEnabled } from './utils';

import Balancer from 'react-wrap-balancer';
import { Sponsors2 } from './sponsors2';
import { Sponsors3 } from './sponsors3';
import { TwitterLogoIcon } from '@radix-ui/react-icons';
import { ScheduleSection } from './schedule-section/3';

const ConnectButton = dynamicLoad(() => import('./connect-button'), {
  ssr: false,
});

export default async function ChallengeIntro({ params }: any) {
  console.log(`params ${JSON.stringify(params)}`);
  const { challengeId } = segmentSchema.challengeId.parse(params);
  console.log(`challengeId ${challengeId}`);
  const challenge = await getChallengeById(challengeId);
  console.log(`challengeId ${challengeId}`, challenge);

  const { lng } = segmentSchema.lng.parse(params);

  const isTeamingEnabled = isMileStoneEnabled('Teaming', challenge);
  return (
    <div className="container flex flex-col gap-16 md:gap-30 ">
      {challenge.id !== '3' ? (
        <Timeline milestones={challenge.milestones} />
      ) : null}
      <div className="flex flex-col gap-10 md:gap-20 items-center my-10">
        <div
          className={`flex flex-col gap-4 md:flex-row md:gap-20 items-center ${
            challenge.id === '3' && 'mt-[100px]'
          }`}
        >
          <div className="heading-5 md:heading-3 whitespace-nowrap py-4 ">
            活动简介
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
          {challenge.id !== '3' ? (
            <Link
              prefetch={false}
              href={`https://t.me/bewater_zh`}
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
                加入 Telegram 华语交流群
              </div>
            </Link>
          ) : (
            <Link
              prefetch={false}
              href={`https://twitter.com/StarkNetAstroCN`}
              target="_blank"
              className="group btn btn-primary-invert body-4 text-day  uppercase w-64 py-6"
            >
              <div className="flex flex-row gap-4 items-center">
                <TwitterLogoIcon className="w-4 h-4 fill-current text-day group-hover:text-night transition duration-[.15s] ease-out" />
                关注官方 Twitter
              </div>
            </Link>
          )}
        </div>
      </div>
      <div className="">
        {challenge.id === '1' ? <PrizeSection1 /> : null}
        {challenge.id === '2' ? <PrizeSection2 /> : null}
        {challenge.id === '3' ? <ScheduleSection /> : null}
      </div>
      {challenge.id !== '3' ? (
        <>
          <div className="mt-16">
            <h3 className="heading-5 md:heading-3 font-bold mb-16 text-center">
              大赛评审团
            </h3>
            <div className="flex flex-row flex-wrap gap-6 justify-center">
              {challenge.judges
                .sort((a, b) => a.order - b.order)
                .map((judge) => {
                  return (
                    <div key={judge.id} className="w-[180px] mb-2">
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
                      <p className="body-4 text-grey-400">
                        {judge.organization}
                      </p>
                      <p className="body-4 text-grey-400">{judge.title}</p>
                    </div>
                  );
                })}
              <div className="w-[180px]">
                <div className="w-[180px] h-[180px] flex items-center justify-center bg-white/5 heading-5 text-gray-500/50 text-center">
                  Coming
                  <br />
                  Soon
                </div>
                <p className="body-3 mt-6 w-full text-grey-400">
                  更多评委即将揭晓...
                </p>
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2  gap-8  mt-16">
            <div className="flex-1 p-8 bg-white/5 border border-grey-800">
              <h3 className="heading-5 font-bold mb-8">参赛要求</h3>
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
            <div className="flex-1 p-8 bg-white/5 border border-grey-800">
              <h3 className="heading-5 font-bold mb-8">评审维度</h3>
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
          </div>
        </>
      ) : null}

      {challenge.id === '1' ? <Sponsors /> : null}
      {challenge.id === '2' ? <Sponsors2 /> : null}
      {challenge.id === '3' ? <Sponsors3 /> : null}

      <div className="flex flex-col justify-center items-center pt-[80px] pb-[160px]">
        <p className="heading-6 md:heading-4 text-center">
          <Balancer ratio={0.9}>
            {challenge.id !== '3'
              ? isTeamingEnabled
                ? '对赛事感兴趣？快组建你的梦幻团队加入我们'
                : '现在加入 BeWater，为创新和改变贡献出自己的力量'
              : '现在报名中国首届 Starknet Workshop，为创新和改变贡献出自己的力量'}
          </Balancer>
        </p>
        <p className="body-3 md:body-2 text-grey-400 md:text-grey-400  pt-5 pb-8 text-center">
          <Balancer>
            {challenge.id !== '3'
              ? '已有近 25000 名预注册的开发者和设计师领取了 BeWater 早鸟徽章'
              : 'Workshop 现场名额有限，先到先得'}
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
                前往队伍页面
              </Link>
            </div>
          ) : (
            <ConnectButton />
          )
        ) : (
          <div>
            <Link
              prefetch={false}
              target="_blank"
              href="https://forms.gle/qZ5KbnCufSNVeVkv8"
              className="btn btn-primary-invert body-4 text-day  uppercase w-64 py-6"
            >
              立即报名
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
