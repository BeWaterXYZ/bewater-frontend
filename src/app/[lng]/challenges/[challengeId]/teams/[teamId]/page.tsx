import { TeamMember } from '@/components/molecules/team-member';
import { TagRole, TagSkill } from '@/components/tag';
import { TagProjectTag } from '@/components/tag/project-tag';
import { getChallengeTeams, getTeam } from '@/services/team';
import { Metadata } from 'next';
import dynamicLoad from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { segmentSchema } from '../../param-schema';

const TeamMenu = dynamicLoad(() => import('./team-menu'), {
  ssr: false,
});

export default async function Page({ params }: any) {
  const { challengeId } = segmentSchema.challengeId.parse(params);
  const { teamId } = segmentSchema.teamId.parse(params);
  const team = await getTeam(teamId);
  const leaders = team.teamMembers.filter((m) => m.isLeader);
  const members = team.teamMembers.filter((m) => !m.isLeader);
  const { lng } = segmentSchema.lng.parse(params);

  return (
    <div className="container">
      <div className="mt-10 mb-[22px]">
        <Link
          prefetch={false}
          className="body-3 text-grey-400"
          href={`/${lng}/challenges/${challengeId}/teams`}
        >
          {'< Team List'}
        </Link>
      </div>

      <div className="flex justify-between flex-col lg:flex-row gap-3 mb-10">
        <div className="heading-6 break-words">{team.name}</div>

        <div>
          <TeamMenu team={team} lng={lng} />
        </div>
      </div>
      {team.openingRoles.length > 0 && (
        <div className="border border-[#24254E] rounded bg-latenight p-4 flex gap-4 mb-10 justify-center">
          <div>
            <Image
              src="/challenge/assets/wanted.svg"
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
      )}
      <div className="mb-10">
        <div className="mb-10">
          <p className="body-3 text-grey-500 font-bold my-5"> Team Leader</p>

          <div className="flex my-4">
            {leaders.map((member) => (
              <TeamMember key={member.id} member={member} />
            ))}
          </div>
        </div>

        <div>
          <p className="body-3 text-grey-500 font-bold my-5"> Members</p>
          {members.length > 0 ? (
            <div className="flex my-4 gap-3 flex-wrap">
              {members.map((member) => (
                <TeamMember key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <div className="rounded border border-[#24254E] bg-latenight mt-5 p-4 my-3 w-min body-2 text-grey-600 whitespace-nowrap">
              No other members yet.
            </div>
          )}
        </div>
      </div>

      <div className="mb-30">
        <p className="body-3 text-grey-500 font-bold my-5"> Project Overview</p>
        <div className="flex justify-between  flex-col lg:flex-row gap-3 mb-3">
          <div className="flex items-center flex-wrap gap-2">
            <h2 className="body-2 font-bold break-words">
              {team.project.name}{' '}
            </h2>
            {team.project.tags.map((tag) => (
              <TagProjectTag key={tag} label={tag} />
            ))}
          </div>
          <Link
            prefetch={false}
            href={`/${lng}/challenges/${challengeId}/projects/${team.project.id}`}
            className="body-3 hidden lg:flex items-center h-7 text-day whitespace-nowrap "
          >
            {'CHECK DETAIL ->'}
          </Link>
        </div>

        <div className="body-4 text-grey-300">
          {team.project.description.split('\n').map((s, i) => (
            <p key={i} className="py-2">
              {s}
            </p>
          ))}
        </div>

        <Link
          prefetch={false}
          href={`/${lng}/challenges/${challengeId}/projects/${team.project.id}`}
          className="body-3 flex lg:hidden mt-3 items-center h-7 text-day whitespace-nowrap "
        >
          {'CHECK DETAIL ->'}
        </Link>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
export async function generateMetadata({ params }: any): Promise<Metadata> {
  try {
    const { teamId } = segmentSchema.teamId.parse(params);
    const team = await getTeam(teamId);
    return {
      title: 'BeWater - ' + team.name,
      description: team.project.description,
    };
  } catch (err) {
    return {};
  }
}
