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
import { TextArea } from "@/components/form/textarea";
import { updateChallenge } from "@/services/challenge";
import { useMutationUpdateChallenge } from "@/services/challenge.query";
import { useDialogStore } from "@/components/dialog/store";

const schema = z.object({
  description: validationSchema.text,
  telegramLink: z.string(),
  wechatURL: z.string(),
  discordLink: z.string(),
  twitterLink: z.string(),
  challengeTags: z.array(z.string()),
});

export type Inputs = z.infer<typeof schema>;

// todo use tinymce
export function Intro({
  challenge,
  tinymce,
}: {
  challenge: Challenge;
  tinymce: any;
}) {
  // console.log(tinymce);
  const showDialog = useDialogStore((s) => s.open);

  let mutation = useMutationUpdateChallenge(challenge.id);
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
      description: challenge.description,
      telegramLink: challenge.telegramLink ?? "",
      wechatURL: challenge.wechatURL ?? "",
      discordLink: challenge.discordLink ?? "",
      twitterLink: challenge.twitterLink ?? "",
      challengeTags: challenge.challengeTags ?? [],
    },
  });

  const onSubmit = async (formData: Inputs) => {
    try {
      await mutation.mutateAsync({
        id: challenge.id,
        ...formData,
      });
    } catch (err) {}
  };
  return (
    <div className="font-secondary">
      <div className="z-30    top-0 right-0 h-full  w-full  p-8 overflow-y-auto">
        <div className="text-xl leading-8 text-white py-4 mb-4 border-b  border-b-white/20">
          Introduction
        </div>
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

            <div className="relative mb-4">
              <label className="block body-4 py-1 text-grey-500 font-bold mb-1">
                Challenge Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {watch("challengeTags").map((tag, index) => (
                  <div
                    key={index}
                    className="bg-grey-800 text-white px-2 py-1 rounded flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => {
                        const newTags = [...watch("challengeTags")];
                        newTags.splice(index, 1);
                        setValue("challengeTags", newTags);
                      }}
                      className="ml-2 text-grey-500 hover:text-white"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  showDialog("add_challenge_tag", {
                    onAdd: (tag) => {
                      setValue("challengeTags", [
                        ...watch("challengeTags"),
                        tag,
                      ]);
                    },
                  })
                }
                className="btn btn-secondary"
              >
                + Add Tag
              </button>
            </div>

            <UploaderInput
              label="Wechat QR code"
              title="Upload Wechat QR code "
              subTitlte="PNG, 24px height"
              height={140}
              width={447}
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
      </div>
    </div>
  );
}
