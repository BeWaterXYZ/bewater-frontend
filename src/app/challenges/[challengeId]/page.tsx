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

export default async function ChallengeIntro({ params }: any) {
  const { challengeId } = segmentSchema.challengeId.parse(params);
  const challenge = await getChallengeById(challengeId);
  const { awards, sponsorships } = challenge;

  return (
    <div className="container ">
      <div className="hidden lg:block">
        <Timeline milestones={challenge.milestones} />
      </div>

      <div className=" flex flex-wrap gap-16 mt-8">
        <div className="w-full lg:flex-1 order-2 lg:order-1 flex flex-col gap-8">
          <div className="max-w-full">
            <h3 className="body-3 font-bold mb-8">Official Links</h3>
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
          </div>
          <div className="max-w-full">
            <h3 className="body-3 font-bold mb-8">Prize Rewards</h3>

            <div className="border border-grey-700 p-4">
              {awards.map((award, index) => (
                <div
                  key={index}
                  className={clsx('flex p-3  mb-2 ', {
                    'border-b border-b-grey-700': index !== awards.length - 1,
                  })}
                >
                  <div className="flex-1">
                    <p className="body-3 py-2">{award.awardName}</p>
                    <div className="flex justify-between body-4 text-grey-400">
                      <p>{formatMoney(award.amount)}</p>
                      <p>x {award.count}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-full">
            <h3 className="body-3 font-bold mb-8">Organizer & Sponsors</h3>
            <div className="grid gap-4 grid-cols-2">
              {sponsorships.map((sponsorship, index) => (
                <div
                  key={sponsorship.id}
                  className={clsx('border border-grey-400', {
                    'col-span-2': index === 0,
                  })}
                >
                  <Aspect ratio={3}>
                    <Image
                      width={450}
                      height={150}
                      src={unsplash('sponsor')}
                      alt="crypto"
                      className="object-cover w-full h-full"
                    />
                  </Aspect>
                  <div
                    className={clsx('flex justify-center items-end h-6', {
                      'bg-gradient-to-r from-[#F62584] to-[#480CA7]':
                        index === 0,
                      'bg-grey-400': index !== 0,
                    })}
                  >
                    <div className="body-3">
                      {formatMoney(sponsorship.amount)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:flex-[3] order-1 lg:order-2">
          <h3 className="body-3 font-bold mb-8">Description</h3>
          <p className="body-3 text-grey-400">{challenge.description}</p>
          <hr className="my-4 border-grey-800" />
          <h3 className="body-3 font-bold my-8">Requirements</h3>
          <ul>
            {challenge.requirements.map((r) => (
              <li key={r} className="list-disc list-inside text-grey-400">
                <span className="body-3 text-grey-400">{r}</span>
              </li>
            ))}
          </ul>
          <hr className="my-4 border-grey-800" />

          <h3 className="body-3 font-bold my-8">Location</h3>
          <p className="body-3 text-grey-400">{challenge.location}</p>
          <hr className="my-4 border-grey-800" />

          <h3 className="body-3 font-bold my-8">Speaker & Judges</h3>
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
      </div>
      <div className="flex flex-col justify-center items-center pt-[194px] pb-[160px]">
        <p className="heading-4 text-center">
          Interested? Make your team and embrace it.
        </p>
        <p className="body-2 text-grey-400  pt-5 pb-8 text-center">
          Join over 4,000+ hackers all over the world.
        </p>
        <div>
          <Link
            href={`/challenges/${challengeId}/teams`}
            className="btn btn-primary-invert body-4 text-day  uppercase w-64 py-6"
          >
            Go to team page
          </Link>
        </div>
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
