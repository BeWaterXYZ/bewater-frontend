"use client";

import { Challenge, Project } from "@/services/types";
import { useClerk } from "@clerk/nextjs";
import { AssetItem } from "./project-asset-item";
export const data = [
  {
    label: "Demo Link",
    key: "demoURI",
    icon: "demo",
  },
  {
    label: "Video",
    key: "videoURI",
    icon: "video",
  },
  {
    label: "Pitch Deck",
    key: "deckURI",
    icon: "deck",
  },
  {
    label: "Github",
    key: "githubURI",
    icon: "github",
  },
] as const;

export function ProjectAssets({
  project,
  challenge,
}: {
  project: Project;
  challenge: Challenge;
}) {
  const user = useClerk().user;
  // todo use isTeamMember instead
  const isLeader = project.team.teamMembers
    // .filter((m) => m.isLeader)
    .some((m) => m.userProfile.clerkId === user?.id);

  const assetsToShow = data.filter((d) => {
    // if (isLeader && d.key !== "githubURI") {
    //   return true;
    // }
    // return !!project[d.key];
    return true;
  });

  return (
    <div className="mb-10">
      <h3 className="body-3 font-bold text-grey-500">Assets</h3>

      {assetsToShow.length > 0 &&
      (isLeader || !(challenge.yotadata?.hideTeamProfile ?? true)) ? (
        <div className="w-full mt-5 flex flex-col gap-3">
          {assetsToShow.map(({ label, key, icon }) => {
            const link = project[key];
            return (
              link && (
                <AssetItem
                  key={key}
                  project={project}
                  field={key}
                  value={link}
                  icon={icon}
                  label={label}
                  readonly={!isLeader}
                />
              )
            );
          })}
        </div>
      ) : (
        <div className="rounded border border-[#24254E] bg-latenight mt-5 p-4 my-3 body-2 text-grey-600">
          {assetsToShow.length === 0
            ? "No assets yet."
            : "This section is hidden."}
        </div>
      )}
    </div>
  );
}
