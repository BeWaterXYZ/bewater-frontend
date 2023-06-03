'use client';
import { useDialogStore } from '@/components/dialog/store';
import { useNavigator } from '@/hooks/useNavigator';
import { Challenge } from '@/services/types';
import { useAuthStore } from '@/stores/auth';
import { useToastStore } from '@/components/toast/store';
import { useState } from 'react';

export function CreateTeamButton({ challenge }: { challenge: Challenge }) {
  const showDialog = useDialogStore((s) => s.open);
  const navigator = useNavigator();
  const addToast = useToastStore((s) => s.add);
  let baoMingEndTime = ''; // 北京时间 2023-06-25T10:00:00.000Z

  for (const it of challenge.milestones) {
    if (it.stageName === 'Review') {
      baoMingEndTime = it.dueDate;
    }
  }

  baoMingEndTime = `${baoMingEndTime}T10:00:00.000Z`;

  const [buttonCando, setButtonCando] = useState(
    new Date(baoMingEndTime) > new Date(),
  );

  const onClick = () => {
    if (new Date(baoMingEndTime) < new Date()) {
      setButtonCando(false);
      addToast({
        type: 'warning',
        title: '报名时间已截止，请关注我们之后的赛事',
      });
      return;
    }

    if (!useAuthStore.getState().token) {
      navigator.goToConnectWallet();
      return;
    }
    showDialog('team_create', { challenge });
  };

  return (
    <button
      className="btn btn-primary"
      disabled={!buttonCando}
      onClick={onClick}
    >
      Create a team
    </button>
  );
}
