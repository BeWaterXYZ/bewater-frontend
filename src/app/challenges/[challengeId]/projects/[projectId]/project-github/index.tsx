'use client';
import { Project } from '@/services/types';
import { GithubStatsDisplay } from './display';
import { GithubStatsSetup } from './setup';

export function GithubStats({ project }: { project: Project }) {
  const projectHasConnectedGithub = !!project.githubURI;

  return (
    <div className="my-4 mb-8">
      <h3 className="body-3 font-bold text-grey-500">Github Stats</h3>
      <div className="mt-6">
        {projectHasConnectedGithub ? (
          <GithubStatsDisplay project={project} />
        ) : (
          <GithubStatsSetup project={project} />
        )}
      </div>
    </div>
  );
}
