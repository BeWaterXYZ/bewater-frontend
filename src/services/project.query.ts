import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getChallengeTProjects,
  getGitHubRepos,
  getProject,
  updateProject,
} from './project';
import { ChallengeID, ProjectId, TeamID } from './types';

export function useFetchChallengeProjects(challengeId: ChallengeID) {
  return useQuery({
    queryKey: ['challenges', challengeId, 'projects'],
    queryFn: async () => {
      return getChallengeTProjects(challengeId);
    },
  });
}

export function useFetchProject(projectId: ProjectId) {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      return getProject(projectId);
    },
  });
}

export function useFetchProjectGitHubRepos(teamId: TeamID) {
  return useQuery({
    queryKey: ['project', 'repos', teamId],
    queryFn: async () => {
      return getGitHubRepos(teamId);
    },
  });
}

export function useMutationUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation(updateProject, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['project', data.id]);
    },
  });
}
