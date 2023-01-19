'use client';

import { useDialogStore } from '@/components/dialog/store';
import { useNavigator } from '@/hooks/useNavigator';
import { Team } from '@/services/challenge';
import { useAuthStore } from '@/stores/auth';

interface TeamMenuProps {
  team: Team;
}
export default function TeamMenu({ team }: TeamMenuProps) {
  const user = useAuthStore((s) => s.user);
  const isAuthed = useAuthStore((s) => s.isAuthed);
  const navigator = useNavigator();
  const showDialog = useDialogStore((s) => s.open);
  const isJoined = team.teamMembers.some((m) => m.userId === user.userId);
  const isLeader = team.teamMembers
    .filter((m) => m.isLeader)
    .some((m) => m.userId === user.userId);

  const requestJoin = () => {
    if (!isAuthed()) {
      navigator.goToConnectWallet();
      return;
    }
    showDialog('team_join', team);
  };
  const manageMembers = () => {
    showDialog('team_manage_member', team);
  };
  const editTeam = () => {
    showDialog('team_create', { team });
  };
  return (
    <div>
      {!isAuthed() || !isJoined ? (
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
          <button className="btn btn-secondary" onClick={editTeam}>
            Edit
          </button>
        </div>
      ) : (
        <div>
          <button className="btn btn-danger">Quit</button>
        </div>
      )}
    </div>
  );
}
