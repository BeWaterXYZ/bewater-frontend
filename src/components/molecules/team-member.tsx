'use client';
import Link from 'next/link';
import { TeamMember } from '@/services/types';
import { Avatar } from '@/components/avatar/avatar';
import { TagRole } from '@/components/tag';

export function TeamMember({
  member,
  lng,
}: {
  member: TeamMember;
  lng: string;
}) {
  return (
    <Link href={`/${lng}/user/${member.userProfile.id}`}>
      <div className="flex gap-2 my-4">
        <div>
          <Avatar
            className="w-12 h-12"
            src={member.userProfile.avatarURI}
          />
        </div>
        <div className="flex items-start flex-col ">
          <p className="body-3 font-bold mb-0.5">
            {member.userProfile.userName ?? member.userProfile.fullName}
          </p>
          <div>
            <TagRole label={member.teamRole} />
          </div>
        </div>
      </div>
    </Link>
  );
}
