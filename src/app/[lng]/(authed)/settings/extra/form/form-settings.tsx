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
import { useMutationUpdateUserProfile, useFetchProjectsByUser } from "@/services/user.query";
import { validationSchema } from "@/schema";
import { Project } from "@/services/types";
import GithubProjectItem from "../component/github-project-item";
import { User } from "@clerk/nextjs/dist/types/server";
import { useDialogStore } from "@/components/dialog/store";
import { ProjectSettings } from "../component/project-settings";

interface Props {
  data: UserProfile;
  user?: User;
  socialConnections?: Array<{platform: string; handle: string}>;
}

export const FormUserSettings = ({ data, user, socialConnections = [] }: Props) => {
  const schema = z.object({
    bio: validationSchema.bio,
    telegramLink: z.string().optional(),
    websiteLink: z.string().url().optional(),
    roles: validationSchema.roles,
    skills: validationSchema.skills,
    pinnedProjects: z.array(z.any()).optional(),
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
      websiteLink: data?.websiteLink ?? "",
      telegramLink: data?.telegramLink ?? "",
      pinnedProjects: data?.pinnedProjects ?? [],
    },
  });

  const pinnedProjects = watch('pinnedProjects') || [];
  
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
    const selectedProject = githubRepo.find(p => p.id === projectId);
    if (selectedProject && pinnedProjects.length < 3) {
      if (!pinnedProjects.find(p => p.id === selectedProject.id)) {
        setValue('pinnedProjects', [...pinnedProjects, selectedProject]);
      }
    }
  };

  const handleUnpinProject = (projectId: string) => {
    setValue(
      'pinnedProjects', 
      pinnedProjects.filter(project => project.id !== projectId)
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
        description: "Please connect your GitHub account before creating new projects.",
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

  const onSubmit = async (formData: FieldValues) => {
    showLoading();
    try {
      await mutation.mutateAsync({
        ...formData,
        pinnedProjects: formData.pinnedProjects,
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
      className={clsx("mt-8")}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextArea
        label="Bio"
        rows={3}
        placeholder="Introduce yourself :)"
        error={errors["bio"]}
        {...register("bio", { required: "Bio is required." })}
      />

      <Select
        label="Roles "
        options={RoleSetOptions}
        error={errors["roles"]}
        control={control}
        {...register("roles")}
      />

      <Select
        label="Skills "
        options={SkillSetOptions}
        error={errors["skills"]}
        control={control}
        {...register("skills")}
      />
      <Input
        label="Website "
        placeholder="Enter your website"
        error={errors["websiteLink"]}
        {...register("websiteLink")}
      />
      <Input
        label="Telegram"
        placeholder="Enter your telegram id"
        error={errors["telegramLink"]}
        {...register("telegramLink")}
      />

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
      />

      <div className="flex justify-end mt-4 mb-20">
        <button className="btn btn-primary" type="submit">
          Save Changes
        </button>
      </div>
    </form>
  );
};
