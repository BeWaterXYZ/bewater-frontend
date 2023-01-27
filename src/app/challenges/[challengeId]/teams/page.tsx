'use client';
import { Loading } from '@/components/loading/loading';
import { useFetchChallengeById } from '@/services/challenge.query';
import { useFetchChallengeTeams } from '@/services/team.query';
import { UserID, Team } from '@/services/types';
import { useAuthStore } from '@/stores/auth';
import { challengeSchema } from '../param-schema';
import { CreateTeamButton } from './create-team-button';
import { TeamItem } from './team-item';
import { ChallengeTeamsInfo } from './teams-info';

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

  return (
    <div className="body-1 text-center">
      <ChallengeTeamsInfo challenge={challenge} teams={teams} />
      <div>
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
