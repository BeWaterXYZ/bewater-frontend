'use client';

import { Team } from '@/services/types';
import { useAuthStore } from '@/stores/auth';
import { useNavigator } from '@/hooks/useNavigator';
import { useDialogStore } from '@/components/dialog/store';
import Image from 'next/image';

export let TeamStatus = ({ team, lng }: { team: Team; lng: string }) => {
  const isAuthed = useAuthStore((s) => s.isAuthed);
  const user = useAuthStore((s) => s.user);
  const showDialog = useDialogStore((s) => s.open);
  const navigator = useNavigator(lng);
  const isMyTeam = team.teamMembers.some((m) => m.userId === user?.userId);
  const requestJoin = () => {
    if (!isAuthed()) {
      navigator.goToConnectWallet();
      return;
    }
    showDialog('team_join', team);
  };

  if (isAuthed() && isMyTeam) {
    return (
      <div className="flex items-center">
        <Image
          src="/challenge/assets/star.svg"
          height={16}
          width={16}
          alt="star"
          className="mx-2"
        />
        <p className="body-2">My Team</p>
      </div>
    );
  }
  return (
    <button className="btn btn-secondary w-28" onClick={requestJoin}>
      JOIN
    </button>
  );
};
