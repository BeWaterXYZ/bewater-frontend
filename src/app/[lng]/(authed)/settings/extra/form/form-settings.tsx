import clsx from "clsx";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { checkUsername, GetUserProfileByIdResponse } from "@/services/user";

import type { FieldValues } from "react-hook-form";
import { Input, Select, TextArea } from "@/components/form/control";
import { useToastStore } from "@/components/toast/store";
import { useLoadingStoreAction } from "@/components/loading/store";
import { RoleSetOptions, RoleSetScheme } from "@/constants/options/role";
import { SkillSetOptions, SkillSetScheme } from "@/constants/options/skill";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserProfile } from "@/services/types";
import {
  useMutationUpdateUserProfile,
  useFetchProjectsByUser,
} from "@/services/user.query";
import { validationSchema } from "@/schema";
import { Project } from "@/services/types";
import GithubProjectItem from "../component/github-project-item";
import { User } from "@clerk/nextjs/dist/types/server";
import { useDialogStore } from "@/components/dialog/store";
import { ProjectSettings } from "../component/project-settings";
import { Switch } from "@/components/form/switch";
import { PinnedLinks } from "../component/pinned-links";

interface Props {
  data: UserProfile;
  user?: User;
  socialConnections?: Array<{ platform: string; handle: string }>;
}

export const FormUserSettings = ({
  data,
  user,
  socialConnections = [],
}: Props) => {
  const schema = z.object({
    bio: validationSchema.bio,
    telegramLink: z.string().optional(),
    roles: validationSchema.roles,
    skills: validationSchema.skills,
    pinnedProjects: z.array(z.any()).optional(),
    showChallenges: z.boolean().optional(),
    showTeamwork: z.boolean().optional(),
    showStats: z.boolean().optional(),
    showAdditionalInfo: z.boolean().optional(),
    showPinnedProjects: z.boolean().optional(),
    showPinnedLinks: z.boolean().optional(),
    additionalInfo: z.string().optional(),
    links: z
      .array(
        z.object({
          icon: z.string(),
          url: z.string(),
          pinned: z.boolean(),
          description: z.string().optional(),
        })
      )
      .optional(),
  });

  type Inputs = z.infer<typeof schema>;
  const showDialog = useDialogStore((s) => s.open);
  const [githubRepo, setGithubRepo] = useState<Project[]>([]);
  const { data: userProjects } = useFetchProjectsByUser(user?.id);
  const addToast = useToastStore((s) => s.add);
  const router = useRouter();
  const { showLoading, dismissLoading } = useLoadingStoreAction();
  const mutation = useMutationUpdateUserProfile();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...data,
      bio: data?.bio ?? "",
      telegramLink: data?.telegramLink ?? "",
      pinnedProjects: data?.projects.filter((p) => p.isPinned) ?? [],
      showChallenges: data?.showChallenges ?? false,
      showTeamwork: data?.showTeamwork ?? false,
      showStats: data?.showStats ?? false,
      showAdditionalInfo: data?.showAdditionalInfo ?? false,
      showPinnedProjects: data?.showPinnedProjects ?? false,
      showPinnedLinks: data?.showPinnedLinks ?? false,
      additionalInfo: data?.additionalInfo ?? "",
      links: data?.links ?? [],
    },
  });

  const pinnedProjects = watch("pinnedProjects") || [];
  const links = watch("links") || [];

  useEffect(() => {
    if (userProjects) {
      setGithubRepo(userProjects);
    }
  }, [userProjects]);

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
        setGithubRepo((prevRepos) =>
          prevRepos.map((r) =>
            r.externalId === updatedProject.externalId ? updatedProject : r
          )
        );
      },
      onRepoDelete: (repoId: string) => {
        setGithubRepo((prevRepos) =>
          prevRepos.filter((r) => r.externalId !== repoId)
        );
      },
    });
  };

  const handlePinProject = (projectId: string) => {
    const selectedProject = githubRepo.find((p) => p.id === projectId);
    if (selectedProject && pinnedProjects.length < 3) {
      if (!pinnedProjects.find((p) => p.id === selectedProject.id)) {
        setValue("pinnedProjects", [...pinnedProjects, selectedProject]);
      }
    }
  };

  const handleUnpinProject = (projectId: string) => {
    setValue(
      "pinnedProjects",
      pinnedProjects.filter((project) => project.id !== projectId)
    );
  };

  const handleShowImportDialog = () => {
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
        setGithubRepo([...githubRepo, repoInfo]);
      },
      onRepoDelete: (repoId: string) => {
        setGithubRepo((prevRepos) => prevRepos.filter((r) => r.id !== repoId));
      },
    });
  };

  const handleTogglePin = (url: string) => {
    setValue(
      "links",
      links.map((link) =>
        link.url === url ? { ...link, pinned: !link.pinned } : link
      )
    );
  };

  const handleAddLink = (newLink: {
    icon: string;
    url: string;
    description?: string;
    pinned: boolean;
  }) => {
    setValue("links", [...links, newLink]);
  };

  const handleUpdateLink = (url: string, updatedLink: {
    icon: string;
    url: string;
    description?: string;
    pinned: boolean;
  }) => {
    setValue("links", links.map(link => link.url === url ? updatedLink : link));
  };

  const onSubmit = async (formData: FieldValues) => {
    showLoading();
    try {
      await mutation.mutateAsync({
        ...formData,
        pinnedProjectIds: formData.pinnedProjects?.map((p: Project) => p.id),
      });
      addToast({
        title: "Saved!",
        type: "success",
      });
    } catch (err) {
      addToast({
        title: "Save failed",
        type: "error",
      });
    } finally {
      dismissLoading();
    }
  };

  return (
    <form
      method="post"
      className={clsx("mt-2 space-y-6")}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Bio Card */}
      <div className="border border-[#1E293B] bg-[#0B0C24] p-4">
        <div className="text-white whitespace-nowrap w-20">About me</div>
        <div className="flex-1">
          <TextArea
            label={<span className="text-white">content</span>}
            maxLength={1000}
            rows={3}
            placeholder="Introduce yourself :)"
            error={errors["bio"]}
            {...register("bio", { required: "Bio is required." })}
          />
        </div>
      </div>

      {/* Roles Card */}
      <div className="border border-[#1E293B] bg-[#0B0C24] p-4">
        <div className="flex items-center gap-4">
          <span className="text-white whitespace-nowrap w-20">Roles</span>
          <div className="flex-1">
            <Select
              options={RoleSetOptions}
              error={errors["roles"]}
              control={control}
              hideError={true}
              {...register("roles")}
            />
          </div>
        </div>
      </div>

      {/* Skills Card */}
      <div className="border border-[#1E293B] bg-[#0B0C24] p-4">
        <div className="flex items-center gap-4">
          <span className="text-white whitespace-nowrap w-20">Skills</span>
          <div className="flex-1">
            <Select
              options={SkillSetOptions}
              error={errors["skills"]}
              control={control}
              hideError={true}
              {...register("skills")}
            />
          </div>
        </div>
      </div>

      {/* Telegram Card */}
      <div className="border border-[#1E293B] bg-[#0B0C24] p-4">
        <div className="flex items-center gap-4">
          <span className="text-white whitespace-nowrap w-20">Telegram</span>
          <div className="flex-1">
            <Input
              placeholder="Enter your telegram id"
              error={errors["telegramLink"]}
              hideError={true}
              {...register("telegramLink")}
            />
          </div>
        </div>
      </div>

      {/* Challenges Visibility Card */}
      <div className="border border-[#1E293B] bg-[#0B0C24] p-4">
        <div className="flex items-center justify-between">
          <h4 className="text-md font-semibold text-white">Challenges</h4>
          <Switch
            name="showChallenges"
            control={control}
            onValueChange={(value) => setValue("showChallenges", value)}
          />
        </div>
      </div>

      {/* Projects Section */}
      <ProjectSettings
        user={user}
        socialConnections={socialConnections}
        githubRepo={githubRepo}
        pinnedProjects={pinnedProjects}
        onPinProject={handlePinProject}
        onUnpinProject={handleUnpinProject}
        onEditProject={handleEditProject}
        onShowImportDialog={handleShowImportDialog}
        register={register}
        control={control}
        setValue={setValue}
      />

      {/* Pinned Links Section */}
      <PinnedLinks
        links={links}
        onTogglePin={handleTogglePin}
        onAddLink={handleAddLink}
        onUpdateLink={handleUpdateLink}
        register={register}
        control={control}
        setValue={setValue}
      />

      {/* Additional Info Card */}
      <div className="border border-[#1E293B] bg-[#0B0C24] p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-md font-semibold text-white">Additional Info</h4>
          <Switch
            name="showAdditionalInfo"
            control={control}
            onValueChange={(value) => setValue("showAdditionalInfo", value)}
          />
        </div>
        <TextArea
          label={<span className="text-white">content</span>}
          rows={3}
          placeholder="Work Experience, Idea..."
          error={errors["additionalInfo"]}
          {...register("additionalInfo")}
          maxLength={1000}
        />
      </div>

      {/* Teamwork Visibility Card */}
      <div className="border border-[#1E293B] bg-[#0B0C24] p-4">
        <div className="flex items-center justify-between">
          <h4 className="text-md font-semibold text-white">Teamwork</h4>
          <Switch
            name="showTeamwork"
            control={control}
            onValueChange={(value) => setValue("showTeamwork", value)}
          />
        </div>
      </div>

      {/* Stats Visibility Card */}
      <div className="border border-[#1E293B] bg-[#0B0C24] p-4">
        <div className="flex items-center justify-between">
          <h4 className="text-md font-semibold text-white">Stats</h4>
          <Switch
            name="showStats"
            control={control}
            onValueChange={(value) => setValue("showStats", value)}
          />
        </div>
      </div>

      <div className="flex justify-end mt-4 mb-20">
        <button className="btn btn-primary" type="submit">
          Save Changes
        </button>
      </div>
    </form>
  );
};
