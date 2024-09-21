import { Input, Select, TextArea } from "@/components/form/control";

import { Dialogs, useDialogStore } from "../store";

import { useLoadingStoreAction } from "@/components/loading/store";
import { useToastStore } from "@/components/toast/store";
import { updateTeam } from "@/services/team";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { useAlert } from "@/components/alert/store";
import { OptionItem } from "@/constants/options/types";
import { ProjectTagSetOptions } from "@/constants/options/project-tag";
import { useNavigator } from "@/hooks/useNavigator";
import { validationSchema } from "@/schema";
import {
  useMutaionCreateTeam,
  useMutaionDismissTeam,
} from "@/services/team.query";
import { useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  useMutationAddUserGithubRepo,
  useMutationDeleteUserGithubRepo,
  useMutationUpdateUserGithubRepo,
} from "@/services/user.query";
import { COUNTRIES } from "@/constants/options/country";
import { RoleSetOptions } from "@/constants/options/role";
import { SkillSetOptions } from "@/constants/options/skill";
import { GithubRepo, Project } from "@/services/types";

const schema = (isEditing: boolean) =>
  z
    .object({
      githubRepoURL: validationSchema.githubURL,
      title: validationSchema.text,
      description: validationSchema.text,
      tags: validationSchema.tags,
      contact: validationSchema.str,
    })
    .required();

export type Inputs = z.infer<ReturnType<typeof schema>>;

export function useImportGithubRepoForm(
  initialData?: Project,
  isEditing: boolean = false
) {
  return useForm<Inputs>({
    resolver: zodResolver(schema(isEditing)),
    defaultValues: {
      githubRepoURL: initialData?.githubURI ?? "",
      title: initialData?.name ?? "",
      description: initialData?.description ?? "",
      tags: initialData?.tags ?? [],
      contact: initialData?.contact ?? "",
    },
  });
}

interface GithubRepoImportDialogProps {
  data: NonNullable<Dialogs["github_repo_import"]>;
  close: () => void;
}

export default function GithubRepoImportDialog({
  data,
  close,
}: GithubRepoImportDialogProps) {
  const isEditing = !!data.repo;

  // let hackProjectTagSetOptions: OptionItem<string>[] = ProjectTagSetOptions;

  const { showLoading, dismissLoading } = useLoadingStoreAction();
  const addToast = useToastStore((s) => s.add);
  const router = useNavigator("en");
  const createTeamMutaion = useMutaionCreateTeam();
  const dismissTeamMutation = useMutaionDismissTeam(undefined);
  const { confirm } = useAlert();
  const showDialog = useDialogStore((s) => s.open);
  const [isCallingAPI, setIsCallingAPI] = useState(false);
  const mutationAddUserGithubRepo = useMutationAddUserGithubRepo();
  const mutationUpdateUserGithubRepo = useMutationUpdateUserGithubRepo();
  const mutationDeleteUserGithubRepo = useMutationDeleteUserGithubRepo();
  
  const handleDeleteRepo = async () => {
    let confirmed = await confirm({
      title: "Are you sure?",
      description: "You are going to delete this repository",
      okCopy: "Delete",
      cancelCopy: "Cancel",
      type: "warning",
    });
    if (!confirmed) return;
    showLoading();

    try {
      if (data.repo?.id) {
        await mutationDeleteUserGithubRepo.mutateAsync(data.repo.id);
        addToast({
          type: "success",
          title: "Repository deleted",
          description: `Deleted ${data.repo?.name}.`,
        });
        data.onRepoDelete && data.onRepoDelete(data.repo?.externalId || "");
        close();
       }else {
        throw new Error("Repository not found");
       }
    } catch (error) {
      addToast({
        type: "error",
        title: "Error deleting repository",
        description: "Failed to delete the repository. Please try again.",
      });
    } finally {
      dismissLoading();
    }
  };
  const onSubmit = async (formData: Inputs) => {
    showLoading();
    setIsCallingAPI(true);
    try {
      const repoUrl = formData.githubRepoURL;
      const repoRegex = /^https:\/\/github\.com\/[^\/]+\/[^\/]+$/;

      if (!repoRegex.test(repoUrl)) {
        addToast({
          type: "error",
          title: "Invalid GitHub Repository URL",
          description: "Please enter a valid GitHub repository URL.",
        });
        dismissLoading();
        setIsCallingAPI(false);
        return;
      }

      try {
        const [, owner, repo] =
          repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/) || [];
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}`
        );

        if (!response.ok) {
          throw new Error("Repository not found or inaccessible");
        }

        const repoData = await response.json();
        const topics = repoData.topics || [];
        const repoInfo: GithubRepo = {
          externalId: data.repo?.externalId || "",
          githubTags: topics,
          owner: owner,
          url: repoUrl,
          tags: formData.tags || topics,
          description: formData.description || "",
          title: formData.title || "",
          contact: formData.contact,
        };

        if (isEditing) {
          // Update existing repo
          const res = await mutationUpdateUserGithubRepo.mutateAsync({
            ...repoInfo,
            externalId: data.repo?.externalId || "",
          });
          console.log(res);
          if (res) {
            data.onRepoImport && data.onRepoImport(res);
          } else {
            addToast({
              type: "error",
              title: "Error importing repository",
              description:
                "Unable to fetch repository data. Please check the URL and try again.",
            });
          }
          console.log("Updating repo:", repoInfo);
        } else {
          // Create new repo
          const res = await mutationAddUserGithubRepo.mutateAsync(repoInfo);
          console.log(res);
          if (res) {
            data.onRepoImport && data.onRepoImport(res);
          } else {
            addToast({
              type: "error",
              title: "Error importing repository",
              description:
                "Unable to fetch repository data. Please check the URL and try again.",
            });
          }
        }

        addToast({
          type: "success",
          title: isEditing
            ? "Repository updated successfully"
            : "Repository imported successfully",
          description: `${isEditing ? "Updated" : "Imported"} ${
            repoInfo.title
          } with ${repoInfo.tags.length} tags.`,
        });

        close();
      } catch (error) {
        console.error("Error fetching repository data:", error);
        addToast({
          type: "error",
          title: "Error importing repository",
          description:
            "Unable to fetch repository data. Please check the URL and try again.",
        });
      } finally {
        dismissLoading();
        setIsCallingAPI(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      dismissLoading();
      setIsCallingAPI(false);
    }
  };
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useImportGithubRepoForm(data.repo, isEditing);

  const onInvalid = (e: any) => {
    console.log("invalid", e);
  };

  return (
    <div className="w-[80vw] max-w-md">
      <p className="font-secondary text-base text-gray-200 leading-[30px] mb-4">
        {isEditing ? "Edit GitHub Repository" : "Import GitHub Repository"}
      </p>

      <form method="post" onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div className="max-h-[60vh] overflow-y-auto mb-4">
          <Input
            label="Repository URL"
            placeholder="Enter your GitHub repo URL"
            required
            error={errors["githubRepoURL"]}
            {...register("githubRepoURL")}
          />
          <Input
            label="Project Title"
            required
            placeholder="Enter your project title"
            error={errors["title"]}
            {...register("title")}
          />
          <Select
            id="select-tags"
            label="Project Tag"
            required
            maxSelections={5}
            options={ProjectTagSetOptions}
            error={errors["tags"]}
            control={control}
            {...register("tags")}
          />
          <TextArea
            label="Project Description"
            required
            placeholder="Enter your project description"
            error={errors["description"]}
            {...register("description")}
          />
          <Input
            label="WeChat / Telegram"
            placeholder="Enter your WeChat / Telegram ID"
            error={errors["contact"]}
            {...register("contact")}
          />
        </div>
        <div className="flex justify-between">
          {isEditing && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDeleteRepo}
              disabled={isCallingAPI}
            >
              Delete
            </button>
          )}
          <div className="flex gap-2 ml-auto">
            <button
              disabled={isCallingAPI}
              className="btn btn-secondary"
              type="button"
              onClick={close}
            >
              Cancel
            </button>
            <button className="btn btn-primary" disabled={isCallingAPI}>
              {isEditing ? "Update" : "Import"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
