import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTeam, dismissTeam, getChallengeTeams, updateTeam } from './team';
import { ChallengeID } from './types';

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
      if (data?.team?.challengeId) {
        queryClient.invalidateQueries(['challenges', data.team.challengeId]);
      }
    },
  });
}

export function useMutationUpdateTeam() {
  const queryClient = useQueryClient();
  return useMutation(updateTeam, {
    onSuccess: (data, variables, context) => {
      if (data.challengeId) {
        queryClient.invalidateQueries(['challenges', data.challengeId]);
      }
      if (data.project.id) {
        queryClient.invalidateQueries(['project', data.project.id]);
      }
    },
  });
}
export function useMutaionDismissTeam(challengeId?: ChallengeID) {
  const queryClient = useQueryClient();
  return useMutation(dismissTeam, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['challenges', challengeId]);
    },
  });
}
