import { useEffect } from 'react';

import { useAuthStore } from '@/stores/auth';
import { useNavigator } from './useNavigator';
import { useLoadingStoreAction } from '@/components/loading/store';

export function useRequireAuthed() {
  const isAuthedFunc = useAuthStore((s) => s.isAuthed);

  const isAuthed = isAuthedFunc();
  const { dismissLoading } = useLoadingStoreAction();
  const router = useNavigator();

  useEffect(() => {
    if (!isAuthed) {
      dismissLoading();
      router.goToConnectWallet();
    }
  }, [isAuthed, router]);

  return isAuthed;
}
