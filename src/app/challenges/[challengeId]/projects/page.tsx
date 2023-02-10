'use client';
import { segmentSchema } from '../param-schema';
import { querySchema } from '../../../../components/filter/search-param-schema';
import { ProjectItem } from './project-item';
import { useFetchChallengeById } from '@/services/challenge.query';
import { useFetchChallengeProjects } from '@/services/project.query';
import Loading from '../loading';
import { ProjectFilter } from './project-filter';
import { Project } from '@/services/types';
import { useSearchParams } from 'next/navigation';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
function SearchInput() {
  return (
    <div className="flex items-center gap-2 border border-grey-800  h-[36x] py-1 rounded-sm">
      <div>
        <MagnifyingGlassIcon className="text-grey-800" height={20} width={20} />
      </div>
      <input
        className="bg-transparent block flex-1 outline-none text-white"
        placeholder="Search for team or project name"
      />
    </div>
  );
}

function filterAndSortProject(projects: Project[], tag?: string) {
  let res = projects;

  /**
   * filtering
   */
  if (tag) {
    res = res.filter((p) => p.tags.some((pt) => tag.includes(pt)));
  }
  /**
   * sorting
   */
  return res;
}

export default function ChallengeProjects({ params, searchParams }: any) {
  const sp = useSearchParams();

  const { challengeId } = segmentSchema.challengeId.parse(params);
  const { data: challenge, isLoading } = useFetchChallengeById(challengeId);
  const { data: projects, isLoading: isLoadingProject } =
    useFetchChallengeProjects(challengeId);

  if (isLoading || isLoadingProject) return <Loading />;
  if (!challenge || !projects) return null;

  const { tag } = querySchema.parse(Object.fromEntries(sp));
  const projectsFilteredSorted = filterAndSortProject(projects, tag);

  return (
    <div className="container flex flex-wrap gap-10 pt-4">
      <div className="w-full lg:w-[200px] hidden lg:block">
        <ProjectFilter projects={projects} />
      </div>
      <div className="w-full lg:w-auto flex-1">
        {/* search and filter bar  */}
        <div className="flex justify-between py-4">
          <div className="hidden lg:block">
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
              <SearchInput />
            </div>
            <div className="flex lg:hidden justify-between gap-2">
              <button className="btn btn-secondary-invert w-full gap-1">
                <Image
                  src="/icons/filter.svg"
                  height={16}
                  width={16}
                  alt="filter"
                />
                Filter
              </button>
              <button className="btn btn-secondary-invert w-full gap-1">
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
