import { Aspect } from '@/components/aspect';
import { TeamMember } from '@/components/molecules/team-member';
import { TagProjectTag } from '@/components/tag/project-tag';
import { getProject } from '@/services/project';
import { unsplash } from '@/utils/unsplash';
import { formatDistance, parseISO } from 'date-fns';
import dynamicLoad from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { segmentSchema } from '../../param-schema';

const ProjectMenu = dynamicLoad(() => import('./project-menu'), {
  ssr: false,
});
const ProjectMedia = dynamicLoad(() => import('./project-media'), {
  ssr: false,
});

export default async function Page({ params }: any) {
  const { challengeId } = segmentSchema.challengeId.parse(params);
  const { projectId } = segmentSchema.projectId.parse(params);
  const project = await getProject(projectId);
  return (
    <div className="container">
      <div className="my-4">
        <Link
          className="body-3 text-grey-400"
          href={`/challenges/${challengeId}/projects`}
        >
          {'< Project List'}
        </Link>
      </div>

      <div className="flex gap-10 flex-wrap">
        <div className="w-full lg:w-[400px]">
          <Aspect ratio={3 / 2}>
            <Image
              src={project?.mediaURLs?.[0] ?? unsplash('conference')}
              fill
              alt="project"
              className="object-cover"
            />
          </Aspect>
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <p className="heading-6">{project.name}</p>
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
      <div className="my-4">
        <h3 className="body-3 font-bold text-grey-500">Media</h3>
        <ProjectMedia project={project} />
      </div>

      <div className="my-4">
        <h3 className="body-3 font-bold text-grey-500">Members</h3>
        <div className="my-4">
          {project.team.teamMembers.map((m) => (
            <TeamMember member={m} key={m.userId} />
          ))}
        </div>
        <Link
          className="body-3 text-day uppercase "
          href={`/challenges/${project.team.challengeId}/teams/${project.team.id}`}
        >
          {'CHECK TEAM DETAIL ->'}
        </Link>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
