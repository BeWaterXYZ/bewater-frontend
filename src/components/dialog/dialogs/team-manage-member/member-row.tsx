import { Avatar } from '@/components/avatar/avatar';
import { TeamMember } from '@/services/types';
import { TeamMemberManager } from './member-manager';

export function TeamMemberRow({ member }: { member: TeamMember }) {
  return (
    <div
      key={member.userId}
      className="flex p-2 gap-2 border-b border-b-midnight"
    >
      <Avatar
        className="w-10 h-10"
        walletAddress={member.userProfile.walletAddress}
        src={member.userProfile.avatarURI}
      />
      <div className="flex flex-col justify-between">
        <p className="body-4 text-grey-300">
          {member.userProfile.fullName ?? member.userProfile.userName}
        </p>
        <p className="mono-4 text-grey-500">@{member.userProfile.userName}</p>
      </div>
      <div className="flex-1" />
      <div className="flex items-center">
        <TeamMemberManager member={member} />
      </div>
    </div>
  );
}
