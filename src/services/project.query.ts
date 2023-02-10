import { useQuery } from '@tanstack/react-query';
import { getChallengeTProjects } from './project';
import { ChallengeID } from './types';

export function useFetchChallengeProjects(challengeId: ChallengeID) {
  return useQuery({
    queryKey: ['challenges', challengeId, 'projects'],
    queryFn: async () => {
      return getChallengeTProjects(challengeId);
    },
  });
}
