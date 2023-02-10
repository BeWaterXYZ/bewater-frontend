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
        <div>asdasd</div>
        <div className="grid gap-4 grid-cols-300">
          {projectsFilteredSorted.map((project) => {
            return <ProjectItem key={project.id} project={project} />;
          })}
        </div>
      </div>
    </div>
  );
}
