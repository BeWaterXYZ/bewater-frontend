'use client';
import { Project } from '@/services/types';
import { useAuthStore } from '@/stores/auth';
import { GithubStatsDisplay } from './display';
import { GithubStatsSetup } from './setup';

export function GithubStats({ project }: { project: Project }) {
  const projectHasConnectedGithub = !!project.githubURI;
  const user = useAuthStore((s) => s.user);
  const isLeader = project.team.teamMembers
    .filter((m) => m.isLeader)
    .some((m) => m.userProfile.userId === user?.userId);
  return (
    <div className="my-4 mb-8">
      <h3 className="body-3 font-bold text-grey-500">Github Stats</h3>
      <div className="mt-6">
        {projectHasConnectedGithub ? (
          <GithubStatsDisplay project={project} />
        ) : isLeader ? (
          <GithubStatsSetup project={project} />
        ) : (
          <div className="rounded border border-[#24254E] bg-[#0B0C24] p-4 my-3 body-2 text-grey-600">
            Not linked GitHub yet.
          </div>
        )}
      </div>
    </div>
  );
}
