'use client';
import { Loading } from '@/components/loading/loading';
import { useFetchChallengeById } from '@/services/challenge.query';
import { useFetchChallengeTeams } from '@/services/useFetchChallengeTeams';
import { UserID, Team } from '@/services/types';
import { useAuthStore } from '@/stores/auth';
import Image from 'next/image';
import { challengeSchema } from '../param-schema';
import { Countdown } from './countdown';
import { CreateTeamButton } from './create-team-button';
import { TeamItem } from './team-item';

function sortTeam(teams: Team[], userId?: UserID) {
  if (!userId) return teams;
  return teams.sort((a, b) => {
    let isInATeam = a.teamMembers.some((m) => m.userId === userId);
    let isInBTeam = b.teamMembers.some((m) => m.userId === userId);

    if (isInATeam && !isInBTeam) return -1;
    else if (isInBTeam && !isInATeam) return 1;
    else return 0;
  });
}

export default function ChallengeTeams({ params }: any) {
  const user = useAuthStore((s) => s.user);
  const { challengeId } = challengeSchema.parse(params);
  const { data: challenge, isLoading } = useFetchChallengeById(challengeId);
  let { data: teams, isLoading: isLoadingTeam } =
    useFetchChallengeTeams(challengeId);
  if (isLoading || isLoadingTeam) return <Loading />;
  if (!challenge || !teams) return null;

  teams = sortTeam(teams, user.userId);
  const team_len = teams.length;
  const team_active_len = teams.filter((t) => t.status === 'ACTIVE').length;
  return (
    <div className="body-1 text-center">
      <div>
        <div className="my-2 gap-4 flex justify-between flex-col lg:flex-row">
          <div className="flex-1 h-36  p-8 flex flex-col lg:flex-row items-center justify-around rounded bg-gradient-to-b from-[#310D37] to-[#310d3700] border border-[#310D37]">
            <div>
              <Image
                src="/challenge/clock.svg"
                alt="Picture of the author"
                width={80}
                height={80}
                className="m-1"
              />
            </div>
            <div className="flex flex-col justify-around">
              <p className="body-1 text-[#701A75]">
                TEAM FORMATION WILL END IN
              </p>
              <p className="heading-5">
                {' '}
                <Countdown deadline={challenge.teamUpDeadline} />
              </p>
            </div>
          </div>
          <div className="flex-1 h-36  p-8 flex flex-col lg:flex-row items-center justify-around rounded bg-gradient-to-b from-[#1C104A] to-[#1c104a00] border border-[#1C104A]">
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
                <strong className="heading-4">{team_len}</strong> teams are
                ready to challenge
              </p>
              <p className="body-2 ">
                <strong className="heading-4   text-[#F62584] ">
                  {team_active_len}
                </strong>{' '}
                teams are looking for builders
              </p>
            </div>
          </div>
        </div>
        <div className="my-8 flex justify-between">
          <div className="invisible">Sort</div>
          <div>
            <CreateTeamButton challenge={challenge} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {teams.map((team) => {
            return <TeamItem key={team.id} challenge={challenge} team={team} />;
          })}
        </div>
      </div>
    </div>
  );
}
