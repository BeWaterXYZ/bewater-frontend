"use client";
import { TextArea } from "@/components/form/textarea";
import { useToastStore } from "@/components/toast/store";
import {
  useFetchChallengeInvitation,
  useMutationInviteToChallenge,
} from "@/services/challenge.query";
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
  let addToast = useToastStore((s) => s.add);

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      invites: "",
    },
  });

  const mutation = useMutationInviteToChallenge(challenge.id);

  const onSubmit = async (formData: Inputs) => {
    let emails = formData.invites.split(/[,\n]/);
    sendInvite(emails);
  };

  const resend = (email: string) => () => {
    sendInvite([email]);
  };

  const sendInvite = async (emails: string[]) => {
    try {
      await mutation.mutateAsync(emails);
      addToast({
        type: "success",
        title: "Invite sent",
      });
    } catch (err) {}
  };

  const { data: invitations = [] } = useFetchChallengeInvitation(challenge.id);

  return (
    <Dialog.Root open={open} onOpenChange={(open) => openSet(open)}>
      <Dialog.Trigger asChild>
        <button className="btn btn-secondary ">Contestant management </button>
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

          <div className="flex flex-col gap-2">
            {invitations.map((i) => {
              return (
                <div
                  key={i.email}
                  className="flex items-center gap-2 justify-between border border-grey-800 bg-grey-900 rounded-sm px-4 py-2"
                >
                  <div className="body-2 ">{i.email}</div>
                  <div className="body-4 text-grey-500">{i.status}</div>
                  <div>
                    {i.status === "Joined" ? (
                      <button className="btn btn-secondary">Remove</button>
                    ) : i.status === "WaitingToJoin" ? (
                      <button
                        className="btn btn-secondary"
                        onClick={resend(i.email)}
                      >
                        Resend
                      </button>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
          <div></div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
