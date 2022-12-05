import { useCallback } from 'react';

import { isBrowser } from '@/constants';

import useQueryAwareRouter from './useQueryAwareRouter';

export default function useNavigator() {
  const router = useQueryAwareRouter();

  const goToUserProfile = useCallback(() => {
    isBrowser && void router.push('/user/profile');
  }, [router]);

  const goToUserSettings = useCallback(() => {
    isBrowser && void router.push('/user/settings');
  }, [router]);

  const goToConnectWallet = useCallback(() => {
    isBrowser && void router.push('/connect');
  }, [router]);

  const goToWelcome = useCallback(() => {
    isBrowser && void router.push('/user/onboarding');
  }, [router]);

  const goToExternal = useCallback((url: string) => {
    isBrowser && window.open(url);
  }, []);

  return {
    goToExternal,
    goToUserProfile,
    goToUserSettings,
    goToConnectWallet,
    goToWelcome,
  };
}
