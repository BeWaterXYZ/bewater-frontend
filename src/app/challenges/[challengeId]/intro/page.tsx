import { Aspect } from '@/components/aspect';
import { getChallengeById } from '@/services/challenge';
import { formatMoney } from '@/utils/numeral';
import { unsplash } from '@/utils/unsplash';
import clsx from 'clsx';
import Link from 'next/link';

import { challengeSchema } from '../param-schema';
import { Timeline } from './timeline';

export default async function ChallengeIntro({ params }: any) {
  const { challengeId } = challengeSchema.parse(params);
  const challenge = await getChallengeById(challengeId);
  const { awards, sponsorships } = challenge;

  return (
    <div className="container  p-4 body-1">
      <div className="hidden lg:block">
        <Timeline milestones={challenge.milestones} />
      </div>

      <div className=" flex flex-wrap gap-8 ">
        <div className="w-full lg:flex-1 order-2 lg:order-1">
          <h3 className="body-3 my-8 ">Awards</h3>

          <div className="border border-gray-700 p-4 mb-4">
            {awards.map((award, index) => (
              <div
                key={index}
                className={clsx('flex p-3  mb-2 ', {
                  'border-b border-b-gray-700': index !== awards.length - 1,
                })}
              >
                <div className="flex-1">
                  <p className="body-3 py-2">{award.awardName}</p>
                  <div className="flex justify-between body-4 text-grey">
                    <p>{formatMoney(award.amount)}</p>
                    <p>x {award.count}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-full">
            <h3 className="body-3 my-4">Organizer & Sponsors</h3>
            <div className="grid gap-4 grid-cols-2">
              {sponsorships.map((sponsorship, index) => (
                <div
                  key={sponsorship.id}
                  className={clsx('border border-grey', {
                    'col-span-2': index === 0,
                  })}
                >
                  <Aspect ratio={3}>
                    <img
                      src={unsplash('sponsor')}
                      alt="crypto"
                      className="object-cover w-full h-full"
                    />
                  </Aspect>
                  <div
                    className={clsx('flex justify-center items-end h-6', {
                      'bg-gradient-to-r from-[#F62584] to-[#480CA7]':
                        index === 0,
                      'bg-grey': index !== 0,
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
          <h3 className="body-3 my-8 ">Description</h3>
          <p className="body-3 text-gray-400">{challenge.description}</p>
          <hr className="my-4 border-gray-700" />
          <h3 className="body-3 my-8">Requirements</h3>
          <ul>
            {challenge.requirements.map((r) => (
              <li key={r} className="list-disc list-inside">
                <span className="body-3 text-gray-400">{r}</span>
              </li>
            ))}
          </ul>
          <hr className="my-4 border-gray-700" />

          <h3 className="body-3 my-8">Location</h3>
          <p className="body-3 text-gray-400">{challenge.location}</p>
          <hr className="my-4 border-gray-700" />

          <h3 className="body-3 my-8">Speaker & Judges</h3>
          <div className="grid gap-5 grid-cols-100">
            {challenge.judges.map((judge) => {
              return (
                <div key={judge.id} className="max-w-xs">
                  <Aspect ratio={1 / 1}>
                    <img
                      src={unsplash('women')}
                      className="object-cover w-full h-full rounded"
                      alt=""
                    />
                  </Aspect>
                  <p className="body-3 mt-6">{judge.name}</p>
                  <p className="body-4 text-gray-400">{judge.organization}</p>
                </div>
              );
            })}
          </div>
          <hr className="my-4 border-gray-700" />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center py-12">
        <p className="heading-4 py-4">
          Interested? Make your team and embrace it.
        </p>
        <p className="body-2 text-gray-400  py-4">
          Join over 4,000+ hackers all over the world.
        </p>
        <div className="py-4">
          <Link
            href={`/challenges/${challengeId}/teams`}
            className="btn btn-primary-invert uppercase w-64"
          >
            Go to team page
          </Link>
        </div>
      </div>
    </div>
  );
}
