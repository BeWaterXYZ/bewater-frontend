import { useCallback } from 'react';

import { isBrowser } from '@/constants';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export function useNavigator() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const goToUserProfile = useCallback(() => {
    isBrowser && void router.push('/user/profile');
  }, [router]);

  const goToUserSettings = useCallback(() => {
    isBrowser && void router.push('/user/settings');
  }, [router]);

  const goToConnectWallet = useCallback(() => {
    void router.push(
      '/connect' + '?redirect=' + encodeURIComponent(pathname ?? ''),
      {},
    );
  }, [router, pathname]);

  const goToWelcome = useCallback(() => {
    isBrowser &&
      void router.push('/user/onboarding?' + searchParams.toString());
  }, [router]);

  const goToExternal = useCallback((url: string) => {
    isBrowser && window.open(url);
  }, []);

  const gotoAfterConnect = useCallback(() => {
    let goto = searchParams.get('redirect') ?? '/user/settings';
    router.push(goto);
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
