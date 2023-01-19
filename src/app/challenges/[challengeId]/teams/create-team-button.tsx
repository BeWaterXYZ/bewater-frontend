'use client';
import { useDialogStore } from '@/components/dialog/store';
import { Challenge } from '@/services/challenge';

export function CreateTeamButton({ challenge }: { challenge: Challenge }) {
  const showDialog = useDialogStore((s) => s.open);
  const onClick = () => {
    showDialog('team_create', { challenge });
  };
  return (
    <button className="btn btn-primary" onClick={onClick}>
      Create a team
    </button>
  );
}
