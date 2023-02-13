import Link from 'next/link';
import { TeamMember } from '@/services/types';
import { Avatar } from '@/components/avatar/avatar';
import { TagRole } from '@/components/tag';

export function TeamMember({ member }: { member: TeamMember }) {
  return (
    <Link href={`/user/${member.userProfile.userId}`}>
      <div className="flex gap-2">
        <div>
          <Avatar
            className="w-12 h-12"
            src={member.userProfile.avatarURI}
            walletAddress={member.userProfile.walletAddress}
          />
        </div>
        <div className="flex items-start flex-col ">
          <p className="body-3 font-bold">
            {member.userProfile.fullName ?? member.userProfile.userName}
          </p>
          <p>
            <TagRole label={member.teamRole} />
          </p>
        </div>
      </div>
    </Link>
  );
}
