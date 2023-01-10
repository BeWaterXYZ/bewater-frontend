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
    <Link href={`/challenges/${challenge.id}/teams/${team.id}`}>
      <div className=" border border-gray-400/20  text-left bg-[#0B0C24] rounded ">
        <div className="bg-[#1A1C40] p-4">
          <div className="">
            <div className="body-2 font-bold">
              {team.name}

              {team.tags.map((tag) => (
                <span
                  key={tag}
                  className="mono-4 border rounded p-[1px] m-1 opacity-80 uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="body-2 text-grey"> {team.name}</div>
        </div>

        <div className="p-4 flex justify-between items-end">
          <div>
            <div className="flex gap-1">
              {team.skills.map((skill) => (
                <TagSkill label={skill} key={skill}></TagSkill>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {team.openingRoles.map((role) => (
                <TagRole label={role} key={role}></TagRole>
              ))}
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
