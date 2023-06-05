import { useEffect } from 'react';

import { useAuthStore } from '@/stores/auth';
import { useNavigator } from './useNavigator';
import { useLoadingStoreAction } from '@/components/loading/store';

export function useRequireAuthed(lng: string) {
  const isAuthedFunc = useAuthStore((s) => s.isAuthed);

  const isAuthed = isAuthedFunc();
  const { dismissLoading } = useLoadingStoreAction();
  const router = useNavigator(lng);

  useEffect(() => {
    if (!isAuthed) {
      dismissLoading();
      router.goToConnectWallet();
    }
    // eslint-disable-next-line
  }, []);

  return isAuthed;
}
