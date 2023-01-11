'use client';

import { Team } from '@/services/challenge';
import { useAuthStore } from '@/stores/auth';

interface TeamMenuProps {
  team: Team;
}
export default function TeamMenu({ team }: TeamMenuProps) {
  const user = useAuthStore((s) => s.user);
  const isJoined = team.teamMembers.some((m) => m.userId === user.userId);
  const isLeader = team.teamMembers
    .filter((m) => m.isLeader)
    .some((m) => m.userId === user.userId);

  return (
    <div>
      {!isJoined ? (
        <div>
          <button className="btn btn-primary">Request to join</button>
        </div>
      ) : isLeader ? (
        <div className="flex gap-2">
          <button className="btn btn-secondary">Invite</button>
          <button className="btn btn-secondary">Edit</button>
        </div>
      ) : (
        <div>
          <button className="btn btn-danger">Quit</button>
        </div>
      )}
    </div>
  );
}
