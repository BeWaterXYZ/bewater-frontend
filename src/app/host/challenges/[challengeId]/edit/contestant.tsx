"use client";
import { TextArea } from "@/components/form/textarea";
import { useMutationUpdateChallenge } from "@/services/challenge.query";
import { Challenge } from "@/services/types";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    invites: z.string(),
  })
  .required();

export type Inputs = z.infer<typeof schema>;

export function EditContestant({ challenge }: { challenge: Challenge }) {
  let [open, openSet] = useState(false);
  let [sameTime, sameTimeSet] = useState(false);
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
      // todo 时间线编辑2.0。当前隐藏 NOP 阶段
      invites: "",
    },
  });

  const onSubmit = async (formData: Inputs) => {
    try {
      openSet(false);
    } catch (err) {}
  };
  return (
    <Dialog.Root open={open} onOpenChange={(open) => openSet(open)}>
      <Dialog.Trigger asChild>
        <button className="btn btn-secondary hidden">Contestant management </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 z-20 fixed inset-0" />
        <Dialog.Content
          className="z-30 bg-[#141527]  fixed top-0 right-0 h-full  w-full md:w-[500px] p-8 overflow-y-auto"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <Dialog.Title className="text-xl leading-8 text-white py-4 mb-4 border-b  border-b-white/20">
            Contestant Management
          </Dialog.Title>
          <form method="post" onSubmit={handleSubmit(onSubmit)} className="">
            <div>
              <TextArea
                label="Invite Contestant"
                placeholder="Please enter the email address you wish to invite. Batch invitations are supported, one email per line."
                rows={5}
                {...register("invites")}
                error={errors["invites"]}
              />
              <div className="flex mt-6 justify-end">
                <button className="btn btn-primary" type="submit">
                  Invite
                </button>
              </div>
            </div>
          </form>
          <Dialog.Title className="text-xl leading-8 text-white py-4 mb-4 border-b  border-b-white/20">
            Contestant list
          </Dialog.Title>

          <div>
            <div className="flex gap-2 justify-between border border-grey-800 bg-grey-900 rounded-sm px-4 py-2">
              <div>avatar</div>
              <div className="body-2 text-grey-500">status</div>
              <div>op</div>
            </div>
          </div>
          <div></div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
