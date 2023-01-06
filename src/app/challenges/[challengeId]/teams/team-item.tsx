import { Avatar } from '@/components/avatar';
import { TagRole, TagSkill } from '@/components/tag';
import { JoinButton } from './join-button';

export function TeamItem() {
  return (
    <div className="flex flex-col md:grid grid-cols-[1fr,_2fr,_3fr,_1fr] text-left border border-gray-400/20 p-4 my-4  bg-white/5">
      <div>
        <div className="body-2">Dream Team</div>
        <Avatar size="small" />
      </div>

      <div>
        <div className="body-2">Yet another Layer 2 Idea</div>
        <div>
          <span className="mono-4 border rounded p-[1px] m-1 opacity-80">
            ETHERUM
          </span>
          <span className="mono-4 border rounded p-[1px] m-1 opacity-80">
            LAYER2
          </span>
        </div>
      </div>
      <div>
        <div className="flex flex-wrap gap-1">
          <TagRole label="designer" />
          <TagRole label="fe" />
        </div>

        <div className="flex gap-1">
          <TagSkill label="react"></TagSkill>
          <TagSkill label="typescript"></TagSkill>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <JoinButton />
      </div>
    </div>
  );
}
