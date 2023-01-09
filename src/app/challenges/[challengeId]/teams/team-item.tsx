import { Avatar } from '@/components/avatar';
import { TagRole, TagSkill } from '@/components/tag';
import { Challenge, Team } from '@/services/challenge';
import Link from 'next/link';
import { JoinButton } from './join-button';

interface TeamItemProps {
  challenge: Challenge;
  team: Team;
}
export function TeamItem({ challenge, team }: TeamItemProps) {
  return (
    <Link href={`/challenges/${challenge.id}/teams/${team.teamId}`}>
      <div className=" border border-gray-400/20  text-left bg-[#0B0C24] rounded ">
        <div className="bg-[#1A1C40] p-4">
          <div className="">
            <div className="body-2 font-bold">
              Yet another Layer 2 Idea
              <span className="mono-4 border rounded p-[1px] m-1 opacity-80">
                ETHERUM
              </span>
              <span className="mono-4 border rounded p-[1px] m-1 opacity-80">
                LAYER2
              </span>
            </div>
          </div>
          <div className="body-2 text-grey">Dream Team</div>
        </div>

        <div className="p-4 flex justify-between items-end">
          <div>
            <div className="flex gap-1">
              <TagSkill label="react"></TagSkill>
              <TagSkill label="typescript"></TagSkill>
            </div>
            <div className="flex flex-wrap gap-1">
              <TagRole label="designer" />
              <TagRole label="fe" />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <JoinButton />
          </div>
        </div>
      </div>
    </Link>
  );
}
