"use client";
import { Input } from "@/components/form/input";
import { UploaderInput } from "@/components/form/uploader";
import { useMutationUpdateChallenge } from "@/services/challenge.query";
import { Challenge, MetaData } from "@/services/types";
import { validationSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SectionEditProps } from "../../section";

export function EditHero({
  data,
  challenge,
  children,
  section,
  lang,
}: SectionEditProps) {
  let [open, openSet] = useState(false);
  let mutation = useMutationUpdateChallenge(challenge.id);

  const schema = z
    .object({
      background: validationSchema.image,
      icon: validationSchema.image,
      title: validationSchema.text,
      secondaryTitle: validationSchema.text,
      tertiaryTitle: validationSchema.text,
    })
    .required();

  type Inputs = z.infer<typeof schema>;
  let {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      icon: data.icon,
      background: data.background,
      title: data.title ?? "",
      secondaryTitle: data.secondaryTitle ?? "",
      tertiaryTitle: data.tertiaryTitle ?? "",
    },
  });

  const onSubmit = async (formData: Inputs) => {
    console.log(formData);
    let metadata = {
      ...challenge.metadata,

      [lang]: {
        ...challenge.metadata[lang],
        sections: challenge.metadata[lang].sections.map((sec) => {
          if (sec.id === section.id) {
            return { ...sec, data: formData };
          } else return sec;
        }),
      } as MetaData,
    };

    try {
      await mutation.mutateAsync({
        id: challenge.id,
        metadata,
      });
      openSet(false);
    } catch (err) {}
  };
  return (
    <Dialog.Root open={open} onOpenChange={(open) => openSet(open)}>
      <Dialog.Trigger asChild>
        {children ? (
          children
        ) : (
          <button className="btn btn-secondary-invert ">Edit </button>
        )}
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
                name="background"
                error={errors["background"]}
                onValueChange={(v) => {
                  setValue("background", v as string);
                }}
              />
            </div>
            <div className="my-4">
              <UploaderInput
                label="Logo"
                title="Upload the host image"
                subTitlte="PNG, 24px height"
                height={140}
                width={200}
                max={1}
                control={control}
                name="icon"
                error={errors["icon"]}
                onValueChange={(v) => {
                  setValue("icon", v as string);
                }}
              />
            </div>
            <Input
              label="Title"
              {...register("title")}
              error={errors["title"]}
            />
            <Input
              label="Secondary Title"
              {...register("secondaryTitle")}
              error={errors["secondaryTitle"]}
            />
            <Input
              label="Tertiary Title"
              {...register("tertiaryTitle")}
              error={errors["tertiaryTitle"]}
            />

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
