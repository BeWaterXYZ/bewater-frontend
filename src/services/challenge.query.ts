import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createTeam,
  dismissTeam,
  getChallengeById,
  getChallengeTeams,
} from './challenge';
import { ChallengeID } from './types';

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
export function useMutaionDismissTeam() {
  const queryClient = useQueryClient();
  return useMutation(dismissTeam, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['challenges', data.challengeId]);
    },
  });
}
