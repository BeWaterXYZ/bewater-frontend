import { useCallback } from 'react';

import { isBrowser } from '@/constants';

import useQueryAwareRouter from './useQueryAwareRouter';
import { ChallengeID, TeamID } from '@/services/types';

export function useNavigator() {
  const router = useQueryAwareRouter();
  const goToUserProfile = useCallback(() => {
    router.push('/profile');
  }, [router]);

  const goToUserSettings = useCallback(() => {
    router.push('/settings/basic');
  }, [router]);

  const goToConnectWallet = useCallback(() => {
    router.pushWithRedirect('/connect');
  }, [router]);

  const goToWelcome = useCallback(() => {
    router.push('/onboarding');
  }, [router]);

  const goToExternal = useCallback((url: string) => {
    isBrowser && window.open(url);
  }, []);
  const gotoOnboardingExtra = useCallback(() => {
    router.push('/onboarding/extra');
  }, [router]);
  const gotoAfterConnect = useCallback(() => {
    router.gotoRedirectWithFallback('/settings/basic');
  }, [router]);

  const refresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const gotoTeam = useCallback(
    (challengeId: ChallengeID, teamId: TeamID) => {
      router.push(`/challenges/${challengeId}/teams/${teamId}`);
    },
    [router],
  );
  const gotoTeamList = useCallback(
    (challengeId: ChallengeID) => {
      router.push(`/challenges/${challengeId}/teams`);
    },
    [router],
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
