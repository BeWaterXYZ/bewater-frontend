'use client';
import { Loading } from '@/components/loading/loading';
import { useLoadingStoreAction } from '@/components/loading/store';
import { SearchInput } from '@/components/molecules/search-input';
import { getOAuthUrl } from '@/services/auth';
import {
  useFetchProjectGitHubRepos,
  useFetchProjectRepoStats,
  useMutationUpdateProject,
} from '@/services/project.query';
import { Project, RepoStats } from '@/services/types';
import { useFetchUserSocialConnections } from '@/services/user.query';
import { useAuthStore } from '@/stores/auth';
import { formatMMMDDYYYY } from '@/utils/date';
import { formatDistance, parseISO } from 'date-fns';
import Image from 'next/image';
import numeral from 'numeral';
import { useState } from 'react';

function UserConnectGithub() {
  const { showLoading, dismissLoading } = useLoadingStoreAction();

  const onUserConnectGithub = async () => {
    showLoading();
    let data = await getOAuthUrl({
      platform: 'github',
      redirectURI: window.location.href,
    });
    window.location.href = data.oauthURL;
  };
  return (
    <div className="p-6 rounded bg-[#0B0C24] border border-grey-800 flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <Image src="/icons/github.svg" alt="github" height={20} width={20} />
          <h5 className="body-2">Connect to Your GitHub Account</h5>
        </div>
        <button className="btn btn-secondary" onClick={onUserConnectGithub}>
          Connect
        </button>
      </div>
      <div>
        <p className="body-3 text-grey-500">
          To connect this project with a GitHub repository to display more info,
          connect your GitHub account first.
        </p>
      </div>
    </div>
  );
}

function ProjectConnectGithub({ project }: { project: Project }) {
  const mutation = useMutationUpdateProject();
  const { showLoading, dismissLoading } = useLoadingStoreAction();

  const [search, searchSet] = useState('');
  const { data: repos, isLoading } = useFetchProjectGitHubRepos(project.teamId);
  const filteredRepo = !!search
    ? repos?.filter((r) => r.fullName.includes(search))
    : repos;

  const reposToShow = filteredRepo?.slice(0, 10);

  const onConnect = async (url: string) => {
    showLoading();
    try {
      await mutation.mutateAsync({
        id: project.id,
        teamId: project.teamId,
        githubURI: url,
      });
    } finally {
      dismissLoading();
    }
  };

  if (isLoading) return <Loading cover={false} />;
  return (
    <div className="p-6 rounded bg-[#0B0C24] border border-grey-800 flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <Image src="/icons/github.svg" alt="github" height={20} width={20} />
          <h5 className="body-2">Connect to Your GitHub Public Repo</h5>
        </div>
      </div>
      <div>
        <SearchInput
          placeholder="Search for more of your public GitHub repo"
          value={search}
          onChange={(e) => searchSet(e.target.value)}
        />
      </div>
      <div>
        <ul className="">
          {reposToShow?.map((repo) => (
            <li
              key={repo.fullName}
              className="flex items-center gap-2 border-b border-b-grey-800  py-2"
            >
              <p className="body-3">{repo.fullName}</p>
              <p className="flex-1 body-3 text-grey-500">
                Updated {formatDistance(parseISO(repo.updatedAt), Date.now())}
              </p>
              <button
                className="btn btn-secondary"
                onClick={() => onConnect(repo.url)}
              >
                Connect
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function GithubStatsSetup({ project }: { project: Project }) {
  const user = useAuthStore((s) => s.user);
  const isLeader = project.team.teamMembers
    .filter((m) => m.isLeader)
    .some((m) => m.userProfile.userId === user?.userId);

  const { data: socialConnections, isLoading } = useFetchUserSocialConnections(
    user?.userId,
  );

  if (!socialConnections || isLoading || !isLeader) return null;

  const userHasConnectedGithub = (socialConnections ?? []).some(
    (sc) => sc.platform.toLowerCase() === 'github' && !!sc.handle,
  );

  return userHasConnectedGithub ? (
    <ProjectConnectGithub project={project} />
  ) : (
    <UserConnectGithub />
  );
}

function getRepoLanguageStr(repoStats: RepoStats) {
  let languages = Object.keys(repoStats.languages);
  let loc = languages.reduce((prev, cur) => prev + repoStats.languages[cur], 0);
  return languages
    .map(
      (l) =>
        `${l}  ${numeral((repoStats.languages[l] * 100) / loc).format('0.0')}%`,
    )
    .join(' · ');
}

function GithubStatsDisplay({ project }: { project: Project }) {
  const { data, isLoading } = useFetchProjectRepoStats(
    project.teamId,
    project.githubURI!,
  );
  if (isLoading) return <Loading cover={false} />;
  if (!data) return null;
  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="bg-[#0B0C24] border border-grey-800 rounded-sm p-3 flex flex-col gap-2">
          <p className="body-4 text-grey-500">Language Used</p>
          <p className="body-3">{getRepoLanguageStr(data)}</p>
        </div>
        <div className="flex gap-3">
          <div className="flex-1 bg-[#0B0C24] border border-grey-800 rounded-sm p-3 flex flex-col gap-2">
            <p className="body-4 text-grey-500">Issues</p>
            <p className="body-3">{data?.openIssuesCount}</p>
          </div>
          <div className="flex-1 bg-[#0B0C24] border border-grey-800 rounded-sm p-3 flex flex-col gap-2">
            <p className="body-4 text-grey-500">Pull Requests</p>
            <p className="body-3">{data?.totalPullRequests}</p>
          </div>
          <div className="flex-1 bg-[#0B0C24] border border-grey-800 rounded-sm p-3 flex flex-col gap-2">
            <p className="body-4 text-grey-500">Issues</p>
            <p className="body-3">{data?.totalCommits}</p>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h3 className="body-3 font-bold text-grey-500  mb-2">Latest Commits</h3>
        <ul>
          {data?.latestCommits.map((cm) => (
            <li
              className="border-b border-b-grey-800 flex py-3 justify-between"
              key={cm.commitURI}
            >
              <div className="flex flex-col gap-2">
                <p className="body-3">{cm.commitMessage}</p>
                <p className="body-4 text-grey-500">{cm.commitAuthor}</p>
              </div>
              <div className="body-3 text-grey-500 whitespace-nowrap">
                {formatMMMDDYYYY(cm.commitDate)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

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
