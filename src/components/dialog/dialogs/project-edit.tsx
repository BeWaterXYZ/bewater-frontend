import { Input, Select, TextArea } from "@/components/form/control";

import { Dialogs } from "../store";

import { useLoadingStoreAction } from "@/components/loading/store";
import { useToastStore } from "@/components/toast/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { OptionItem } from "@/constants/options/types";
import { ProjectTagSetOptions } from "@/constants/options/project-tag";
import { obtainProjectTagOptions } from "@/constants/options/project-tag";
import { validationSchema } from "@/schema";
import { useMutationUpdateTeam } from "@/services/team.query";

const schema = z
  .object({
    title: validationSchema.text,
    description: validationSchema.text,
    tags: validationSchema.tags,
    bountyTrack: z.array(z.string()),
  })
  .required();

export type Inputs = z.infer<typeof schema>;

interface ProjectEditDialogProps {
  data: NonNullable<Dialogs["project_edit"]>;
  close: () => void;
}

export default function ProjectEditDialog({
  data,
  close,
}: ProjectEditDialogProps) {
  const { showLoading, dismissLoading } = useLoadingStoreAction();
  const addToast = useToastStore((s) => s.add);
  const mutation = useMutationUpdateTeam();

  const onSubmit = async (formData: Inputs) => {
    showLoading();
    try {
      let payload = {
        projectName: formData.title,
        projectDescription: formData.description,
        projectTags: formData.tags,
        projectBountyTrack: formData.bountyTrack,
      };
      await mutation.mutateAsync({ teamId: data.team?.id!, payload });
      addToast({
        type: "success",
        title: "Project updated",
        description: "",
      });
      close();
    } catch (err) {
      console.log(err);
    } finally {
      dismissLoading();
    }
  };
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: data.name ?? "",
      description: data.description ?? "",
      tags: data.tags ?? [],
      bountyTrack: data.bountyTrack ?? [],
    },
  });
  data.team;

  let hackProjectTagSetOptions: OptionItem<string>[] = ProjectTagSetOptions;
  if (data.team?.challenge?.track && data.team.challenge.track.length > 0) {
    hackProjectTagSetOptions = obtainProjectTagOptions(
      data.team.challenge.track
    );
  }

  let hackBountyTrackSetOptions: OptionItem<string>[] = ProjectTagSetOptions;
  if (
    data?.team?.challenge?.otherInfo &&
    (data.team.challenge.otherInfo.bountyTrack as string[]).length > 0
  ) {
    hackBountyTrackSetOptions = obtainProjectTagOptions(
      data.team.challenge.otherInfo.bountyTrack as string[]
    );
  }

  return (
    <div className="flex flex-col justify-center  w-[80vw]  max-w-md ">
      <p className="body-2 mb-4">Edit Project Detail</p>

      <form method="post" onSubmit={handleSubmit(onSubmit)} className="">
        <Input
          label="Project title"
          required
          placeholder="Enter your project title"
          error={errors["title"]}
          {...register("title")}
        />

        <Select
          label="Project Tag"
          required
          isSingle={data.team.challengeId === "136" ? true : false}
          maxSelections={5}
          options={hackProjectTagSetOptions}
          error={errors["tags"]}
          control={control}
          {...register("tags")}
        />

        {data.team.challengeId === "136" && (
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
        )}
        <TextArea
          label="Project Description"
          placeholder="Enter your project description"
          error={errors["description"]}
          {...register("description")}
        />

        <div className="flex justify-between">
          <div className="flex-1" />
          <div className="flex gap-2">
            <button
              className="btn btn-secondary "
              type="button"
              onClick={close}
            >
              Cancel
            </button>
            <button className="btn btn-primary ">{"Update"}</button>
          </div>
        </div>
      </form>
    </div>
  );
}
