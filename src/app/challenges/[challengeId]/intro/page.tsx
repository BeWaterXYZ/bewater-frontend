import { Aspect } from '@/components/aspect';
import { getChallengeById } from '@/services/challenge';
import { unsplash } from '@/utils/unsplash';

import * as z from 'zod';

const paramSchema = z.object({
  challengeId: z.string(),
});

export default async function ChallengeIntro({ params }: any) {
  console.log({ params });

  const { challengeId } = paramSchema.parse(params);
  const challenge = await getChallengeById(challengeId);

  return (
    <div className="container  p-4 body-1">
      <div className="body-1 text-center bg-cyan-400 h-20">time schedule</div>

      <div className="block md:grid gap-5 grid-cols-[minmax(0,_1fr),minmax(0,_2fr)]">
        <div className="">
          <h3 className="heading-3 my-4">Awards</h3>
          <div className="break-words">{JSON.stringify(challenge.awards)}</div>

          <div className="max-w-full">
            <h3 className="heading-3 my-4">Sponsor</h3>
            <div className="break-words">
              {JSON.stringify(challenge.sponsors)}
            </div>
          </div>
        </div>
        <div className="">
          <h3 className="heading-3 my-4">Description</h3>
          <p>{challenge.description}</p>

          <h3 className="heading-3 my-4">Requirements</h3>
          <ul>
            {challenge.requirements.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>

          <h3 className="heading-3 my-4">Speaker & Judges</h3>
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
                  <p className="body-3">{judge.name}</p>
                  <p className="body-3 text-gray-400">{judge.organization}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
