import type { TeamCreateFormProps } from "../team-create";

import Link from "next/link";

import { Input, Select, TextArea } from "@/components/form/control";

export const productStageOptions = [
  "Idea",
  "Demo",
  "MVP",
  "Testnet",
  "Mainnet",
].map((option) => ({
  value: option,
  label: option,
  classes: {
    container: "!rounded-full !bg-midnight h-5 my-0",
    text: "!text-grey-400 body-4 leading-5 !py-0",
  },
}));

export const fundingStageOptions = [
  "Pre-funding",
  "Series A",
  "Series B",
  "Series C+",
  "Listed",
].map((option) => ({
  value: option,
  label: option,
  classes: {
    container: "!rounded-full !bg-midnight h-5 my-0",
    text: "!text-grey-400 body-4 leading-5 !py-0",
  },
}));

export const supportDesiredOptions = [
  "APRO Oracle Service",
  "BNB Chain Greenfield",
  "Technical Support from BNB Chain",
  "VC Connection",
  "Grants",
].map((option) => ({
  value: option,
  label: option,
  classes: {
    container: "!rounded-full !bg-midnight h-5 my-0",
    text: "!text-grey-400 body-4 leading-5 !py-0",
  },
}));

export default function TeamCreateForm_151(props: TeamCreateFormProps) {
  const {
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
  } = props.form;
  return (
    <form method="post" onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <div className="max-h-[60vh] overflow-y-auto mb-4">
        <Input
          label="Project Title"
          required
          placeholder="Enter your project title"
          error={errors["title"]}
          {...register("title")}
        />
        <TextArea
          label="Project Description"
          required
          placeholder="Enter your project description"
          error={errors["description"]}
          {...register("description")}
        />
        <Select
          id="select-product-stage"
          label="Product Stage"
          required
          isSingle
          options={productStageOptions}
          error={errors["customSelect1"]}
          control={control}
          {...register("customSelect1")}
        />
        <Select
          id="select-funding-stage"
          label="Funding Stage"
          required
          isSingle
          options={fundingStageOptions}
          error={errors["customSelect2"]}
          control={control}
          {...register("customSelect2")}
        />
        <Input
          label="Team Name"
          placeholder="Enter your team name"
          required
          error={errors["name"]}
          {...register("name")}
        />
        <Input
          label="Team Description"
          placeholder="Enter your team description"
          required
          error={errors["description"]}
          {...register("description")}
        />
        <Select
          id="select-tags"
          label="Track"
          required
          isSingle
          options={hackProjectTagSetOptions}
          error={errors["tags"]}
          control={control}
          {...register("tags")}
        />
        <Select
          id="select-support-desired"
          label="Support Desired"
          required
          isSingle
          options={supportDesiredOptions}
          error={errors["customSelect3"]}
          control={control}
          {...register("customSelect3")}
        />
        <p className="block body-4 py-1 text-grey-500 font-bold mb-1">
          Have you joined our Telegram group?
          <Link href="https://t.me/+dXjSkxiqPkUyZWM1" className="underline">
            https://t.me/+dXjSkxiqPkUyZWM1
          </Link>
        </p>
        <Input
          label="If yes, please provide your Telegram ID"
          placeholder="Enter your Telegram ID"
          error={errors["contact"]}
          {...register("contact")}
        />
        <TextArea
          label="Hackathons participated in and rankings"
          required
          placeholder="Enter the Hackathons you have participated in and your rankings"
          error={errors["pastGrant"]}
          {...register("pastGrant")}
        />
        <Input
          label="Demo"
          required
          placeholder="Enter your demo link"
          error={errors["demoURI"]}
          {...register("demoURI")}
        />
        <Input
          label="Deck"
          required
          placeholder="Enter your deck link"
          error={errors["deckURI"]}
          {...register("deckURI")}
        />
        <Input
          label="GitHub Link"
          required
          placeholder="Enter your GitHub link"
          error={errors["githubURI"]}
          {...register("githubURI")}
        />
        <Input
          label="Official Website"
          placeholder="Enter your official website link"
          {...register("siteURI")}
        />
      </div>
      <div className="flex justify-between">
        {isEditing ? (
          <button className="btn btn-danger" type="button" onClick={onDismiss}>
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
  );
}
