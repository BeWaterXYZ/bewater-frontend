import { Avatar } from '@/components/avatar';
import { TagRole } from '@/components/tag';
import { TeamMember } from '@/services/challenge';

interface TeamMemberProps {
  member: TeamMember;
}
export function TeamMember({ member }: TeamMemberProps) {
  return (
    <div className="flex gap-3">
      <div>
        <Avatar
          size="medium"
          src={member.userProfile.avatarURI}
          walletAddress={member.userProfile.walletAddress}
        />
      </div>
      <div>
        <p className="body-3 font-bold">
          {member.userProfile.fullName ?? member.userProfile.userName}
        </p>
        <div>
          <TagRole label={member.teamRole} />
        </div>
      </div>
    </div>
  );
}
