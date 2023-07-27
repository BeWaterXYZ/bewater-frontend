"use client";
import { Input } from "@/components/form/input";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from "@/validations";
import { z } from "zod";
import { Challenge } from "@/services/types";
import { UploaderInput } from "@/components/form/uploader";
import { TextArea } from "@/components/form/textarea";
import { updateChallenge } from "@/services/challenge";
import { useMutationUpdateChallenge } from "@/services/challenge.query";

const schema = z
  .object({
    description: validationSchema.text,
    telegramLink: z.string(),
    wechatURL: z.string(),
    discordLink: z.string(),
    twitterLink: z.string(),
  })

export type Inputs = z.infer<typeof schema>;

export function EditIntro({ challenge }: { challenge: Challenge }) {
  let [open, openSet] = useState(false);
  let mutation = useMutationUpdateChallenge(challenge.id);
  let {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: challenge.description,
      telegramLink: challenge.telegramLink??'',
      wechatURL: challenge.wechatURL??'',
      discordLink: challenge.discordLink??'',
      twitterLink: challenge.twitterLink??'',
    },
  });

  const onSubmit = async (formData: Inputs) => {
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
            Introduction
          </Dialog.Title>
          <form method="post" onSubmit={handleSubmit(onSubmit)} className="">
            <fieldset className="">
              <TextArea
                label="Introduction"
                rows={5}
                {...register("description")}
                error={errors["description"]}
              />

              <Input
                label="Telegram link"
                {...register("telegramLink")}
                error={errors["telegramLink"]}
              />
              <Input
                label="Discord link"
                {...register("discordLink")}
                error={errors["discordLink"]}
              />
              <Input
                label="Twitter link"
                {...register("twitterLink")}
                error={errors["twitterLink"]}
              />
              <UploaderInput
                label=" Wechat QR code"
                title="Upload Wechat QR code "
                subTitlte="PNG, 24px height"
                height={140}
                width={200}
                max={1}
                control={control}
                name="wechatURL"
                error={errors["wechatURL"]}
                onValueChange={(v) => {
                  setValue("wechatURL", v as string);
                }}
              />
            </fieldset>

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
