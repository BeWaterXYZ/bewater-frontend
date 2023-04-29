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

export default async function ChallengeIntro({ params }: any) {
  const { challengeId } = segmentSchema.challengeId.parse(params);
  const challenge = await getChallengeById(challengeId);
  const { awards, sponsorships } = challenge;
  const isTeamingEnabled = isMileStoneEnabled('Teaming', challenge);

  return (
    <div className="container ">
      <div className="hidden lg:block">
        <Timeline milestones={challenge.milestones} />
      </div>

      <div className="flex flex-col md:flex-row md:gap-20 items-center">
        <div className="heading-3 whitespace-nowrap py-4">赛事简介</div>
        <div className="body-2 text-white">
          {challenge.description.split('\n').map((s) => (
            <p className="py-3" key={s}>
              {s}
            </p>
          ))}
        </div>
      </div>
      <div className="my-10">
        <PrizeSection />
      </div>
      <div>
        <h3 className="heading-4 font-bold my-8 text-center">
          Speaker & Judges
        </h3>
        <div className="flex flex-row flex-wrap gap-8">
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
        </div>
      </div>
      <div className="w-full flex gap-8 flex-col md:flex-row my-16">
        <div className="flex-1 p-8 bg-white/5 border border-grey-800">
          <h3 className="heading-5 font-bold mb-8">Requirements & Rules</h3>
          <ul>
            {challenge.requirements.map((r) => (
              <li key={r} className="list-disc list-inside text-grey-400">
                <span className="body-3 text-grey-400">{r}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 p-8 bg-white/5 border border-grey-800">
          <h3 className="heading-5 font-bold mb-8">Judging Criteria</h3>
          <ul>
            {challenge.requirements.map((r) => (
              <li key={r} className="list-disc list-inside text-grey-400">
                <span className="body-3 text-grey-400">{r}</span>
              </li>
            ))}
          </ul>
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
      <div className="flex flex-col justify-center items-center pt-[194px] pb-[160px]">
        <p className="heading-4 text-center">
          Interested? Make your team and embrace it.
        </p>
        <p className="body-2 text-grey-400  pt-5 pb-8 text-center">
          Join over 4,000+ hackers all over the world.
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
        ) : null}
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
