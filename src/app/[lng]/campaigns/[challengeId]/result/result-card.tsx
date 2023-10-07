'use client';
import { useLoadingWhen } from '@/components/loading/store';
import { TeamAvatarRow } from '@/components/molecules/team-avatar-row';
import { TagProjectTag } from '@/components/tag/project-tag';
import { useFetchChallengeTeams, useFetchTeam } from '@/services/team.query';
import { TeamID } from '@/services/types';
import { unsplash } from '@/utils/unsplash';
import Image from 'next/image';
import Link from 'next/link';

interface ResultCardProps {
  teamId: TeamID;
  thumbnail?: boolean;
  score?: number;
  lng: string;
}

export function ResultCard({
  teamId,
  score,
  thumbnail = false,
  lng,
}: ResultCardProps) {
  let { data: team, isLoading } = useFetchTeam(teamId);
  useLoadingWhen(isLoading);
  if (!team) return null;
  return (
    <div className="flex flex-col md:flex-row rounded overflow-hidden">
      {thumbnail ? (
        <div className="relative h-[216px] w-[320px]  overflow-hidden">
          <Image
            src={team.project.mediaURLs[0] ?? unsplash('project')}
            alt="github"
            className="object-cover"
            fill
          />
        </div>
      ) : null}
      <div className=" h-[216px]  w-[320px] flex flex-col justify-between p-4 bg-latenight  shadow-[0px_10px_20px_rgba(0,_0,_0,_0.3)]">
        <div className="relative">
          <Link
            className="block body-0 text-ellipsis truncate my-2 w-[80%]"
            href={`/${lng}/campaigns/${team.challenge!.externalId ?? team.challenge!.id}/projects/${team.project.id}`}
          >
            {team.project.name}
          </Link>
          {score ? (
            <div className="absolute top-0 right-0 w-16 h-10 rounded-[3px] body-4 bg-[#1A1C40]   p-3">
              {score}
            </div>
          ) : null}
          {/* <div className="flex items-center gap-2 py-2">
            {team.project.tags.map((tag) => (
              <TagProjectTag key={tag} label={tag} />
            ))}
          </div> */}
          <p className="body-3 text-white/50 h-[40px] overflow-hidden">
            {team.project.description}
          </p>
        </div>

        <div>
          <Link
            href={`/${lng}/campaigns/${team.challenge!.externalId ?? team.challenge!.id}/teams/${team.id}`}
            className="block body-3 text-left mb-2 text-ellipsis truncate"
          >
            {team.name}
          </Link>
          <div className="flex justify-between items-end">
            <div className="w-1/2">
              <div className="flex justify-between">
                <div className="body-3">
                  <TeamAvatarRow teamMembers={team.teamMembers} lng={lng} />
                </div>
              </div>
            </div>
            <div className="w-1/2 flex gap-4 items-center justify-end">
              {/* {team.project.githubURI ? (
                <div>
                  <a href={team.project.githubURI}>
                    <Image
                      src="/icons/github.svg"
                      alt="github"
                      height={24}
                      width={24}
                    />
                  </a>
                </div>
              ) : null} */}

              {team.project.demoURI ? (
                <div>
                  <a
                    className="btn btn-secondary"
                    href={`/${lng}/campaigns/${team.challenge!.externalId ?? team.challenge!.id}/projects/${team.project.id}`}
                  >
                    Visit
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
