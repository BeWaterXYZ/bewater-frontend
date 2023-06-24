import { Avatar } from '@/components/avatar/avatar';
import { TeamMember } from '@/services/types';
import Link from 'next/link';

export function TeamAvatarRow({
  teamMembers,
  lng,
}: {
  teamMembers: TeamMember[];
  lng: string;
}) {
  return (
    <div className="flex ">
      {teamMembers.map((m, index) => {
        return (
          <Link
            prefetch={false}
            href={`/${lng}/user/${m.userProfile.externalId}`}
            key={m.userProfile.externalId}
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
