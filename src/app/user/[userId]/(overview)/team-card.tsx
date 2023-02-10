import { TeamAvatarRow } from '@/components/molecules/team-avatar-row';
import { TagRole } from '@/components/tag';
import { TeamMember } from '@/services/types';
import Image from 'next/image';
import Link from 'next/link';
export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <Link
      href={`/challenges/${member.team?.challengeId}/teams/${member.teamId}`}
      className=" w-[300px] h-[140px] rounded bg-[#0B0C24] border border-[#24254E] p-4 flex flex-col justify-between"
    >
      <div>
        <div className="pb-2 flex gap-2">
          {member.isLeader ? (
            <Image
              src="/icons/leader.svg"
              height={20}
              width={20}
              alt="leader"
            />
          ) : null}
          <TagRole label={member.teamRole} />
        </div>
        <div className="body-3 text-grey-500">at {member.team?.name}</div>
      </div>
      <div className="flex ">
        <TeamAvatarRow teamMembers={member.team?.teamMembers ?? []} />
      </div>
    </Link>
  );
}
