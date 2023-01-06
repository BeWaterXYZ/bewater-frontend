'use client';
import { useDialogStore } from '@/components/dialog/store';

export function CreateTeamButton() {
  const showDialog = useDialogStore((s) => s.open);
  const onClick = () => {
    showDialog('team_create', true);
  };
  return (
    <button className="btn btn-primary" onClick={onClick}>
      Create a team
    </button>
  );
}
