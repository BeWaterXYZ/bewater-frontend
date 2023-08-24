"use client";
import { Input } from "@/components/form/input";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from "@/schema";
import { z } from "zod";
import { Challenge } from "@/services/types";
import { TextArea } from "@/components/form/textarea";
import { UploaderInput } from "@/components/form/uploader";
import { useMutationUpdateChallenge } from "@/services/challenge.query";
import { ArrowDownIcon, ArrowUpIcon, Cross2Icon } from "@radix-ui/react-icons";

const schema = z
  .object({
    judges: z.array(
      z.object({
        id: z.string().optional(),
        name: validationSchema.zhName,
        title: z.string().nullable(),
        avatarURI: validationSchema.text,
        description: z.string().nullable(),
        twitterLink: z.string().nullable(),
      })
    ),
  })
  .required();

export type Inputs = z.infer<typeof schema>;

export function EditJudges({ challenge }: { challenge: Challenge }) {
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
      judges: challenge.judges,
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "judges", // unique name for your Field Array
    }
  );

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
            Judge Information
          </Dialog.Title>
          <form method="post" onSubmit={handleSubmit(onSubmit)} className="">
            {fields.map((field, index) => {
              return (
                <div
                  className="relative mb-4 border-b border-grey-800"
                  key={field.id}
                >
                  <Input
                    label="Judge Name"
                    {...register(`judges.${index}.name`)}
                    error={errors.judges?.[index]?.name}
                  />
                  <UploaderInput
                    control={control}
                    label={"Judge Avatar"}
                    name={`judges.${index}.avatarURI`}
                    title="Upload Avatar"
                    subTitlte="JPG/PNG, 180x180px"
                    error={errors.judges?.[index]?.avatarURI}
                    max={1}
                    width={200}
                    height={200}
                    onValueChange={(v) => {
                      setValue(`judges.${index}.avatarURI`, v as string);
                    }}
                  />
                  <TextArea
                    label="Judge Title"
                    {...register(`judges.${index}.title`)}
                    error={errors.judges?.[index]?.title}
                  />
                  <TextArea
                    label="Detail Info"
                    {...register(`judges.${index}.description`)}
                    error={errors.judges?.[index]?.description}
                  />
                  <Input
                    label="Twitter Link"
                    {...register(`judges.${index}.twitterLink`)}
                    error={errors.judges?.[index]?.twitterLink}
                  />

                  <div className="absolute right-0 top-0 flex ">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        move(index, Math.max(index - 1, 0));
                      }}
                    >
                      <ArrowUpIcon className="mr-1 text-grey-500" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        move(index, Math.min(index + 1, fields.length - 1));
                      }}
                    >
                      <ArrowDownIcon className="mr-1 text-grey-500" />
                    </button>
                    <button
                      className="text-grey-300 flex items-center text-[12px]"
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      <Cross2Icon className="mr-1 text-grey-500" />
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}

            <button
              type="button"
              className="text-[12px] text-grey-300"
              onClick={() => {
                append({
                  name: "",
                  title: "",
                  avatarURI: "",
                  twitterLink: "",
                  description: "",
                });
              }}
            >
              + Add a new judge
            </button>
            <div className="flex mt-6 justify-end">
              <button className="btn btn-primary" type="submit">
                Save
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
