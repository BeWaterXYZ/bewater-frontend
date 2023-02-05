import { TagRole, TagSkill } from '@/components/tag';
import { getChallengeTeams, getTeam } from '@/services/team';
import dynamicLoad from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { challengeSchema, challengeTeamSchema } from '../../param-schema';
import { TeamMember } from './team-member';

const TeamMenu = dynamicLoad(() => import('./team-menu'), {
  ssr: false,
});

export default async function Page({ params }: any) {
  const { challengeId, teamId } = challengeTeamSchema.parse(params);
  const team = await getTeam(teamId);
  const leaders = team.teamMembers.filter((m) => m.isLeader);
  const members = team.teamMembers.filter((m) => !m.isLeader);

  return (
    <div>
      <div className="my-4">
        <Link
          className="body-3 text-gray-400"
          href={`/challenges/${challengeId}/teams`}
        >
          {'< Team List'}
        </Link>
      </div>

      <div className="flex justify-between">
        <div className="heading-6 mb-4">{team.name}</div>

        <div>
          <TeamMenu team={team} />
        </div>
      </div>
      <div className="border border-[#24254E] rounded bg-[#0B0C24] p-4 flex gap-4 my-4 justify-center mb-8">
        <div>
          <Image
            src="/challenge/wanted.svg"
            alt="Picture of the author"
            width={80}
            height={80}
          />
        </div>
        <div className="flex-1 flex flex-col justify-around">
          <p className="body-3"> We still Need...</p>
          <div className="flex gap-2 flex-wrap">
            {team.openingRoles.map((role) => (
              <TagRole label={role} key={role} />
            ))}
            {team.skills.map((skill) => (
              <TagSkill label={skill} key={skill} />
            ))}
          </div>
        </div>
      </div>
      <div className="mb-8">
        <div className="mb-8">
          <p className="body-3 text-gray-500 font-bold my-4"> Team Leader</p>

          <div className="flex my-4">
            {leaders.map((member) => (
              <TeamMember key={member.id} member={member} />
            ))}
          </div>
        </div>

        <div>
          <p className="body-3 text-gray-500 font-bold my-4"> Members</p>
          <div className="flex my-4 gap-3 flex-wrap">
            {members.map((member) => (
              <TeamMember key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>

      <div className="mb-16">
        <p className="body-3 text-gray-500 font-bold"> Project Overview</p>
        <div className="flex items-center py-2">
          <h2 className="body-2 font-bold mr-2">{team.project.name} </h2>
          {team.project.tags.map((tag) => (
            <span
              key={tag}
              className="mono-4 border rounded p-[1px] m-1 uppercase px-1 text-gray-300 border-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="body-4 text-gray-300">{team.project.description}</p>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
