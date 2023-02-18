'use client';
import { useDialogStore } from '@/components/dialog/store';
import { Loading } from '@/components/loading/loading';
import { useFetchChallengeById } from '@/services/challenge.query';
import { useFetchChallengeTeams } from '@/services/team.query';
import { Team, UserProfile } from '@/services/types';
import { useFetchUser } from '@/services/user.query';
import { useAuthStore } from '@/stores/auth';
import clsx from 'clsx';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { segmentSchema } from '../param-schema';
import { querySchema } from '../../../../components/filter/search-param-schema';
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
  role?: string,
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
  if (role) {
    res = res.filter((t) => t.openingRoles.some((pt) => role.includes(pt)));
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
  const showDialog = useDialogStore((s) => s.open);
  const { data: userResponse } = useFetchUser(user?.userId);
  const { challengeId } = segmentSchema.challengeId.parse(params);
  const { data: challenge, isLoading } = useFetchChallengeById(challengeId);
  const { data: teams, isLoading: isLoadingTeam } =
    useFetchChallengeTeams(challengeId);

  if (isLoading || isLoadingTeam) return <Loading />;
  if (!challenge || !teams) return null;

  const { tag, role } = querySchema.parse(Object.fromEntries(sp));
  const teamsFilteredSorted = filterAndSortTeam(
    teams,
    role,
    tag,
    userResponse?.userProfile,
  );

  const showFilter = () => {
    showDialog('team_filter', teams);
  };

  if (teams.length === 0) {
    return (
      <div className="container flex flex-col items-center justify-center gap-4 my-20">
        <Image
          src="/icons/no-team.svg"
          height={115}
          width={164}
          alt="no teams"
        />
        <p className="body-1 text-[20px]  text-center">No Teams Here yet</p>
        <p className="body-2 text-grey-500 text-center">
          Create yours and be the first challenger!
        </p>
        <CreateTeamButton challenge={challenge} />
      </div>
    );
  }

  return (
    <div className="container text-center">
      <ChallengeTeamsInfo challenge={challenge} teams={teams} />
      <div className="flex flex-wrap gap-10 pt-4">
        <div className="w-full lg:w-[200px] hidden lg:block">
          <TeamFilter teams={teams} />
        </div>
        <div className="w-full lg:w-auto flex-1">
          <div className="flex justify-between flex-col-reverse lg:flex-row">
            <div
              className={clsx('body-3  lg:block py-2', {
                '!invisible': !!user,
              })}
            >
              ✨ Log in to see the teams that match you best!
            </div>
            <div className="flex justify-between w-full lg:w-auto">
              <button
                className="lg:hidden btn btn-secondary-invert gap-1"
                onClick={showFilter}
              >
                <Image
                  src="/icons/filter.svg"
                  height={16}
                  width={16}
                  alt="filter"
                />
                <span>Filter</span>
              </button>
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
export const dynamic = 'force-dynamic';
