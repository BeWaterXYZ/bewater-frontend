'use client';
import { Loading } from '@/components/loading/loading';
import { useFetchChallengeById } from '@/services/challenge.query';
import { useFetchChallengeTeams } from '@/services/team.query';
import { Team, UserProfile } from '@/services/types';
import { useFetchUser } from '@/services/user.query';
import { useAuthStore } from '@/stores/auth';
import { useSearchParams } from 'next/navigation';
import { challengeSchema } from '../param-schema';
import { querySchema } from '../search-param-schema';
import { CreateTeamButton } from './create-team-button';
import { TeamFilter } from './team-filter';
import { TeamItem } from './team-item';
import { ChallengeTeamsInfo } from './teams-info';

function getOpeningRoles(user: UserProfile, team: Team) {
  return team.openingRoles.filter(
    (role) =>
      !team.teamMembers.some((tm) => tm.teamRole === role) &&
      user.roles.includes(role),
  );
}

function filterAndSortTeam(
  teams: Team[],
  status?: string,
  tag?: string,
  userProfile?: UserProfile,
) {
  let res = teams;

  /**
   * filtering
   */
  if (tag) {
    res = res.filter((t) => t.project.tags.some((pt) => tag.includes(pt)));
  }

  /**
   * sorting
   */
  if (!userProfile) return res;
  return res.sort((a, b) => {
    let isInATeam = a.teamMembers.some((m) => m.userId === userProfile.userId);
    let isInBTeam = b.teamMembers.some((m) => m.userId === userProfile.userId);

    if (isInATeam && !isInBTeam) return -1;
    else if (isInBTeam && !isInATeam) return 1;
    else {
      let aAvailableRoles = getOpeningRoles(userProfile, a);
      let bAvailableRoles = getOpeningRoles(userProfile, b);
      return bAvailableRoles.length - aAvailableRoles.length;
    }
  });
}

export default function ChallengeTeams({ params }: any) {
  // fix. searchParams wont work for clicking back button on browser
  const sp = useSearchParams();
  const user = useAuthStore((s) => s.user);
  const { data: userResponse } = useFetchUser(user.userId);
  const { challengeId } = challengeSchema.parse(params);
  const { data: challenge, isLoading } = useFetchChallengeById(challengeId);
  let { data: teams, isLoading: isLoadingTeam } =
    useFetchChallengeTeams(challengeId);

  if (isLoading || isLoadingTeam) return <Loading />;
  if (!challenge || !teams) return null;

  const { status, tag } = querySchema.parse(Object.fromEntries(sp));
  const teamsFilteredSorted = filterAndSortTeam(
    teams,
    status,
    tag,
    userResponse?.userProfile,
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
