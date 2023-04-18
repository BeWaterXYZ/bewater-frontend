'use client';
import { useDialogStore } from '@/components/dialog/store';
import { useNavigator } from '@/hooks/useNavigator';
import { Challenge } from '@/services/types';
import { useAuthStore } from '@/stores/auth';

export function CreateTeamButton({ challenge }: { challenge: Challenge }) {
  const showDialog = useDialogStore((s) => s.open);
  const navigator = useNavigator();

  const onClick = () => {
    if (!useAuthStore.getState().token) {
      navigator.goToConnectWallet();
      return;
    }
    showDialog('team_create', { challenge });
  };
  return (
    <button className="btn btn-primary" onClick={onClick}>
      Create a team
    </button>
  );
}
