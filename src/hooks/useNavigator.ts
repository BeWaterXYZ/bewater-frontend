import { useCallback } from 'react';

import { isBrowser } from '@/constants';

import useQueryAwareRouter from './useQueryAwareRouter';
import { ChallengeID, TeamID } from '@/services/types';

export function useNavigator(lng: string) {
  const router = useQueryAwareRouter();

  const goToUserProfile = useCallback(() => {
    router.push(`/${lng}/profile`);
  }, [router, lng]);

  const goToUserSettings = useCallback(() => {
    router.push(`/${lng}/settings/basic`);
  }, [router, lng]);

  const goToConnectWallet = useCallback(() => {
    router.pushWithRedirect(`/${lng}/connect`);
  }, [router, lng]);

  const goToWelcome = useCallback(() => {
    router.push(`/${lng}/onboarding`);
  }, [router, lng]);

  const goToExternal = useCallback((url: string) => {
    isBrowser && window.open(url);
  }, []);

  const gotoOnboardingExtra = useCallback(() => {
    router.push(`/${lng}/onboarding/extra`);
  }, [router, lng]);

  const gotoAfterConnect = useCallback(() => {
    router.gotoRedirectWithFallback(`/${lng}/settings/basic`);
  }, [router, lng]);

  const refresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const gotoTeam = useCallback(
    (challengeId: ChallengeID, teamId: TeamID) => {
      router.push(`/${lng}/campaigns/${challengeId}/teams/${teamId}`);
    },
    [router, lng],
  );

  const gotoTeamList = useCallback(
    (challengeId: ChallengeID) => {
      router.push(`/${lng}/campaigns/${challengeId}/teams`);
    },
    [router, lng],
  );

  return {
    goToExternal,
    goToUserProfile,
    goToUserSettings,
    goToConnectWallet,
    goToWelcome,
    gotoAfterConnect,
    gotoOnboardingExtra,
    refresh,
    gotoTeam,
    gotoTeamList,
  };
}
