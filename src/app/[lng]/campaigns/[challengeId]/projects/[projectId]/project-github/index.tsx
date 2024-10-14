"use client";
import { Challenge, Project } from "@/services/types";
import { useClerk } from "@clerk/nextjs";
import { GithubStatsDisplay } from "./display";
import { GithubStatsSetup } from "./setup";

export function GithubStats({
  project,
  challenge,
}: {
  project: Project;
  challenge: Challenge;
}) {
  const projectHasConnectedGithub = !!project.githubURI;
  const user = useClerk().user;
  // todo use isTeamMember instead
  const isLeader = project.team.teamMembers
    // .filter((m) => m.isLeader)
    .some((m) => m.userProfile.clerkId === user?.id);
  return (
    <div className="">
      <h3 className="body-3 font-bold text-grey-500">Github Stats</h3>
      <div className="mt-5">
        {projectHasConnectedGithub ? (
          !(challenge.yotadata?.hideTeamProfile ?? false) ? (
            <GithubStatsDisplay project={project} />
          ) : (
            <div className="rounded border border-[#24254E] bg-latenight p-4 my-3 body-2 text-grey-600">
              This section is hidden.
            </div>
          )
        ) : isLeader ? (
          <GithubStatsSetup project={project} />
        ) : (
          <div className="rounded border border-[#24254E] bg-latenight p-4 my-3 body-2 text-grey-600">
            Not linked GitHub yet.
          </div>
        )}
      </div>
    </div>
  );
}
