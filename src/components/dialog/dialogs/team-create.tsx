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
import { obtainProjectTagOptions } from "@/constants/options/project-tag";
import { RoleSetOptions } from "@/constants/options/role";
import { SkillSetOptions } from "@/constants/options/skill";
import { useNavigator } from "@/hooks/useNavigator";
import { validationSchema } from "@/schema";
import {
  useMutaionCreateTeam,
  useMutaionDismissTeam,
} from "@/services/team.query";
import { Project, Team } from "@/services/types";
import { useRef, useState } from "react";
import { COUNTRIES } from "@/constants/options/country";
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "@radix-ui/react-radio-group";
import { off } from "process";
import { useUser } from "@clerk/nextjs";

const schema = (challengeId?: string) =>
  z
    .object({
      name: validationSchema.text,
      title: validationSchema.text,
      description: validationSchema.text,
      role: validationSchema.role,
      tags: validationSchema.tags,
      // bountyTrack:
      //   challengeId === "136"
      //     ? validationSchema.bountyTrack
      //     : z.array(z.string()),
      bountyTrack: z.array(z.string()),
      roles: validationSchema.roles,
      skills: validationSchema.skills,
      nation: z.array(z.string()).length(1, ""),
      pastGrant: challengeId === "135" ? z.string() : validationSchema.text,
      builtDate: z.string(),
      deckURI:
        challengeId === "136" || challengeId === "135"
          ? z.string()
          : validationSchema.text,
      demoURI: z.string(),
      siteURI: z.string(),
      githubURI: challengeId === "136" ? validationSchema.text : z.string(),
      contact: validationSchema.text,
      recommendedFrom: z.string(),
      userEmail: z.string().email(),
      membersCount: z.number().int().positive(),
      offlineDemoDay: z.string().refine((v) => v === "0" || v === "1", {
        message: "Please choose an option",
      }),
    })
    .required();

export type Inputs = z.infer<ReturnType<typeof schema>>;

export function useTeamCreateForm(team?: Team & Project, challengeId?: string) {
  return useForm<Inputs>({
    resolver: zodResolver(schema(challengeId || team?.challengeId)),
    defaultValues: {
      name: team?.name ?? "",
      title: team?.project.name ?? "",
      description: team?.project.description ?? "",
      role: team ? ["Frontend Developer"] : [],
      tags: team?.project.tags ?? [],
      bountyTrack: team?.project.bountyTrack ?? [],
      roles: team?.openingRoles ?? [],
      skills: team?.skills ?? [],
      nation: team?.nation ? [team?.nation] : [],
      // experience: team?.project.experience ? "1" : "0",
      pastGrant: team?.project.pastGrant ?? "",
      builtDate: team?.project.builtDate?.substr(0, 7) ?? "",
      deckURI: team?.project.deckURI ?? "",
      demoURI: team?.project.demoURI ?? "",
      siteURI: team?.project.siteURI ?? "",
      contact: team?.project.contact ?? "",
      recommendedFrom: team?.project.recommendedFrom ?? "",
      userEmail: useUser().user?.emailAddresses[0].emailAddress ?? "",
      membersCount: team?.project.membersCount ?? 1,
      offlineDemoDay: team?.project.offlineDemoDay ? "1" : "0",
      githubURI: team?.project.githubURI ?? "",
    },
  });
}

interface TeamCreateDialogProps {
  data: NonNullable<Dialogs["team_create"]>;
  close: () => void;
}

const radio = "bg-white w-5 h-5 rounded-full mr-1";
const radioChecked =
  "flex items-center justify-center relative w-full h-full rounded-full bg-day after:content-[''] after:block after:w-[8px] after:h-[8px] after:rounded-full after:bg-white";
const radioLabel = "font-secondary ml-2 text-sm leading-5 text-[#94A3B8] mr-4";

export default function TeamCreateDialog({
  data,
  close,
}: TeamCreateDialogProps) {
  const isEditing = !!data.team;

  let hackProjectTagSetOptions: OptionItem<string>[] = ProjectTagSetOptions;
  if (data?.challenge?.track && data.challenge.track.length > 0) {
    hackProjectTagSetOptions = obtainProjectTagOptions(data.challenge.track);
  }
  if (
    isEditing &&
    data.team?.challenge?.track &&
    data.team.challenge.track.length > 0
  ) {
    hackProjectTagSetOptions = obtainProjectTagOptions(
      data.team.challenge.track
    );
  }

  let hackBountyTrackSetOptions: OptionItem<string>[] = ProjectTagSetOptions;
  if (
    data?.challenge?.otherInfo &&
    (data.challenge.otherInfo.bountyTrack as string[]).length > 0
  ) {
    hackBountyTrackSetOptions = obtainProjectTagOptions(
      data.challenge.otherInfo.bountyTrack as string[]
    );
  }
  if (
    isEditing &&
    data?.team?.challenge?.otherInfo &&
    (data.team.challenge.otherInfo.bountyTrack as string[]).length > 0
  ) {
    hackBountyTrackSetOptions = obtainProjectTagOptions(
      data.team.challenge.otherInfo.bountyTrack as string[]
    );
  }

  const { showLoading, dismissLoading } = useLoadingStoreAction();
  const addToast = useToastStore((s) => s.add);
  const router = useNavigator("en");
  const createTeamMutaion = useMutaionCreateTeam();
  const dismissTeamMutation = useMutaionDismissTeam(data.team?.challengeId);
  const { confirm } = useAlert();
  const showDialog = useDialogStore((s) => s.open);
  const [isCallingAPI, setIsCallingAPI] = useState(false);

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
      await dismissTeamMutation.mutateAsync(data.team!.id);
      router.gotoTeamList(data.team!.challengeId);
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
      if (isEditing) {
        /**
         *  edit team
         */
        let payload = {
          name: formData.name,
          projectName: formData.title,
          projectDescription: formData.description,
          projectTags: formData.tags,
          projectBountyTrack: formData.bountyTrack,
          openingRoles: formData.roles,
          skills: formData.skills,
          nation: formData.nation[0],
          // expericence: Number(formData.experience),
          pastGrant: formData.pastGrant,
          builtDate: new Date(formData.builtDate.concat("-01")).toISOString(),
          deckURI: formData.deckURI,
          demoURI: formData.demoURI,
          siteURI: formData.siteURI,
          contact: formData.contact,
          recommendedFrom: formData.recommendedFrom,
          githubURI: formData.githubURI,
          membersCount: formData.membersCount,
          offlineDemoDay: Number(formData.offlineDemoDay),
        };
        let res = await updateTeam({ teamId: data.team?.id!, payload });
        addToast({
          type: "success",
          title: "Team info updated",
          description: "",
        });
        router.refresh();
      } else {
        /**
         * create new team
         */
        let payload = {
          name: formData.name,
          projectName: formData.title,
          projectDescription: formData.description,
          projectTags: formData.tags,
          projectBountyTrack: formData.bountyTrack,
          challengeId: data.challenge!.id,
          openingRoles: formData.roles,
          skills: formData.skills,
          nation: formData.nation[0],
          leaderRole: formData.role[0],
          // expericence: Number(formData.experience),
          pastGrant: formData.pastGrant,
          builtDate: new Date(formData.builtDate.concat("-01")).toISOString(),
          deckURI: formData.deckURI,
          demoURI: formData.demoURI,
          siteURI: formData.siteURI,
          contact: formData.contact,
          recommendedFrom: formData.recommendedFrom,
          userEmail: formData.userEmail,
          githubURI: formData.githubURI,
          membersCount: formData.membersCount,
          offlineDemoDay: Number(formData.offlineDemoDay),
        };

        let res = await createTeamMutaion.mutateAsync(payload);
        if (res.leaderAlreadyInChallenge) {
          addToast({
            type: "error",
            title: "Already in challenge",
            description: "You already have a team",
          });
        } else if (res.team) {
          router.gotoTeam(data.challenge!.id, res.team.id);

          // addToast({
          //   type: 'success',
          //   title: 'team created',
          //   description: '',
          // });

          showDialog("team_created", {
            challenge: data.challenge!,
            teamId: res.team.id,
          });
        }
      }
      close();
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
  } = useTeamCreateForm(data.team, data.challenge?.id);

  const refSkillNeeded = useRef<HTMLSelectElement>(null);

  const onInvalid = (e: any) => {
    console.log("invalid", e);
  };

  const customRegister = (name: keyof Inputs, options?: any) => {
    const { ref, ...field } = register(name, options);

    const customRef = (instance: any) => {
      setTimeout(() => ref(instance));
    };

    return { ...field, ref: customRef };
  };

  return (
    <div className="w-[80vw] max-w-md">
      <p className="font-secondary text-base text-gray-200 leading-[30px] mb-4">
        {isEditing ? "Edit Team" : "Create a team"}
      </p>
      {data.challenge?.id === "136" || data.team?.challengeId === "136" ? (
        <form method="post" onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <div className="max-h-[60vh] overflow-y-auto mb-4">
            <Input
              label="Team Name"
              placeholder="Enter your team name"
              required
              error={errors["name"]}
              {...register("name")}
            />
            <Controller
              control={control}
              render={({ field }) => (
                <Input
                  label="Team Members Count"
                  placeholder="Enter your team members count"
                  type="number"
                  value={field.value}
                  min="1"
                  required
                  error={errors["membersCount"]}
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                  }}
                />
              )}
              {...register("membersCount")}
            />
            <p className="block body-4 py-1 text-grey-500 font-bold mb-1">
              Join offline demo day? *
            </p>
            <Controller
              control={control}
              render={({ field }) => (
                <RadioGroup
                  className="flex items-center mb-4"
                  {...field}
                  value={field.value.toString()}
                >
                  <RadioGroupItem
                    className={radio}
                    id="offlineDemoDay1"
                    value="1"
                    onClick={() => field.onChange("1")}
                  >
                    <RadioGroupIndicator className={radioChecked} />
                  </RadioGroupItem>
                  <label className={radioLabel} htmlFor="offlineDemoDay1">
                    Yes
                  </label>
                  <RadioGroupItem
                    className={radio}
                    id="offlineDemoDay0"
                    value="0"
                    onClick={() => field.onChange("0")}
                  >
                    <RadioGroupIndicator className={radioChecked} />
                  </RadioGroupItem>
                  <label className={radioLabel} htmlFor="offlineDemoDay0">
                    No
                  </label>
                </RadioGroup>
              )}
              {...register("offlineDemoDay")}
            />
            <Select
              id="select-nation"
              label="Country"
              required
              isSingle
              options={COUNTRIES}
              error={errors["nation"]}
              control={control}
              {...register("nation")}
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
              isSingle
              options={hackProjectTagSetOptions}
              error={errors["tags"]}
              control={control}
              {...register("tags")}
            />
            <Select
              id="select-bountyTrack"
              label="Bounty Track"
              // required
              maxSelections={5}
              options={hackBountyTrackSetOptions}
              error={errors["bountyTrack"]}
              control={control}
              {...register("bountyTrack")}
            />
            <TextArea
              label="Project Description"
              required
              placeholder="Enter your project description"
              error={errors["description"]}
              {...register("description")}
            />
            {isEditing ? null : (
              <Select
                id="select-role"
                label="You’re going to play"
                required
                isSingle
                options={RoleSetOptions}
                error={errors["role"]}
                control={control}
                {...register("role")}
              />
            )}
            <Select
              id="select-roles"
              label="Roles Needed"
              isSingle
              options={RoleSetOptions}
              error={errors["roles"]}
              control={control}
              {...register("roles")}
            />
            <Select
              id="select-skills"
              label="Skill Needed"
              maxSelections={10}
              options={SkillSetOptions}
              error={errors["skills"]}
              control={control}
              {...register("skills")}
            />
            <TextArea
              label="Awards, grants or funding received in the past (if any)"
              required
              placeholder="Enter your past awards, grants or funding information"
              error={errors["pastGrant"]}
              {...register("pastGrant")}
            />
            <Input
              label="When was your project built? (please specify the year and month.)"
              type="month"
              max={new Date().toISOString().substring(0, 7)}
              pattern="[0-9]{4}-[0-9]{2}"
              placeholder="YYYY-MM"
              required
              error={errors["builtDate"]}
              {...register("builtDate")}
            />
            <Input
              label="GitHub Link"
              required
              placeholder="Enter your GitHub link"
              error={errors["githubURI"]}
              {...register("githubURI")}
            />
            <Input
              label="Demo"
              placeholder="Enter your demo link"
              {...register("demoURI")}
            />
            <Input
              label="Official Website"
              placeholder="Enter your official website link"
              {...register("siteURI")}
            />
            <Input
              label="WeChat / Telegram"
              required
              placeholder="Enter your WeChat / Telegram ID"
              error={errors["contact"]}
              {...register("contact")}
            />
            <Input
              label="From which community or person were you recommended to register? (if any)"
              placeholder="Enter the community or person's name"
              {...register("recommendedFrom")}
            />
          </div>
          <div className="flex justify-between">
            {isEditing ? (
              <button
                className="btn btn-danger"
                type="button"
                onClick={onDismiss}
              >
                Dismiss
              </button>
            ) : null}
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
                {isEditing ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <form method="post" onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <div className="max-h-[60vh] overflow-y-auto mb-4">
            <Input
              label="Team Name"
              placeholder="Enter your team name"
              required
              error={errors["name"]}
              {...register("name")}
            />
            <Select
              id="select-nation"
              label="Country"
              required
              isSingle
              options={COUNTRIES}
              error={errors["nation"]}
              control={control}
              {...register("nation")}
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
              options={hackProjectTagSetOptions}
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
            {isEditing ? null : (
              <Select
                id="select-role"
                label="You’re going to play"
                required
                isSingle
                options={RoleSetOptions}
                error={errors["role"]}
                control={control}
                {...register("role")}
              />
            )}
            <Select
              id="select-roles"
              label="Roles Needed"
              isSingle
              options={RoleSetOptions}
              error={errors["roles"]}
              control={control}
              {...register("roles")}
            />
            <Select
              id="select-skills"
              label="Skill Needed"
              maxSelections={10}
              options={SkillSetOptions}
              error={errors["skills"]}
              control={control}
              {...register("skills")}
            />
            {/* <p className="block body-4 py-1 text-grey-500 font-bold mb-1">
            Have you participated in a hackathon before? *
          </p>
          <Controller control={control} render={({ field }) => (
            <RadioGroup
              className="flex items-center mb-4"
              {...field}
            >
              <RadioGroupItem className={radio} id="experience1" value="1" onClick={() => field.onChange("1")}>
                <RadioGroupIndicator className={radioChecked} />
              </RadioGroupItem>
              <label className={radioLabel} htmlFor="experience1">
                Yes
              </label>
              <RadioGroupItem className={radio} id="experience0" value="0" onClick={() => field.onChange("0")}>
                <RadioGroupIndicator className={radioChecked} />
              </RadioGroupItem>
              <label className={radioLabel} htmlFor="experience0">
                No
              </label>
            </RadioGroup>
          )} {...register('experience')} /> */}
            <TextArea
              label="Awards, grants or funding received in the past (if any)"
              required={data.challenge?.id !== "135"}
              placeholder="Enter your past awards, grants or funding information"
              error={errors["pastGrant"]}
              {...register("pastGrant")}
            />
            <Input
              label="When was your project built? (please specify the year and month.)"
              type="month"
              max={new Date().toISOString().substring(0, 7)}
              pattern="[0-9]{4}-[0-9]{2}"
              placeholder="YYYY-MM"
              required
              error={errors["builtDate"]}
              {...register("builtDate")}
            />
            <Input
              label="Deck"
              required={data.challenge?.id !== "135"}
              placeholder="Enter your deck link"
              error={errors["deckURI"]}
              {...register("deckURI")}
            />
            <Input
              label="Demo"
              placeholder="Enter your demo link"
              {...register("demoURI")}
            />
            <Input
              label="Official Website"
              placeholder="Enter your official website link"
              {...register("siteURI")}
            />
            <Input
              label="WeChat / Telegram"
              required
              placeholder="Enter your WeChat / Telegram ID"
              error={errors["contact"]}
              {...register("contact")}
            />
            <Input
              label="From which community or person were you recommended to register? (if any)"
              placeholder="Enter the community or person's name"
              {...register("recommendedFrom")}
            />
          </div>
          <div className="flex justify-between">
            {isEditing ? (
              <button
                className="btn btn-danger"
                type="button"
                onClick={onDismiss}
              >
                Dismiss
              </button>
            ) : null}
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
                {isEditing ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
