import { Avatar } from '@/components/avatar';
import { TagRole, TagSkill } from '@/components/tag';
import { Challenge, Team } from '@/services/challenge';
import Link from 'next/link';
import { TeamStatus } from './team-status';

interface TeamItemProps {
  challenge: Challenge;
  team: Team;
}
export function TeamItem({ challenge, team }: TeamItemProps) {
  return (
    <Link href={`/challenges/${challenge.id}/teams/${team.id}`}>
      <div className=" border border-gray-400/20  text-left bg-[#0B0C24] rounded h-full flex flex-col ">
        <div className="bg-[#1A1C40] p-4">
          <div className="">
            <div className="flex items-center ">
              <h2 className="body-2 font-bold">{team.project.name}</h2>

              {team.project.tags.map((tag) => (
                <span
                  key={tag}
                  className="mono-4 border rounded p-[1px] m-1 opacity-80 uppercase px-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="body-2 text-grey"> {team.name}</div>
        </div>
        <div className="flex flex-col p-4 h-full">
          <div className="flex gap-1 flex-wrap flex-1 pb-4">
            {team.skills.map((skill) => (
              <TagSkill label={skill} key={skill}></TagSkill>
            ))}
          </div>
          <div className="flex justify-between items-end">
            <div>
              <div className="float-left">
                <div className="flex gap-2 rounded border border-[#333568] p-1 px-2 ">
                  {team.openingRoles.map((role) => (
                    <TagRole label={role} key={role} simple></TagRole>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <TeamStatus team={team} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
