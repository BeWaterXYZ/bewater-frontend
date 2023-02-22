'use client';
import { Loading } from '@/components/loading/loading';
import { useLoadingStoreAction } from '@/components/loading/store';
import { SearchInput } from '@/components/molecules/search-input';
import {
  useFetchProjectGitHubRepos,
  useMutationUpdateProject,
} from '@/services/project.query';
import { Project } from '@/services/types';
import { formatDistance, parseISO } from 'date-fns';
import Image from 'next/image';
import { useState } from 'react';

export function ProjectConnectGithub({ project }: { project: Project }) {
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
