'use client';

import { useDialogStore } from '@/components/dialog/store';
import { Team } from '@/services/challenge';
import { useAuthStore } from '@/stores/auth';

interface TeamMenuProps {
  team: Team;
}
export default function TeamMenu({ team }: TeamMenuProps) {
  const user = useAuthStore((s) => s.user);
  const showDialog = useDialogStore((s) => s.open);
  const isJoined = team.teamMembers.some((m) => m.userId === user.userId);
  const isLeader = team.teamMembers
    .filter((m) => m.isLeader)
    .some((m) => m.userId === user.userId);

  const requestJoin = () => {
    showDialog('team_join', team);
  };
  const manageMembers = () => {
    showDialog('team_manage_member', team);
  };

  return (
    <div>
      {!isJoined ? (
        <div>
          <button className="btn btn-primary" onClick={requestJoin}>
            Request to join
          </button>
        </div>
      ) : isLeader ? (
        <div className="flex gap-2">
          <button className="btn btn-secondary" onClick={manageMembers}>
            Manage Members
          </button>
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
