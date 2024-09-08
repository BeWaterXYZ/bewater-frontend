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
import { useMutationAddUserGithubRepo } from "@/services/user.query";

const schema = () =>
  z
    .object({
      githubRepoURL: validationSchema.githubURL,
    })
    .required();

export type Inputs = z.infer<ReturnType<typeof schema>>;

export function useImportGithubRepoForm() {
  return useForm<Inputs>({
    resolver: zodResolver(schema()),
    defaultValues: {
      githubRepoURL: "",
    },
  });
}

interface TeamCreateDialogProps {
  data: NonNullable<Dialogs["github_repo_import"]>;
  close: () => void;
}
export default function TeamCreateDialog({
  data,
  close,
}: TeamCreateDialogProps) {
  const isEditing = false;

  let hackProjectTagSetOptions: OptionItem<string>[] = ProjectTagSetOptions;

  const { showLoading, dismissLoading } = useLoadingStoreAction();
  const addToast = useToastStore((s) => s.add);
  const router = useNavigator("en");
  const createTeamMutaion = useMutaionCreateTeam();
  const dismissTeamMutation = useMutaionDismissTeam(undefined);
  const { confirm } = useAlert();
  const showDialog = useDialogStore((s) => s.open);
  const [isCallingAPI, setIsCallingAPI] = useState(false);
  const mutationAddUserGithubRepo = useMutationAddUserGithubRepo();

  const onDismiss = async () => {
    let confirmed = await confirm({
      title: "Are you sure?",
      description: "You are going to dismiss the team",
      okCopy: "Dismiss",
      cancelCopy: "Cancel",
      type: "warning",
    });
    if (!confirmed) return;
    showLoading();

    try {
      await dismissTeamMutation.mutateAsync("1");
      router.gotoTeamList("1");
      close();
      addToast({
        type: "success",
        title: "Team dismissed",
        description: "",
      });
    } catch (err) {
      console.log(err);
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
        const repoInfo = {
          name: repoData.name,
          owner: owner,
          url: repoUrl,
          tags: topics,
          description: repoData.description || "",
        };
        const res = await mutationAddUserGithubRepo.mutateAsync(repoInfo);
        console.log(res);
        data.onRepoImport &&
          data.onRepoImport(
            res.userProfile?.githubRepo?.filter(
              (repo) => repo.url === repoInfo.url
            )[0] || { ...repoInfo, externalId: "" }
          );

        addToast({
          type: "success",
          title: "Repository imported successfully",
          description: `Imported ${repoData.name} with ${topics.length} tags.`,
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
      // let confirmed = await confirm({
      //   title: "",
      //   description: "You are going to dismiss the team",
      //   okCopy: "Dismiss",
      //   cancelCopy: "Cancel",
      //   type: "warning",
      // });
      // if (!confirmed) return;
      // if (isEditing) {
      /**
       *  edit team
       */
      //   let payload = {
      //     name: formData.name,
      //     projectName: formData.title,
      //     projectDescription: formData.description,
      //     projectTags: formData.tags,
      //     projectBountyTrack: formData.bountyTrack,
      //     openingRoles: formData.roles,
      //     skills: formData.skills,
      //     nation: formData.nation[0],
      //     // expericence: Number(formData.experience),
      //     pastGrant: formData.pastGrant,
      //     builtDate: new Date(formData.builtDate.concat("-01")).toISOString(),
      //     deckURI: formData.deckURI,
      //     demoURI: formData.demoURI,
      //     siteURI: formData.siteURI,
      //     contact: formData.contact,
      //     recommendedFrom: formData.recommendedFrom,
      //     githubURI: formData.githubURI,
      //     membersCount: formData.membersCount,
      //     offlineDemoDay: Number(formData.offlineDemoDay),
      //   };
      //   let res = await updateTeam({ teamId: "1", payload });
      //   addToast({
      //     type: "success",
      //     title: "Team info updated",
      //     description: "",
      //   });
      //   router.refresh();
      // } else {
      //   /**
      //    * create new team
      //    */
      //   let payload = {
      //     name: formData.name,
      //     projectName: formData.title,
      //     projectDescription: formData.description,
      //     projectTags: formData.tags,
      //     projectBountyTrack: formData.bountyTrack,
      //     challengeId: "data.challenge!.id",
      //     openingRoles: formData.roles,
      //     skills: formData.skills,
      //     nation: formData.nation[0],
      //     leaderRole: formData.role[0],
      //     // expericence: Number(formData.experience),
      //     pastGrant: formData.pastGrant,
      //     builtDate: new Date(formData.builtDate.concat("-01")).toISOString(),
      //     deckURI: formData.deckURI,
      //     demoURI: formData.demoURI,
      //     siteURI: formData.siteURI,
      //     contact: formData.contact,
      //     recommendedFrom: formData.recommendedFrom,
      //     userEmail: formData.userEmail,
      //     githubURI: formData.githubURI,
      //     membersCount: formData.membersCount,
      //     offlineDemoDay: Number(formData.offlineDemoDay),
      //   };

      //   let res = await createTeamMutaion.mutateAsync(payload);
      //   if (res.leaderAlreadyInChallenge) {
      //     addToast({
      //       type: "error",
      //       title: "Already in challenge",
      //       description: "You already have a team",
      //     });
      //   } else if (res.team) {
      //     router.gotoTeam("data.challenge!.id", res.team.id);

      // addToast({
      //   type: 'success',
      //   title: 'team created',
      //   description: '',
      // });

      // showDialog("team_created", {
      //   challenge: data.challenge!,
      //   teamId: res.team.id,
      // });
      //   }
      // }
      // close();
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
  } = useImportGithubRepoForm();

  const onInvalid = (e: any) => {
    console.log("invalid", e);
  };

  return (
    <div className="w-[80vw] max-w-md">
      <p className="font-secondary text-base text-gray-200 leading-[30px] mb-4">
        Import github repo
      </p>

      <form method="post" onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div className="max-h-[60vh] overflow-y-auto mb-4">
          <Input
            label="Repository URL"
            placeholder="Enter your github repo url"
            required
            error={errors["githubRepoURL"]}
            {...register("githubRepoURL")}
          />
        </div>
        <div className="flex justify-between">
          <div className="flex-1" />
          <div className="flex gap-2">
            <button
              disabled={isCallingAPI}
              className="btn btn-secondary"
              type="button"
              onClick={close}
            >
              Cancel
            </button>
            <button className="btn btn-primary" disabled={isCallingAPI}>
              Import
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
