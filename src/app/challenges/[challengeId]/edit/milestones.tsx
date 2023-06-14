"use client";
import { Input } from "@/components/form/input";
import { Uploader } from "@/components/uploader";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Challenge } from "@/services/types";
import { DatePicker } from "@/components/form/datepicker";
import { useMutationUpdateChallenge } from "@/services/challenge.query";

const schema = z
  .object({
    milestones: z.array(
      z.object({
        dueDate: z.string(),
        stageName: z.string(),
      })
    ),
  })
  .required();

export type Inputs = z.infer<typeof schema>;

export function EditMilestones({ challenge }: { challenge: Challenge }) {
  let [open, openSet] = useState(false);
  let mutation = useMutationUpdateChallenge(challenge.id);

  let {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      milestones: challenge.milestones.map((ms) => ({
        ...ms,
        dueDate: ms.dueDate.substring(0, 10),
      })),
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "milestones", // unique name for your Field Array
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
          <Dialog.Title className="text-[20px] py-4 mb-4 border-b  border-b-white/20">
            Milestone Information
          </Dialog.Title>
          <form method="post" onSubmit={handleSubmit(onSubmit)} className="">
            <div>
              <div className="grid grid-cols-2 gap-4">
                <label className=" block text-[12px] my-2 text-grey-500">
                  Date
                </label>
                <label className=" block text-[12px] my-2 text-grey-500">
                  Milestone Name
                </label>
              </div>

              {fields.map((field, index) => {
                return (
                  <div className="grid grid-cols-2 gap-4 my-2" key={field.id}>
                    <DatePicker
                      {...register(`milestones.${index}.dueDate`)}
                      error={errors[`milestones`]?.[index]?.dueDate}
                    />
                    <Input disabled value={field.stageName} />
                  </div>
                );
              })}
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
