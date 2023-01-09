'use client';

import { useDialogStore } from '@/components/dialog/store';
import { useNavigator } from '@/hooks/useNavigator';
import { useAuthStore } from '@/stores/auth';
import { MouseEventHandler } from 'react';

export let JoinButton = () => {
  const isAuthed = useAuthStore((s) => s.isAuthed);
  const navigator = useNavigator();
  const openDialog = useDialogStore((s) => s.open);
  let handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isAuthed()) {
      navigator.goToConnectWallet();
      return;
    }
    openDialog('team_join', { teamId: '123' });
  };

  return (
    <button className="btn btn-secondary w-28" onClick={handleClick}>
      JOIN
    </button>
  );
};
