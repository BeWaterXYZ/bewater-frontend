"use client";
import {
  useLoadingStoreAction,
  useLoadingWhen,
} from "@/components/loading/store";
import { getOAuthUrl } from "@/services/auth";
import {
  useFetchUser,
  useFetchUserSocialConnections,
  useMutationDisconnectSocialConnection,
  useMutationDeleteUserGithubRepo,
  useFetchProjectsByUser,
} from "@/services/user.query";
import { useClerk } from "@clerk/nextjs";
import Image from "next/image";
import { FormUserSettings } from "./form/form-settings";
import { useDialogStore } from "@/components/dialog/store";
import { useEffect, useState } from "react";
import { GithubRepo } from "@/services/types";
import { useToastStore } from "@/components/toast/store";
import { ProjectItem } from "@/app/[lng]/projects/project-item";
export default function Page() {
  const showDialog = useDialogStore((s) => s.open);
  const user = useClerk().user;
  const { showLoading, dismissLoading } = useLoadingStoreAction();
  const addToast = useToastStore((s) => s.add);
  const { data: userProfile, isLoading } = useFetchUser(user?.id);
  const { data: userProjects, isLoading: isLoadingProjects } =
    useFetchProjectsByUser(user?.id);
  const mutation = useMutationDisconnectSocialConnection();
  const mutationDeleteUserGithubRepo = useMutationDeleteUserGithubRepo();
  const [githubRepo, setGithubRepo] = useState<GithubRepo[]>([]);
  const { data: socialConnections, isLoading: isLoading2 } =
    useFetchUserSocialConnections(user?.id);

  useLoadingWhen(isLoading || isLoading2);

  useEffect(() => {
    if (userProfile?.githubRepo) {
      setGithubRepo(userProfile.githubRepo);
    }
  }, [userProfile?.githubRepo]);

  if (isLoading || isLoading2) return null;

  if (!userProfile) return null;

  const connect = async (platform: string) => {
    showLoading();
    let data = await getOAuthUrl({
      platform: platform,
      redirectURI: window.location.href,
    });
    window.location.href = data.oauthURL;
  };
  const disconnect = async (platform: string) => {
    showLoading();
    try {
      await mutation.mutateAsync(platform);
    } finally {
      dismissLoading();
    }
  };

  const showImportRepoDialog = () => {
    showDialog("github_repo_import", {
      onRepoImport: (repoInfo: GithubRepo) => {
        console.log(repoInfo);
        setGithubRepo([...githubRepo, repoInfo]);
      },
    });
  };
  const handleUpdateRepo = async (repo: GithubRepo) => {
    showLoading();
    try {
      const response = await fetch(
        `https://api.github.com/repos/${repo.owner}/${repo.name}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch repository data");
      }
      const repoData = await response.json();
      const updatedRepo = {
        ...repo,
        tags: repoData.topics || [],
      };
      setGithubRepo((prevRepos) =>
        prevRepos.map((r) => (r.url === repo.url ? updatedRepo : r))
      );
      addToast({
        type: "success",
        title: "Repository updated",
        description: `Updated ${repo.name} with ${updatedRepo.tags.length} tags.`,
      });
    } catch (error) {
      console.error("Error updating repository:", error);
      addToast({
        type: "error",
        title: "Error updating repository",
        description:
          "Failed to fetch updated repository data. Please try again.",
      });
    } finally {
      dismissLoading();
    }
  };
  const handleDeleteRepo = async (repo: GithubRepo) => {
    try {
      await mutationDeleteUserGithubRepo.mutateAsync(repo);
      setGithubRepo((prevRepos) => prevRepos.filter((r) => r.url !== repo.url));
      addToast({
        type: "success",
        title: "Repository deleted",
        description: `Deleted ${repo.name}.`,
      });
    } catch (error) {
      addToast({
        type: "error",
        title: "Error deleting repository",
        description: "Failed to delete the repository. Please try again.",
      });
    }
  };

  return (
    <div className="container">
      <FormUserSettings data={userProfile!} />
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-500">
          Your Projects
        </h3>
        {userProjects && userProjects.length > 0 ? (
          userProjects.length > 3 ? (
            <>
              {userProjects.slice(0, 3).map((project) => (
                <ProjectItem key={project.id} project={project} lng={"en"} />
              ))}
              <details className="mt-2">
                <summary className="cursor-pointer text-blue-500 hover:text-blue-600">
                  Show {userProjects.length - 3} more projects
                </summary>
                {userProjects.slice(3).map((project) => (
                  <ProjectItem key={project.id} project={project} lng={"en"} />
                ))}
              </details>
            </>
          ) : (
            userProjects.map((project) => (
              <ProjectItem key={project.id} project={project} lng={"en"} />
            ))
          )
        ) : (
          <p className="text-gray-500">You don&apos;t have any projects yet</p>
        )}
      </div>
      {(userProfile.githubRepo && userProfile.githubRepo.length > 0) ||
      githubRepo.length > 0 ? (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-500">
            GitHub Repositories
          </h3>
          <div className="flex flex-col gap-2">
            {githubRepo.map((repo, index) => (
              <div
                className="flex flex-col gap-2 p-3 border border-gray-500 rounded"
                key={index}
              >
                <p className="font-semibold text-white">{repo.name}</p>
                <div className="flex flex-wrap gap-2">
                  {repo.tags.map((tag, tagIndex) => (
                    <span
                      className="px-2 py-1 bg-midnight text-white rounded-full text-sm"
                      key={`${index}-${tagIndex}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => handleUpdateRepo(repo)}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteRepo(repo)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <p className="text-gray-500 text-center">
            You haven&apos;t imported any projects yet
          </p>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button className="btn btn-primary" onClick={showImportRepoDialog}>
          Import GitHub Projects
        </button>
      </div>

      <div className="flex flex-row h-full  flex-wrap min-h-[50vh]">
        <div className="w-full mt-6 flex flex-col gap-3">
          {/* github figma */}
          {["GitHub", "Figma"].map((platform) => {
            let connection = socialConnections?.find(
              (c) => c.platform.toLowerCase() === platform.toLowerCase()
            );
            return (
              <div
                key={platform}
                className="rounded p-3 border border-midnight bg-latenight flex gap-2 justify-between "
              >
                <div className="flex  p-2">
                  <Image
                    src={`/icons/${platform.toLowerCase()}.svg`}
                    width={24}
                    height={24}
                    alt={platform}
                  />
                </div>
                <div className="flex flex-col justify-around flex-1">
                  {connection ? (
                    <>
                      <p className="body-4 text-gray-500 font-bold capitalize">
                        {platform}
                      </p>
                      <p className="body-4 text-gray-300">
                        {connection?.handle}
                      </p>
                    </>
                  ) : (
                    <p className="body-4 text-grey-500">
                      Connect your{" "}
                      <span className="capitalize">{platform}</span> account
                    </p>
                  )}
                </div>
                <div>
                  {connection ? (
                    <button
                      className="btn btn-secondary-invert"
                      onClick={() => disconnect(platform)}
                    >
                      Disconnect
                    </button>
                  ) : (
                    <button
                      className="btn btn-secondary"
                      onClick={() => connect(platform)}
                    >
                      Connect
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
