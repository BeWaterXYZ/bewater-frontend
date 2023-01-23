'use client';

import { useDialogStore } from '@/components/dialog/store';
import { useNavigator } from '@/hooks/useNavigator';
import { Team } from '@/services/challenge';
import { useAuthStore } from '@/stores/auth';
import Image from 'next/image';
import { MouseEventHandler } from 'react';

export let TeamStatus = ({ team }: { team: Team }) => {
  const isAuthed = useAuthStore((s) => s.isAuthed);
  const user = useAuthStore((s) => s.user);
  const navigator = useNavigator();
  const openDialog = useDialogStore((s) => s.open);
  const isMyTeam = team.teamMembers.some((m) => m.userId === user.userId);

  let handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    // e.stopPropagation();
    // e.preventDefault();
    // if (!isAuthed()) {
    //   navigator.goToConnectWallet();
    //   return;
    // }
    // openDialog('team_join', { teamId: '123' });
  };

  if (isAuthed() && isMyTeam) {
    return (
      <div className="flex items-center">
        <Image
          src="/challenge/star.svg"
          height={16}
          width={16}
          alt="star"
          className="mx-1"
        />
        <p className="body-2">My Team</p>
      </div>
    );
  }
  return (
    <button className="btn btn-secondary w-28" onClick={handleClick}>
      JOIN
    </button>
  );
};
