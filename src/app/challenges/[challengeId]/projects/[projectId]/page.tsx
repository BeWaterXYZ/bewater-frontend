'use client';
import { Aspect } from '@/components/aspect';
import { useLoadingStoreAction } from '@/components/loading/store';
import { TeamMember } from '@/components/molecules/team-member';
import { TagProjectTag } from '@/components/tag/project-tag';
import { getProject } from '@/services/project';
import { useFetchProject } from '@/services/project.query';
import { unsplash } from '@/utils/unsplash';
import { formatDistance, parseISO } from 'date-fns';
import dynamicLoad from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { segmentSchema } from '../../param-schema';
import { ProjectAssets } from './project-assets';
import { useLoadingWhen } from '@/components/loading/store';
import { GithubStats } from './project-github';

const ProjectMenu = dynamicLoad(() => import('./project-menu'), {
  ssr: false,
});
const ProjectMedia = dynamicLoad(() => import('./project-media'), {
  ssr: false,
});

export default function Page({ params }: any) {
  const { challengeId } = segmentSchema.challengeId.parse(params);
  const { projectId } = segmentSchema.projectId.parse(params);
  const { data: project, isLoading } = useFetchProject(projectId);
  useLoadingWhen(isLoading);

  if (!project) return null;

  return (
    <div className="container">
      <div className="my-10">
        <Link
          prefetch={false}
          className="body-3 text-grey-400"
          href={`/challenges/${challengeId}/projects`}
        >
          {'< Project List'}
        </Link>
      </div>

      <div className="flex flex-wrap rounded border border-[#24254E]">
        <div className="w-full lg:w-[400px]">
          <Aspect ratio={3 / 2}>
            <Image
              width={450}
              height={300}
              src={project?.mediaURLs?.[0] ?? unsplash('conference')}
              alt="project"
              className="object-cover block w-full h-full"
            />
          </Aspect>
        </div>
        <div className="flex-1 p-7">
          <div className="flex justify-between ">
            <p className="heading-6 ">{project.name}</p>
            <ProjectMenu project={project} />
          </div>
          <p className="body-3 text-grey-500 my-3">
            {project.team.name} · Updated{' '}
            {formatDistance(parseISO(project.updatedAt), Date.now())}
          </p>

          <p className="body-3 text-grey-300 my-3">{project.description}</p>
          <div>
            {project.tags.map((tag) => (
              <TagProjectTag label={tag} key={tag} />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h3 className="body-3 font-bold text-grey-500">Media</h3>
        <ProjectMedia project={project} />
      </div>

      <div className="flex flex-col lg:flex-row gap-10 mb-30">
        <div className="flex-[2] lg:max-w-[400px]">
          <ProjectAssets project={project} />
          {/* members */}
          <div className="">
            <h3 className="body-3 font-bold text-grey-500">Members</h3>
            <div className="my-5">
              {project.team.teamMembers.map((m) => (
                <TeamMember member={m} key={m.userProfile.userId} />
              ))}
            </div>
            <Link
              prefetch={false}
              className="body-3 text-day uppercase "
              href={`/challenges/${project.team.challengeId}/teams/${project.team.id}`}
            >
              {'CHECK TEAM DETAIL ->'}
            </Link>
          </div>
        </div>
        <div className="flex-[3]">
          <GithubStats project={project} />
        </div>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
