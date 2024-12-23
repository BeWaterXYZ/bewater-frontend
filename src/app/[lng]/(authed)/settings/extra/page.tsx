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
  useFetchProjectsByUser,
} from "@/services/user.query";
import { useClerk } from "@clerk/nextjs";
import Image from "next/image";
import { FormUserSettings } from "./form/form-settings";
import { useDialogStore } from "@/components/dialog/store";
import { useEffect, useState } from "react";
import { GithubRepo, Project } from "@/services/types";
import { useToastStore } from "@/components/toast/store";
import { ProjectItem } from "@/app/[lng]/projects/project-item";
import { unsplash } from "@/utils/unsplash";
import { Aspect } from "@/components/aspect";
import { TagProjectTag } from "@/components/tag/project-tag";
import Link from "next/link";
import { TeamAvatarRow } from "@/components/molecules/team-avatar-row";
import GithubProjectItem from "./component/github-project-item";
import { useRouter } from "next/navigation";
import ProfilePreview from "./component/profile-preview";
import { User } from "@clerk/nextjs/dist/types/server";

export default function Page() {
  const showDialog = useDialogStore((s) => s.open);
  const user = useClerk().user;
  const { showLoading, dismissLoading } = useLoadingStoreAction();
  const addToast = useToastStore((s) => s.add);
  const { data: userProfile, isLoading } = useFetchUser(user?.id);
  const { data: userProjects, isLoading: isLoadingProjects } =
    useFetchProjectsByUser(user?.id);
  const mutation = useMutationDisconnectSocialConnection();
  const [githubRepo, setGithubRepo] = useState<Project[]>([]);
  const { data: socialConnections, isLoading: isLoading2 } =
    useFetchUserSocialConnections(user?.id);
  const router = useRouter();
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useLoadingWhen(isLoading || isLoading2);

  useEffect(() => {
    if (userProjects) {
      setGithubRepo(userProjects);
    }
  }, [userProjects]);

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
    const githubOwnerName = socialConnections?.find(
      (c) => c.platform.toLowerCase() === "github"
    )?.handle;

    if (!githubOwnerName) {
      addToast({
        type: "warning",
        title: "GitHub Account Not Connected",
        description:
          "Please connect your GitHub account before creating new projects.",
      });
      return;
    }
    showDialog("github_repo_import", {
      githubOwnerName,
      onRepoImport: (repoInfo: Project) => {
        console.log(repoInfo);
        setGithubRepo([...githubRepo, repoInfo]);
      },
      onRepoDelete: (repoId: string) => {
        console.log(repoId);
        setGithubRepo((prevRepos) => prevRepos.filter((r) => r.id !== repoId));
      },
    });
  };
  const handleUpdateRepo = async (repo: Project) => {
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
        githubTags: repoData.topics || [],
      };
      setGithubRepo((prevRepos) =>
        prevRepos.map((r) =>
          r.githubURI && r.githubURI === repo.githubURI ? updatedRepo : r
        )
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

  const handleEditProject = (project: Project) => {
    if (!project.userId) {
      router.push(
        `/en/campaigns/${
          project.team.challenge!.externalId ?? project.team.challenge!.id
        }/projects/${project.id}`
      );
      return;
    }
    const githubOwnerName = socialConnections?.find(
      (c) => c.platform.toLowerCase() === "github"
    )?.handle;
    if (!githubOwnerName) {
      addToast({
        type: "warning",
        title: "GitHub Account Not Connected",
        description:
          "Please connect your GitHub account before editing repositories.",
      });
      return;
    }
    showDialog("github_repo_import", {
      githubOwnerName,
      repo: project,
      onRepoImport: (updatedProject: Project) => {
        // Handle the updated project
        setGithubRepo((prevRepos) =>
          prevRepos.map((r) =>
            r.externalId === updatedProject.externalId ? updatedProject : r
          )
        );
        console.log(updatedProject);
      },
      onRepoDelete: (repoId: string) => {
        console.log(repoId);
        setGithubRepo((prevRepos) =>
          prevRepos.filter((r) => r.externalId !== repoId)
        );
      },
    });
  };

  const handlePreview = () => {
    setIsPreviewMode(true);
  };

  const handleBack = () => {
    setIsPreviewMode(false);
  };

  const handleShare = () => {
    // Copy profile URL to clipboard
    if (userProfile) {
      const profileUrl = `${window.location.origin}/en/profile/${userProfile.id}`;
      navigator.clipboard.writeText(profileUrl).then(() => {
        addToast({
          type: "success",
          title: "Link Copied",
          description: "Profile link has been copied to clipboard",
        });
      });
    }
  };

  return (
    <div className="container">
      {isPreviewMode ? (
        <ProfilePreview
          user={user as unknown as User}
          bio={userProfile?.bio}
          projects={githubRepo}
          onBack={handleBack}
        />
      ) : (
        <>
          <div className="flex justify-end gap-3 mb-6">
            <button 
              className="btn btn-secondary"
              onClick={handlePreview}
            >
              Preview
            </button>
            <button 
              className="btn btn-primary"
              onClick={handleShare}
            >
              Share
            </button>
          </div>

          <FormUserSettings data={userProfile!} />
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-500">
              Your Projects
            </h3>
            {githubRepo && githubRepo.length > 0 ? (
              githubRepo.length > 3 ? (
                <>
                  {githubRepo.slice(0, 3).map((project) => (
                    <div key={project.id} className="mb-4">
                      <div key={project.id} className="mt-4">
                        <GithubProjectItem
                          project={project}
                          onEdit={handleEditProject}
                        />
                      </div>
                    </div>
                  ))}
                  <details className="mt-2">
                    <summary className="cursor-pointer text-blue-500 hover:text-blue-600">
                      Show {githubRepo.length - 3} more projects
                    </summary>
                    {githubRepo.slice(3).map((project) => (
                      <div key={project.id} className="mt-4">
                        <GithubProjectItem
                          project={project}
                          onEdit={handleEditProject}
                        />
                      </div>
                    ))}
                  </details>
                </>
              ) : (
                githubRepo.map((project) => (
                  <div key={project.id} className="mb-4">
                    <GithubProjectItem
                      project={project}
                      onEdit={handleEditProject}
                    />
                  </div>
                ))
              )
            ) : (
              <p className="text-gray-500 text-center">
                You don&apos;t have any projects yet
              </p>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button className="btn btn-primary" onClick={showImportRepoDialog}>
              Create New Project
            </button>
          </div>
        </>
      )}
    </div>
  );
}
