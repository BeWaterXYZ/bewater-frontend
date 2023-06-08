'use client';
import { Loading } from '@/components/loading/loading';
import { useFetchProjectRepoStats } from '@/services/project.query';
import { Project, RepoStats } from '@/services/types';
import { formatMMMDDYYYY } from '@/utils/date';
import numeral from 'numeral';

function getRepoLanguageStats(repoStats: RepoStats) {
  let languages = Object.keys(repoStats.languages);
  let loc = languages.reduce((prev, cur) => prev + repoStats.languages[cur], 0);
  return languages.map((l) => (
    <p key={l} className="md:w-1/3 w-1/2">
      {l}
      <span className="text-grey-500">
        {` ${numeral((repoStats.languages[l] * 100) / loc).format('0.0')}%`}
      </span>
    </p>
  ));
}
export function GithubStatsDisplay({ project }: { project: Project }) {
  const { data, isLoading } = useFetchProjectRepoStats(
    project.teamId,
    project.githubURI!,
  );
  if (isLoading) return <Loading cover={false} />;
  if (!data) return null;
  return (
    <div>
      <iframe
        name="github"
        title="github"
        className="w-full h-[400px]"
        src={`https://alpha.metatrust.io/score/bewater/radar?repoUrl=${project.githubURI}`}
      />
      <div className="flex flex-col gap-3">
        <div className="bg-latenight border border-grey-800 rounded-sm p-3 flex flex-col gap-2">
          <p className="body-4 text-grey-500">Language Used</p>
          <div className="body-3 flex flex-wrap ">
            {getRepoLanguageStats(data)}
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex-1 bg-latenight border border-grey-800 rounded-sm p-3 flex flex-col gap-2">
            <p className="body-4 text-grey-500">Open Issues</p>
            <p className="body-3 ">{data?.openIssuesCount}</p>
          </div>
          <div className="flex-1 bg-latenight border border-grey-800 rounded-sm p-3 flex flex-col gap-2">
            <p className="body-4 text-grey-500">Pull Requests</p>
            <p className="body-3">{data?.totalPullRequests}</p>
          </div>
          <div className="flex-1 bg-latenight border border-grey-800 rounded-sm p-3 flex flex-col gap-2">
            <p className="body-4 text-grey-500">Commits</p>
            <p className="body-3">{data?.totalCommits}</p>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h3 className="body-3 font-bold text-grey-500  mb-2">Latest Commits</h3>
        <ul>
          {data?.latestCommits.map((cm) => (
            <li
              className="border-b border-b-grey-800 flex py-3 justify-between gap-1"
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
