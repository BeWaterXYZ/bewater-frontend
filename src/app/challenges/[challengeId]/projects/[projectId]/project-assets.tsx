'use client';

import { Project } from '@/services/types';
import { useAuthStore } from '@/stores/auth';
import { AssetItem } from './project-asset-item';
export const data = [
  {
    label: 'Demo Link',
    key: 'demoURI',
    icon: 'demo',
  },
  {
    label: 'Video',
    key: 'videoURI',
    icon: 'video',
  },
  {
    label: 'Pitch Deck',
    key: 'deckURI',
    icon: 'deck',
  },
  {
    label: 'Github',
    key: 'githubURI',
    icon: 'github',
  },
] as const;

export function ProjectAssets({ project }: { project: Project }) {
  const user = useAuthStore((s) => s.user);
  const isLeader = project.team.teamMembers
    .filter((m) => m.isLeader)
    .some((m) => m.userProfile.userId === user?.userId);

  const assetsToShow = data.filter((d) => {
    if (isLeader && d.key !== 'githubURI') {
      return true;
    }
    return !!project[d.key];
  });

  return (
    <div className="my-4 mb-8">
      <h3 className="body-3 font-bold text-grey-500">Assets</h3>

      {assetsToShow.length > 0 ? (
        <div className="w-full mt-6 flex flex-col gap-3">
          {assetsToShow.map(({ label, key, icon }) => {
            const link = project[key];
            return (
              <AssetItem
                key={key}
                project={project}
                field={key}
                value={link}
                icon={icon}
                label={label}
                readonly={!isLeader}
              />
            );
          })}
        </div>
      ) : (
        <div className="rounded border border-[#24254E] bg-[#0B0C24] mt-6 p-4 my-3 body-2 text-grey-600">
          No assets yet.
        </div>
      )}
    </div>
  );
}
