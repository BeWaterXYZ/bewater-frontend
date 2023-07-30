import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getChallengeById, getHostChallengeList, updateChallenge } from './challenge';
import { ChallengeID } from './types';

export function useFetchChallengeById(challengeId: ChallengeID) {
  return useQuery({
    queryKey: ['challenges', challengeId],
    queryFn: async () => {
      return getChallengeById(challengeId);
    },
  });
}

export function useFetchChallenges() {
  return useQuery({
    queryKey: ["challenges"],
    queryFn: async () => {
      return getHostChallengeList();
    },
  });
}
// todo, id is mandatory
export function useMutationUpdateChallenge(challengeId: ChallengeID) {
  const queryClient = useQueryClient();
  return useMutation(updateChallenge, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["challenges", challengeId]);
    },
  });
}