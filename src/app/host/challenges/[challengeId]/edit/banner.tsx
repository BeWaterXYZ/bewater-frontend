"use client";
import { Input } from "@/components/form/input";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from "@/schema";
import { z } from "zod";
import { Challenge } from "@/services/types";
import { UploaderInput } from "@/components/form/uploader";
import { Radio } from "@/components/form/radio";
import { DatePicker } from "@/components/form/datepicker";
import { LOCATION } from "@/constants";
import { useMutationUpdateChallenge } from "@/services/challenge.query";

export function EditBanner({ challenge }: { challenge: Challenge }) {
  let [open, openSet] = useState(false);
  let mutation = useMutationUpdateChallenge(challenge.id);

  let [isOnlineOnly, isOnlineOnlySet] = useState(
    challenge.location === LOCATION.ONLINE
  );

  const schema = z.object({
    title: validationSchema.text,
    hostIcon: validationSchema.image,
    bannerUrl: validationSchema.image,
    location: z.string(),
    city: isOnlineOnly ? z.string().optional() : validationSchema.text,
    startTime: validationSchema.date,
    endTime: validationSchema.date,
    joinLink: z.string().optional(),
    linkText: z.string().optional(),
  });

  type Inputs = z.infer<typeof schema>;
  let {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: challenge.title,
      hostIcon: challenge.hostIcon ?? "",
      bannerUrl: challenge.bannerUrl ?? "",
      location: challenge.location,
      city: challenge.city ?? "",
      linkText: challenge.linkText,
      joinLink: challenge.joinLink,
      // fix me
      startTime: challenge.startTime.substring(0, 10),
      endTime: challenge.endTime.substring(0, 10),
    },
  });
  watch((data) => {
    isOnlineOnlySet(data.location === LOCATION.ONLINE);
  });
  const onSubmit = async (formData: Inputs) => {
    console.log(formData);
    try {
      await mutation.mutateAsync({
        id: challenge.id,
        ...formData,
      });
      openSet(false);
    } catch (err) {}
  };
  return (
    <Dialog.Root open={open} onOpenChange={(open) => openSet(open)}>
      <Dialog.Trigger asChild>
        <button className="btn btn-secondary-invert ">Edit </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 z-20 fixed inset-0" />
        <Dialog.Content className="z-30 bg-[#141527]  fixed top-0 right-0 h-full  w-full md:w-[500px] p-8 overflow-y-auto">
          <Dialog.Title className="text-xl leading-8 text-white py-4 mb-4 border-b  border-b-white/20">
            Banner Information
          </Dialog.Title>
          <form method="post" onSubmit={handleSubmit(onSubmit)} className="">
            <div className="my-4">
              <UploaderInput
                label="Banner Image"
                title="Upload the banner image"
                subTitlte="PNG or JPG, 1440*560px"
                max={1}
                height={160}
                width={400}
                control={control}
                name="bannerUrl"
                error={errors["bannerUrl"]}
                onValueChange={(v) => {
                  setValue("bannerUrl", v as string);
                }}
              />
            </div>
            <div className="my-4">
              <UploaderInput
                label=" Host Logo"
                title="Upload the host image"
                subTitlte="PNG, 24px height"
                height={140}
                width={200}
                max={1}
                control={control}
                name="hostIcon"
                error={errors["hostIcon"]}
                onValueChange={(v) => {
                  setValue("hostIcon", v as string);
                }}
              />
            </div>
            <fieldset className="Fieldset">
              <label className="block text-xs text-grey-500 font-bold mb-2 group-hover:text-day group-focus:text-day transition-colors">
                Campaign Title
              </label>
              <Input {...register("title")} error={errors["title"]} />
            </fieldset>
            <>
              <Input
                label="Link URL"
                {...register("joinLink")}
                error={errors["joinLink"]}
              />
              <Input
                label="Link Text"
                {...register("linkText")}
                error={errors["linkText"]}
              />
            </>
            <Radio
              label="Campaign mode"
              control={control}
              error={errors["location"]}
              name="location"
              onValueChange={(v) => setValue("location", v)}
              options={[
                { value: LOCATION.ONLINE, label: "Online" },
                { value: LOCATION.OFFLINE, label: "Offline" },
                { value: LOCATION.MIXED, label: "Online + Offline" },
              ]}
            />
            {isOnlineOnly ? null : (
              <Input
                label="City"
                {...register("city")}
                error={errors["city"]}
              />
            )}
            <div className="grid grid-cols-2 gap-4">
              <DatePicker
                label="Start Date"
                control={control}
                onValueChange={(v) => setValue(`startTime`, v)}
                {...register("startTime")}
                error={errors["startTime"]}
              />
              <DatePicker
                control={control}
                label="End Date"
                onValueChange={(v) => setValue(`endTime`, v)}
                {...register("endTime")}
                error={errors["endTime"]}
              />
            </div>
            <div className="flex mt-6 justify-end">
              <button className="btn btn-primary" type="submit">
                Save{" "}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
