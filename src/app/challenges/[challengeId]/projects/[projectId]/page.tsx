import { Aspect } from '@/components/aspect';
import { TagRole, TagSkill } from '@/components/tag';
import { TagProjectTag } from '@/components/tag/project-tag';
import { getProject } from '@/services/project';
import { getChallengeTeams, getTeam } from '@/services/team';
import { unsplash } from '@/utils/unsplash';
import dynamicLoad from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { segmentSchema } from '../../param-schema';

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
              src={unsplash('conference')}
              fill
              alt="project"
              className="object-cover"
            />
          </Aspect>
        </div>
        <div className="flex-1">
          <p className="heading-6">{project.name}</p>
          <p className="body-3 text-grey-500 my-3">{project.team.name}</p>
          <p className="body-3 text-grey-300 my-3">{project.description}</p>
          <div>
            {project.tags.map((tag) => (
              <TagProjectTag label={tag} key={tag} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
