import { useRef, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { z } from "zod";

import { useAlert } from "@/components/alert/store";
import { Input, Select, TextArea } from "@/components/form/control";
import { useLoadingStoreAction } from "@/components/loading/store";
import { useToastStore } from "@/components/toast/store";
import { COUNTRIES } from "@/constants/options/country";
import {
  obtainProjectTagOptions,
  ProjectTagSetOptions,
} from "@/constants/options/project-tag";
import { RoleSetOptions } from "@/constants/options/role";
import { SkillSetOptions } from "@/constants/options/skill";
import { OptionItem } from "@/constants/options/types";
import { useNavigator } from "@/hooks/useNavigator";
import { validationSchema } from "@/schema";
import { updateTeam } from "@/services/team";
import {
  useMutaionCreateTeam,
  useMutaionDismissTeam,
} from "@/services/team.query";
import { Challenge, Project, Team } from "@/services/types";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "@radix-ui/react-radio-group";

import { Dialogs, useDialogStore } from "../store";
import TeamCreateForm_151 from "./team-form/campaign-151";

export type TeamCreateFormProps = {
  form: {
    close: () => void;
    control: Control<Inputs>;
    data: {
      challenge?: Challenge;
      team?: Team & Project;
    };
    errors: FieldErrors<Inputs>;
    hackBountyTrackSetOptions: OptionItem<string>[];
    hackProjectTagSetOptions: OptionItem<string>[];
    handleSubmit: UseFormHandleSubmit<Inputs>;
    isCallingAPI: boolean;
    isEditing: boolean;
    onDismiss: () => Promise<void>;
    onInvalid: (e: any) => void;
    onSubmit: (formData: Inputs) => Promise<void>;
    radio: string;
    radioChecked: string;
    radioLabel: string;
    register: UseFormRegister<Inputs>;
    RoleSetOptions: OptionItem<string>[];
    SkillSetOptions: OptionItem<string>[];
  };
};

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
      nation: validationSchema.nation,
      pastGrant:
        challengeId === "135" || challengeId === "151"
          ? z.string()
          : validationSchema.text,
      builtDate: z.string(),
      deckURI:
        challengeId === "136" || challengeId === "135" || challengeId === "144"
          ? z.string()
          : validationSchema.text,
      demoURI:
        challengeId === "144" || challengeId === "151"
          ? validationSchema.text
          : z.string(),
      siteURI: challengeId === "151" ? validationSchema.text : z.string(),
      githubURI:
        challengeId === "136" || challengeId === "144" || challengeId === "151"
          ? validationSchema.text
          : z.string(),
      contact: validationSchema.text,
      recommendedFrom: z.string(),
      userEmail: z.string().email(),
      membersCount: z.number().int().positive(),
      offlineDemoDay: z.string().refine((v) => v === "0" || v === "1", {
        message: "Please choose an option",
      }),
      onSiteDays: challengeId === "146" ? validationSchema.text : z.string(),
      creditsInterested:
        challengeId === "146"
          ? z.string().refine((v) => v === "0" || v === "1", {
              message: "Please choose an option",
            })
          : z.string(),
      customSelect1:
        challengeId === "151" ? validationSchema.customSelect1 : z.string(),
      customSelect2:
        challengeId === "151" ? validationSchema.customSelect2 : z.string(),
      customSelect3:
        challengeId === "151" ? validationSchema.customSelect3 : z.string(),
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
      onSiteDays: team?.project.onSiteDays ?? "",
      creditsInterested: team?.project.offlineDemoDay ? "1" : "0",
      customSelect1: team?.project.customSelect1
        ? [team?.project.customSelect1]
        : [],
      customSelect2: team?.project.customSelect2
        ? [team?.project.customSelect2]
        : [],
      customSelect3: team?.project.customSelect3
        ? [team?.project.customSelect3]
        : [],
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
      data.team.challenge.track,
    );
  }

  let hackBountyTrackSetOptions: OptionItem<string>[] = ProjectTagSetOptions;
  if (
    data?.challenge?.otherInfo &&
    (data.challenge.otherInfo.bountyTrack as string[]).length > 0
  ) {
    hackBountyTrackSetOptions = obtainProjectTagOptions(
      data.challenge.otherInfo.bountyTrack as string[],
    );
  }
  if (
    isEditing &&
    data?.team?.challenge?.otherInfo &&
    (data.team.challenge.otherInfo.bountyTrack as string[]).length > 0
  ) {
    hackBountyTrackSetOptions = obtainProjectTagOptions(
      data.team.challenge.otherInfo.bountyTrack as string[],
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
          onSiteDays: formData.onSiteDays,
          creditsInterested: Number(formData.creditsInterested),
          customSelect1: formData.customSelect1,
          customSelect2: formData.customSelect2,
          customSelect3: formData.customSelect3,
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
          onSiteDays: formData.onSiteDays,
          creditsInterested: Number(formData.creditsInterested),
          customSelect1: formData.customSelect1,
          customSelect2: formData.customSelect2,
          customSelect3: formData.customSelect3,
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

  const formData = {
    close,
    control,
    data,
    errors,
    hackBountyTrackSetOptions,
    hackProjectTagSetOptions,
    handleSubmit,
    isCallingAPI,
    isEditing,
    onDismiss,
    onInvalid,
    onSubmit,
    radio,
    radioChecked,
    radioLabel,
    register,
    RoleSetOptions,
    SkillSetOptions,
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
              required={data.challenge?.id == "144"}
              error={errors["demoURI"]}
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
      ) : data.challenge?.id === "151" || data.team?.challengeId === "151" ? (
        <TeamCreateForm_151 form={formData} />
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
            {(data.challenge?.id === "144" ||
              data.team?.challengeId === "144") && (
              <Controller
                control={control}
                render={({ field }) => (
                  <Input
                    label="Team Members Count"
                    placeholder="Enter your team members count"
                    type="number"
                    value={field.value}
                    min="1"
                    required={data.challenge?.id == "144"}
                    error={errors["membersCount"]}
                    onChange={(e) => {
                      field.onChange(Number(e.target.value));
                    }}
                  />
                )}
                {...register("membersCount")}
              />
            )}
            {(data.challenge?.id === "146" ||
              data.team?.challengeId === "146") && (
              <Input
                label="How many days will you be onsite? (e.g., 3 days, 2 days (8th, 9th), 1 day (8th), Not available)"
                required
                placeholder="Enter your onsite days"
                error={errors["onSiteDays"]}
                {...register("onSiteDays")}
              />
            )}
            <Select
              id="select-nation"
              label={
                data.challenge?.id === "146" || data.team?.challengeId === "146"
                  ? "Where is your base located (e.g., Singapore)?"
                  : "Country"
              }
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
              label={
                data.challenge?.id === "146" || data.team?.challengeId === "146"
                  ? "Track"
                  : "Project Tag"
              }
              required
              isSingle={
                data.challenge?.id === "146" || data.team?.challengeId === "146"
              }
              maxSelections={
                data.challenge?.id === "146" || data.team?.challengeId === "146"
                  ? 1
                  : 5
              }
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
              required={
                data.challenge?.id !== "135" && data.challenge?.id !== "146"
              }
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
              required={data.challenge?.id !== "146"}
              error={errors["builtDate"]}
              {...register("builtDate")}
            />
            <Input
              label="Deck"
              required={
                data.challenge?.id !== "135" &&
                data.challenge?.id !== "144" &&
                data.challenge?.id !== "146"
              }
              placeholder="Enter your deck link"
              error={errors["deckURI"]}
              {...register("deckURI")}
            />
            {(data.challenge?.id == "144" ||
              data.team?.challengeId === "144") && (
              <Input
                label="GitHub Link"
                required={data.challenge?.id == "144"}
                placeholder="Enter your GitHub link"
                error={errors["githubURI"]}
                {...register("githubURI")}
              />
            )}
            <Input
              label="Demo"
              required={
                data.challenge?.id == "144" || data.team?.challengeId === "144"
              }
              placeholder="Enter your demo link"
              error={errors["demoURI"]}
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
            {data.challenge?.id === "146" && (
              <>
                <p className="block body-4 py-1 text-grey-500 font-bold mb-1">
                  AWS provides eligible startups with up to $100k credits. Are
                  you interested? *
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
                        id="creditsInterested1"
                        value="1"
                        onClick={() => field.onChange("1")}
                      >
                        <RadioGroupIndicator className={radioChecked} />
                      </RadioGroupItem>
                      <label
                        className={radioLabel}
                        htmlFor="creditsInterested1"
                      >
                        Yes
                      </label>
                      <RadioGroupItem
                        className={radio}
                        id="creditsInterested0"
                        value="0"
                        onClick={() => field.onChange("0")}
                      >
                        <RadioGroupIndicator className={radioChecked} />
                      </RadioGroupItem>
                      <label
                        className={radioLabel}
                        htmlFor="creditsInterested0"
                      >
                        No
                      </label>
                    </RadioGroup>
                  )}
                  {...register("creditsInterested")}
                />
              </>
            )}
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
