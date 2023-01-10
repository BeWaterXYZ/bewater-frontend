import { useCallback } from 'react';

import { isBrowser } from '@/constants';

import useQueryAwareRouter from './useQueryAwareRouter';

export function useNavigator() {
  const router = useQueryAwareRouter();
  const goToUserProfile = useCallback(() => {
    router.push('/user/profile');
  }, [router]);

  const goToUserSettings = useCallback(() => {
    router.push('/user/settings');
  }, [router]);

  const goToConnectWallet = useCallback(() => {
    router.pushWithRedirect('/connect');
  }, [router]);

  const goToWelcome = useCallback(() => {
    router.push('/user/onboarding');
  }, [router]);

  const goToExternal = useCallback((url: string) => {
    isBrowser && window.open(url);
  }, []);

  const gotoAfterConnect = useCallback(() => {
    router.gotoRedirect('/user/settings');
  }, [router]);

  return {
    goToExternal,
    goToUserProfile,
    goToUserSettings,
    goToConnectWallet,
    goToWelcome,
    gotoAfterConnect,
  };
}
