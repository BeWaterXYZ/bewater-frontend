import { TagRole } from '@/components/tag';
import { getChallengeTeams, getTeam } from '@/services/challenge';
import Link from 'next/link';
import { TeamMember } from './team-member';
import Image from 'next/image';
import { challengeSchema, challengeTeamSchema } from '../../param-schema';
import dynamic from 'next/dynamic';

const TeamMenu = dynamic(() => import('./team-menu'), {
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
          className="body-3 text-cadet"
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
      <div className="border border-gray-700 rounded bg-white/5 p-4 flex gap-4 my-4 justify-center mb-8">
        <div>
          <Image
            src="/challenge/wanted.svg"
            alt="Picture of the author"
            width={80}
            height={80}
          />
        </div>
        <div className="flex-1 flex flex-col justify-around">
          <p className="body-3"> we still need</p>
          <div className="flex gap-2 flex-wrap">
            {team.openingRoles.map((role) => (
              <TagRole label={role} key={role}></TagRole>
            ))}
          </div>
        </div>
      </div>
      <div className="mb-8">
        <div className="mb-4">
          <p className="body-3 text-grey font-bold my-4"> Team Leader</p>

          <div className="flex my-4">
            {leaders.map((member) => (
              <TeamMember key={member.id} member={member} />
            ))}
          </div>
        </div>

        <div>
          <p className="body-3 text-grey font-bold my-4"> Members</p>
          <div className="flex my-4 gap-3 flex-wrap">
            {members.map((member) => (
              <TeamMember key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>

      <div className="mb-16">
        <p className="body-3 text-grey font-bold "> Project Overview</p>
        <h3 className="body-2 font-bold py-3">Yet another Layer 2 Idea</h3>
        <p className="body-4 opacity-70">{team.description}</p>
      </div>
    </div>
  );
}
export async function generateStaticParams({ params }: any) {
  const { challengeId } = challengeSchema.parse(params);
  const teams = await getChallengeTeams(challengeId);
  return teams.map((t) => ({
    teamId: t.id.toString(),
  }));
}
