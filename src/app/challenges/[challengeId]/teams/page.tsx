import { TeamItem } from './team-item';
import Image from 'next/image';
import { CreateTeamButton } from './create-team-button';
import { paramSchema } from '../param-schema';
import { getChallengeById } from '@/services/challenge';

export default async function ChallengeTeams({ params }: any) {
  const { challengeId } = paramSchema.parse(params);
  const challenge = await getChallengeById(challengeId);
  return (
    <div className="body-1 text-center">
      <div>
        <div className="my-2 gap-4 flex justify-between flex-col md:flex-row">
          <div className="flex-1 h-36  p-8 flex justify-around rounded bg-gradient-to-b from-[#310D37] to-[#310d3700] border border-[#310D37]">
            <div>
              <Image
                src="/challenge/clock.svg"
                alt="Picture of the author"
                width={80}
                height={80}
              />
            </div>
            <div className="flex flex-col justify-around">
              <p className="body-1 text-[#701A75]">
                TEAM FORMATION WILL END IN
              </p>
              <p className="heading-5"> 4 days 14:32:30 </p>
            </div>
          </div>
          <div className="flex-1 h-36  p-8 flex justify-around rounded bg-gradient-to-b from-[#1C104A] to-[#1c104a00] border border-[#1C104A]">
            <div>
              <Image
                src="/challenge/team.svg"
                alt="Picture of the author"
                width={80}
                height={80}
              />
            </div>
            <div className="flex flex-col justify-around">
              <p className="body-2 ">
                <strong className="heading-4">23</strong> teams are ready to
                challenge
              </p>
              <p className="body-2 ">
                <strong className="heading-4   text-[#F62584] ">23</strong>{' '}
                teams are looking for builders
              </p>
            </div>
          </div>
        </div>
        <div className="my-8 flex justify-between">
          <div className="invisible">Sort</div>
          <div>
            <CreateTeamButton />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {new Array(10).fill(0).map((_, index) => {
            return (
              <TeamItem
                key={index}
                challenge={challenge}
                team={{ teamId: '1' }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
