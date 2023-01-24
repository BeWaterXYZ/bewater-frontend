import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ChallengeID,
  createTeam,
  getChallengeById,
  getChallengeTeams,
} from './index';

export function useFetchChallengeById(challengeId: ChallengeID) {
  return useQuery({
    queryKey: ['challenges', challengeId],
    queryFn: async () => {
      return getChallengeById(challengeId);
    },
  });
}
export function useFetchChallengeTeams(challengeId: ChallengeID) {
  return useQuery({
    queryKey: ['challenges', challengeId, 'teams'],
    queryFn: async () => {
      return getChallengeTeams(challengeId);
    },
  });
}

export function useMutaionCreateTeam() {
  const queryClient = useQueryClient();
  return useMutation(createTeam, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['challenges', data.team.challengeId]);
    },
  });
}
