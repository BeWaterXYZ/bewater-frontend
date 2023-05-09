import { Avatar } from '@/components/avatar/avatar';
import { TeamMember } from '@/services/types';
import Link from 'next/link';

export function TeamAvatarRow({ teamMembers }: { teamMembers: TeamMember[] }) {
  return (
    <div className="flex ">
      {teamMembers.map((m, index) => {
        return (
          <Link
            prefetch={false}
            href={`/user/${m.userProfile.userId}`}
            key={m.userProfile.userId}
          >
            <div key={m.id} className="relative" style={{ left: -8 * index }}>
              <Avatar
                src={m.userProfile.avatarURI}
                walletAddress={m.userProfile.walletAddress}
                className="w-8 h-8"
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
