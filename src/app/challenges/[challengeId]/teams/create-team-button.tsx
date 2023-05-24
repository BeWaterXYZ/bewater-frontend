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
  const baoMingEndTime = '2023-05-25T10:00:00.000Z'; // 北京时间18点

  const [buttonCando, setbuttonCando] = useState(
    new Date(baoMingEndTime) > new Date(),
  );

  const onClick = () => {
    if (new Date(baoMingEndTime) < new Date()) {
      setbuttonCando(false);
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
      disabled={buttonCando ? false : true}
      onClick={onClick}
    >
      Create a team
    </button>
  );
}
