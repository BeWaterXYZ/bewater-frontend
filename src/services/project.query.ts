import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getChallengeTProjects,
  getGitHubRepos,
  getProject,
  getProjectRating,
  getProjectRepoStats,
  updateProject,
  updateProjectRating,
  putProjectStatus,
  getProjects,
  getProjectFilterOptions,
} from "./project";
import { ChallengeID, ProjectId, TeamID, ProjectStatus } from "./types";

export function useFetchChallengeProjects(challengeId: ChallengeID) {
  return useQuery({
    queryKey: ["campaigns", challengeId, "projects"],
    queryFn: async () => {
      return getChallengeTProjects(challengeId);
    },
  });
}

export function useFetchProjects(
  limit = 20,
  filterOptions: { filterTags?: string[]; challengeTitle?: string[], githubTags?: string[], searchQuery?: string } = {},
  cursorId?: string
) {
  const projectTagKey = filterOptions?.filterTags ? filterOptions.filterTags : ["all-filter-tag"];
  const projectTitleKey = filterOptions?.challengeTitle
    ? filterOptions.challengeTitle
    : ["all-title"];
  const projectGithubTagKey = filterOptions?.githubTags ? filterOptions.githubTags : ["all-github-tag"];
  const cursorIdKey = cursorId ? cursorId : "none";
  return useQuery({
    queryKey: [
      "projects",
      ...projectTagKey,
      ...projectGithubTagKey,
      projectTitleKey,
      limit,
      cursorIdKey,
      filterOptions?.searchQuery,
    ],
    queryFn: async () => {
      return getProjects(limit, filterOptions, cursorId);
    },
  });
}

export function useFetchProjectFilterOptions() {
  return useQuery({
    queryKey: ["projects", "filterOptions"],
    queryFn: async () => {
      return getProjectFilterOptions();
    },
    cacheTime: 1000 * 60 * 60 * 24,
  });
}

export function useFetchProject(projectId: ProjectId) {
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      return getProject(projectId);
    },
  });
}
export function useFetchProjectRating(projectId: ProjectId, enable: boolean) {
  return useQuery({
    queryKey: ["project", projectId, "rating"],
    enabled: enable,
    queryFn: async () => {
      return getProjectRating(projectId);
    },
  });
}

export function useFetchProjectGitHubRepos(teamId: TeamID) {
  return useQuery({
    queryKey: ["project", "repos", teamId],
    queryFn: async () => {
      return getGitHubRepos(teamId);
    },
  });
}

export function useFetchProjectRepoStats(teamId: TeamID, githubURI: string) {
  return useQuery({
    queryKey: ["project", "repos-stats", teamId, githubURI],
    queryFn: async () => {
      return getProjectRepoStats(teamId, githubURI);
    },
  });
}

export function useMutationUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation(updateProject, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["project", data.id]);
    },
  });
}

export function useMutationUpdateProjectRating(projectId: ProjectId) {
  const queryClient = useQueryClient();
  return useMutation(updateProjectRating, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["project", projectId, "rating"]);
    },
  });
}

export function resetProjectStatus(
  projectId: ProjectId,
  status: ProjectStatus
) {
  return putProjectStatus(projectId, status);
}
