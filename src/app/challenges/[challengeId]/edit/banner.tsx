"use client";
import { Input } from "@/components/form/input";
import { Uploader } from "@/components/uploader";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from "@/validations";
import { z } from "zod";
import { Challenge } from "@/services/types";

const schema = z
  .object({
    title: validationSchema.text,
  })
  .required();

export type Inputs = z.infer<typeof schema>;

export function EditBanner({ challenge }: { challenge: Challenge }) {
  let [open, openSet] = useState(false);
  let [bg, bgSet] = useState<string[]>([]);
  let [hostImages, hostImagesSet] = useState<string[]>([]);

  let {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: challenge.title,
    },
  });

  let save = () => {
    // openSet(false);
  };
  const onSubmit = async (formData: Inputs) => {};
  return (
    <Dialog.Root open={open} onOpenChange={(open) => openSet(open)}>
      <Dialog.Trigger asChild>
        <button className="btn btn-secondary-invert ">Edit </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 z-20 fixed inset-0" />
        <Dialog.Content className="z-30 bg-[#141527]  fixed top-0 right-0 h-full  w-full md:w-[500px] p-8 overflow-y-auto">
          <Dialog.Title className="text-[20px] py-4 mb-4 border-b  border-b-white/20">
            Banner Information
          </Dialog.Title>
          <form method="post" onSubmit={handleSubmit(onSubmit)} className="">
            <div className="my-4">
              <label className=" block text-[12px] my-2 text-grey-500">
                Banner Image
              </label>
              <Uploader
                title="Upload the banner image"
                subTitlte="PNG or JPG, 1440*560px"
                max={1}
                height={160}
                width={400}
                urls={bg}
                onChange={(urls) => {
                  bgSet(urls);
                }}
              />
            </div>
            <div className="my-4">
              <label className="block text-[12px] my-2 text-grey-500">
                Host Logo
              </label>
              <Uploader
                title="Upload the host image"
                subTitlte="PNG , 24px height"
                height={140}
                width={200}
                max={10}
                urls={hostImages}
                onChange={(urls) => {
                  hostImagesSet(urls);
                }}
              />
            </div>
            <fieldset className="Fieldset">
              <label className="block text-[12px] my-2 text-grey-500">
                Campaign Title
              </label>
              <Input {...register("title")} error={errors["title"]} />
            </fieldset>
            <div className="flex mt-6 justify-end">
              <button className="btn btn-primary" type="submit" onClick={save}>
                Save{" "}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
