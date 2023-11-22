import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteRatingJudge,
  getChallengeById,
  getChallengeInvitation,
  getHostChallengeList,
  inviteRatingJudge,
  inviteToChallenge,
  updateChallenge,
} from "./challenge";
import { ChallengeID, UserID } from "./types";

export function useFetchChallengeById(challengeId: ChallengeID) {
  return useQuery({
    queryKey: ["challenges", challengeId],
    queryFn: async () => {
      return getChallengeById(challengeId);
    },
  });
}

export function useFetchChallenges(id?: string) {
  return useQuery({
    queryKey: ["challenges"],
    queryFn: async () => {
      return getHostChallengeList(id);
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

export function useFetchChallengeInvitation(challengeId: ChallengeID) {
  return useQuery({
    queryKey: ["challenges/invitation", challengeId],
    queryFn: async () => {
      return getChallengeInvitation(challengeId);
    },
  });
}

export function useMutationInviteToChallenge(challengeId: ChallengeID) {
  const queryClient = useQueryClient();
  return useMutation(
    (emails: string[]) => inviteToChallenge(challengeId, emails),
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(["challenges/invitation", challengeId]);
      },
    }
  );
}

export function useMutationInviteRatingJudge(challengeId: ChallengeID) {
  const queryClient = useQueryClient();
  return useMutation(
    (userId: UserID) => inviteRatingJudge(challengeId, userId),
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(["challenges", challengeId]);
      },
    }
  );
}

export function useMutationDeleteRatingJudge(challengeId: ChallengeID) {
  const queryClient = useQueryClient();
  return useMutation(
    (userId: UserID) => deleteRatingJudge(challengeId, userId),
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(["challenges", challengeId]);
      },
    }
  );
}