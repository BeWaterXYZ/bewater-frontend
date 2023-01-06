import { TeamItem } from './team-item';
import Image from 'next/image';
import { CreateTeamButton } from './create-team-button';

export default function ChallengeTeams() {
  return (
    <div className="body-1 text-center">
      <div>
        <div className="my-2 gap-4 flex justify-between flex-col md:flex-row">
          <div
            className="flex-1 h-36  p-8 flex justify-around rounded"
            style={{
              backgroundImage:
                'linear-gradient(180deg, #310D37 0%, rgba(49, 13, 55, 0) 100%)',
            }}
          >
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
          <div
            className="flex-1 h-36  p-8 flex justify-around rounded"
            style={{
              backgroundImage:
                'linear-gradient(180deg, #1C104A 0%, rgba(28, 16, 74, 0) 100%)',
            }}
          >
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
        <div className="my-2 flex justify-between">
          <div>Sort</div>
          <div>
            <CreateTeamButton />
          </div>
        </div>
        <div className="hidden  md:grid grid-cols-[1fr,_2fr,_3fr,_1fr] text-left body-2 opacity-20">
          <div>Team Name</div>
          <div>Project</div>
          <div>Roles & Skills Needed</div>
        </div>
        <div>
          {new Array(10).fill(0).map((_, index) => {
            return <TeamItem key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}
