'use client';
import { useDialogStore } from '@/components/dialog/store';
import { useNavigator } from '@/hooks/useNavigator';
import { Challenge } from '@/services/types';
import { useToastStore } from '@/components/toast/store';
import { useClerk } from '@clerk/nextjs';

export function CreateTeamButton({
  challenge,
  lng,
}: {
  challenge: Challenge;
  lng: string;
}) {
  const showDialog = useDialogStore((s) => s.open);
  const navigator = useNavigator(lng);
  const addToast = useToastStore((s) => s.add);

  const clerk = useClerk();
  const onClick = () => {
    if (!clerk.user) {
      // navigator.goToConnectWallet();
      clerk.redirectToSignIn();
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
