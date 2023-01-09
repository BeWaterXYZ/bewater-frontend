import { Avatar } from '@/components/avatar';
import { TagRole, TagSkill } from '@/components/tag';
import Link from 'next/link';
import { paramSchema } from './param-schema';

export default function Page({ params }: any) {
  const { challengeId, teamId } = paramSchema.parse(params);
  return (
    <div>
      <div className="my-4">
        <Link
          className="body-3 text-cadet"
          href={`/challenges/${challengeId}/teams`}
        >
          {'< Team List'}
        </Link>
      </div>

      <div className="flex justify-between">
        <div className="heading-6">team name</div>

        <div>
          <button className="btn btn-primary">Request to join</button>
        </div>
      </div>
      <div className="border border-gray-700 rounded bg-white/5 p-4 flex gap-4 my-4">
        <div>logo</div>
        <div className="flex-1">
          <p className="body-3"> we still need</p>
          <div className="flex gap-2 flex-wrap">
            <TagRole label="fe" />
            <TagRole label="be" />
            <TagRole label="bc" />
            <TagSkill label="react" />
          </div>
        </div>
      </div>
      <div>
        <p className="body-3 text-grey font-bold"> Team Leader</p>

        <div className="flex my-4">
          <Avatar size="small" />
        </div>
      </div>

      <div>
        <p className="body-3 text-grey font-bold"> Members</p>
        <div className="flex my-4">
          <Avatar size="small" />
        </div>
      </div>

      <div>
        <p className="body-3 text-grey font-bold"> Project Overview</p>

        <h3 className="body-2 font-bold py-3">Yet another Layer 2 Idea</h3>
        <p className="body-4 opacity-70">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
          mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
          mattis ligula test liquid consectetur, ultrices mauris. Maecenas vitae
          mattis tellus.
        </p>
      </div>
    </div>
  );
}
