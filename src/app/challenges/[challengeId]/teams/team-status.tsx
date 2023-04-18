'use client';

import { Team } from '@/services/types';
import { useAuthStore } from '@/stores/auth';
import Image from 'next/image';

export let TeamStatus = ({ team }: { team: Team }) => {
  const isAuthed = useAuthStore((s) => s.isAuthed);
  const user = useAuthStore((s) => s.user);
  const isMyTeam = team.teamMembers.some((m) => m.userId === user?.userId);

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
  return <button className="btn btn-secondary w-28">JOIN</button>;
};
