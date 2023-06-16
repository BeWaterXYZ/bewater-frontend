import { useQuery } from '@tanstack/react-query';
import { getChallengeById } from './challenge';
import { ChallengeID } from './types';

export function useFetchChallengeById(challengeId: ChallengeID) {
  return useQuery({
    queryKey: ['campaigns', challengeId],
    queryFn: async () => {
      return getChallengeById(challengeId);
    },
  });
}
