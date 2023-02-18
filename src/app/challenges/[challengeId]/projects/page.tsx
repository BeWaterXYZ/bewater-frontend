'use client';
import { segmentSchema } from '../param-schema';
import { querySchema } from '../../../../components/filter/search-param-schema';
import { ProjectItem } from './project-item';
import { useFetchChallengeById } from '@/services/challenge.query';
import { useFetchChallengeProjects } from '@/services/project.query';
import Loading from '../loading';
import { ProjectFilter } from './project-filter';
import { Project, UserProfile } from '@/services/types';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/stores/auth';
import { useState } from 'react';
import { SearchInput } from '../../../../components/molecules/search-input';
import { useDialogStore } from '@/components/dialog/store';
import { CreateTeamButton } from '../teams/create-team-button';
function filterAndSortProject(
  projects: Project[],
  userProfile?: UserProfile,
  options?: {
    tag?: string;
    search?: string;
    sort?: boolean;
  },
) {
  let res = projects;

  /**
   * filtering
   */
  if (options?.tag) {
    res = res.filter((p) => p.tags.some((pt) => options.tag!.includes(pt)));
  }
  if (options?.search) {
    res = res.filter(
      (p) =>
        p.team.name.toLowerCase().includes(options.search!.toLowerCase()) ||
        p.name.toLowerCase().includes(options.search!.toLowerCase()),
    );
  }
  /**
   * sorting
   */
  if (!userProfile) return res;
  return res.sort((a, b) => {
    let isInATeam = a.team.teamMembers.some(
      (m) => m.userProfile.userId === userProfile.userId,
    );
    let isInBTeam = b.team.teamMembers.some(
      (m) => m.userProfile.userId === userProfile.userId,
    );

    if (isInATeam && !isInBTeam) return -1;
    else if (isInBTeam && !isInATeam) return 1;
    else return 0;
  });
}

export default function ChallengeProjects({ params, searchParams }: any) {
  const sp = useSearchParams();
  const showDialog = useDialogStore((s) => s.open);
  const user = useAuthStore((s) => s.user);
  const [search, searchSet] = useState('');
  const [sort, sortSet] = useState(false);
  const { challengeId } = segmentSchema.challengeId.parse(params);
  const { data: challenge, isLoading } = useFetchChallengeById(challengeId);
  const { data: projects, isLoading: isLoadingProject } =
    useFetchChallengeProjects(challengeId);

  if (isLoading || isLoadingProject) return <Loading />;
  if (!challenge || !projects) return null;

  const { tag } = querySchema.parse(Object.fromEntries(sp));
  const projectsFilteredSorted = filterAndSortProject(projects, user, {
    tag,
    search,
    sort,
  });
  const showFilter = () => {
    showDialog('project_filter', projects);
  };

  if (projects.length === 0) {
    return (
      <div className="container flex flex-col items-center justify-center gap-4 my-20">
        <Image
          src="/icons/no-project.svg"
          height={180}
          width={270}
          alt="no teams"
        />
        <p className="body-1 text-[20px] text-center">No Projects Here yet</p>
        <p className="body-2 text-grey-500 text-center">
          Create yours and be the first challenger!
        </p>
        <CreateTeamButton challenge={challenge} />
      </div>
    );
  }

  return (
    <div className="container flex flex-wrap gap-10 pt-4">
      <div className="w-full lg:w-[200px] hidden lg:block">
        <ProjectFilter projects={projects} />
      </div>
      <div className="w-full lg:w-auto flex-1">
        {/* search and filter bar  */}
        <div className="flex justify-between py-4">
          <div className="hidden lg:block invisible">
            <button className="body-3 flex gap-1">
              <Image
                src="/icons/sort.svg"
                height={16}
                width={16}
                alt="filter"
              />
              Sort
            </button>
          </div>
          <div className="w-full lg:w-auto flex  flex-col gap-4">
            <div className="lg:min-w-[300px]">
              <SearchInput
                value={search}
                onChange={(e) => searchSet(e.target.value)}
              />
            </div>
            <div className="flex lg:hidden justify-between gap-2">
              <button
                className="btn btn-secondary-invert w-full gap-1"
                onClick={showFilter}
              >
                <Image
                  src="/icons/filter.svg"
                  height={16}
                  width={16}
                  alt="filter"
                />
                Filter
              </button>
              <button className="btn btn-secondary-invert w-full gap-1 invisible">
                <Image
                  src="/icons/sort.svg"
                  height={16}
                  width={16}
                  alt="filter"
                />
                Sort
              </button>
            </div>
          </div>
        </div>
        <div className="grid gap-4 grid-cols-300">
          {projectsFilteredSorted.map((project) => {
            return <ProjectItem key={project.id} project={project} />;
          })}
        </div>
      </div>
    </div>
  );
}
