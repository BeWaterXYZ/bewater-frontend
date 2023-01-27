'use client';
import { Loading } from '@/components/loading/loading';
import { useFetchChallengeById } from '@/services/challenge.query';
import { useFetchChallengeTeams } from '@/services/team.query';
import { UserID, Team } from '@/services/types';
import { useAuthStore } from '@/stores/auth';
import { challengeSchema } from '../param-schema';
import { CreateTeamButton } from './create-team-button';
import { TeamItem } from './team-item';
import { TeamFilter } from './team-filter';
import { ChallengeTeamsInfo } from './teams-info';
import { querySchema } from '../search-param-schema';
import { useSearchParams } from 'next/navigation';

function filterAndSortTeam(
  teams: Team[],
  status?: string,
  tag?: string,
  userId?: UserID,
) {
  let res = teams;

  if (tag) {
    res = res.filter((t) => t.project.tags.some((pt) => tag.includes(pt)));
  }

  if (!userId) return res;
  return res.sort((a, b) => {
    let isInATeam = a.teamMembers.some((m) => m.userId === userId);
    let isInBTeam = b.teamMembers.some((m) => m.userId === userId);

    if (isInATeam && !isInBTeam) return -1;
    else if (isInBTeam && !isInATeam) return 1;
    else return 0;
  });
}

export default function ChallengeTeams({ params, searchParams }: any) {
  // fix searchParams wont work for clicking back button on browser
  const sp = useSearchParams();
  const user = useAuthStore((s) => s.user);

  const { challengeId } = challengeSchema.parse(params);
  const { data: challenge, isLoading } = useFetchChallengeById(challengeId);
  let { data: teams, isLoading: isLoadingTeam } =
    useFetchChallengeTeams(challengeId);

  if (isLoading || isLoadingTeam) return <Loading />;
  if (!challenge || !teams) return null;

  console.log(Object.fromEntries(sp));
  const { status, tag } = querySchema.parse(Object.fromEntries(sp));
  const teamsFilteredSorted = filterAndSortTeam(
    teams,
    status,
    tag,
    user.userId,
  );

  return (
    <div className="body-1 text-center">
      <ChallengeTeamsInfo challenge={challenge} teams={teams} />
      <div className="flex flex-wrap gap-10">
        <div className="w-full lg:w-[200px]">
          <TeamFilter teams={teams} />
        </div>
        <div className="w-full lg:w-auto flex-1">
          <div className="flex justify-between">
            <div className="body-3">
              ✨ Log in to see the teams that match you best!
            </div>
            <div>
              <CreateTeamButton challenge={challenge} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-8">
            {teamsFilteredSorted.map((team) => {
              return (
                <TeamItem key={team.id} challenge={challenge} team={team} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
