import { Aspect } from '@/components/aspect';
import { getChallengeById, getChallenges } from '@/services/challenge';
import { unsplash } from '@/utils/unsplash';
import Link from 'next/link';

import { paramSchema } from '../param-schema';

export default async function ChallengeIntro({ params }: any) {
  const { challengeId } = paramSchema.parse(params);
  const challenge = await getChallengeById(challengeId);

  return (
    <div className="container  p-4 body-1">
      {/* <div className="body-1 text-center bg-cyan-400">time schedule</div> */}

      <div className="block md:grid gap-5 grid-cols-[minmax(0,_1fr),minmax(0,_2fr)]">
        <div className="">
          <h3 className="heading-3 my-4 ">Awards</h3>
          <div className="break-words">{JSON.stringify(challenge.awards)}</div>

          <div className="max-w-full">
            <h3 className="heading-3 my-4">Sponsor</h3>
            <div className="break-words">
              {JSON.stringify(challenge.sponsors)}
            </div>
          </div>
        </div>

        <div className="">
          <h3 className="body-3 my-8 ">Description</h3>
          <p className="body-3 text-white/60">{challenge.description}</p>
          <hr className="my-4 border-white/30" />
          <h3 className="body-3 my-8">Requirements</h3>
          <ul>
            {challenge.requirements.map((r) => (
              <li key={r}>
                <p className="body-3 text-white/60">{r}</p>
              </li>
            ))}
          </ul>
          <hr className="my-4 border-white/30" />

          <h3 className="body-3 my-8">Location</h3>
          <p className="body-3 text-white/60">{challenge.location}</p>
          <hr className="my-4 border-white/30" />

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
          <hr className="my-4 border-white/30" />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center py-12">
        <p className="heading-4 py-4">
          Interested? Make your team and embrace it.
        </p>
        <p className="body-2 text-white/60  py-4">
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

export async function generateStaticParams() {
  const challenges = await getChallenges();
  return challenges.map((c) => ({
    challengeId: c.id.toString(),
  }));
}
