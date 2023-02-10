import { Aspect } from '@/components/aspect';
import { TagRole, TagSkill } from '@/components/tag';
import { TagProjectTag } from '@/components/tag/project-tag';
import { getChallengeTeams, getTeam } from '@/services/team';
import { unsplash } from '@/utils/unsplash';
import dynamicLoad from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { segmentSchema } from '../../param-schema';

export default async function Page({ params }: any) {
  const { challengeId } = segmentSchema.challengeId.parse(params);
  const { projectId } = segmentSchema.projectId.parse(params);

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
          <p className="heading-6">Yet another Layer 2 Idea</p>
          <p className="body-3 text-grey-500 my-3">Dream team</p>
          <p className="body-3 text-grey-300 my-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
            mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
            fringilla, mattis ligula test liquid consectetur, ultrices mauris.
            Maecenas vitae mattis tellus.
          </p>
          <div>
            <TagProjectTag label="Account Abstraction" />
            <TagProjectTag label="Data/Analytics" />
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
