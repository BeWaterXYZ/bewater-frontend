import { Avatar } from "@/components/avatar/avatar";
import { UserSearch } from "@/components/form/control/user-search";
import { useLoadingStoreAction } from "@/components/loading/store";
import { useToastStore } from "@/components/toast/store";
import { validationSchema } from "@/schema";
import {
  useFetchChallengeById,
  useMutationDeleteRatingJudge,
  useMutationInviteRatingJudge,
} from "@/services/challenge.query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialogs } from "../store";
import { Challenge, UserID } from "@/services/types";
import { useState } from "react";

const schema = z.object({
  user: validationSchema.userId,
});

type Inputs = z.infer<typeof schema>;

interface RatingJudgeInviteDialogProps {
  data: NonNullable<Dialogs["rating_judge_invite"]>;
  close: () => void;
}

function RatingJudgeInviteDialog({ challenge }: { challenge: Challenge }) {
  const { showLoading, dismissLoading } = useLoadingStoreAction();
  let mutation = useMutationInviteRatingJudge(challenge.id);
  let removeMutation = useMutationDeleteRatingJudge(challenge.id);

  const addToast = useToastStore((s) => s.add);
  const onSubmit = async (formData: Inputs) => {
    showLoading();
    try {
      await mutation.mutateAsync(formData.user);
      addToast({
        type: "success",
        title: "Judge added",
        description: "",
      });
    } catch (err) {
      console.log(err);
      addToast({
        type: "error",
        title: "Request not sent!",
        description: "please try again later",
      });
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
      user: "",
    },
  });

  const removeRatingJudge = (userId: UserID) => () => {
    removeMutation.mutateAsync(userId);
  };

  return (
    <div className="flex flex-col justify-center  w-[80vw]  max-w-md ">
      <p className="heading-6">Judges</p>
      <p className="body-3 text-grey-500">
        Judges can rate the project on the project introduction page.
      </p>

      <form
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex items-center"
      >
        <div className="flex-1">
          <UserSearch
            label="Name"
            required
            error={errors["user"]}
            control={control}
            {...register("user")}
          />
        </div>

        <div className="mb-1">
          <button className="btn btn-secondary-invert">Add Judges</button>
        </div>
      </form>

      <div>
        {challenge.reviewers.map((rv) => {
          return (
            <div
              key={rv.userId}
              className="bg-[#0B0C24] border border-[#24254E] p-4 rounded flex justify-between items-center my-2"
            >
              <div className="flex gap-2">
                <div>
                  <Avatar className="w-8 h-8" />
                </div>
                <div>
                  <p className="body-2">
                    {rv.fullName || rv.userName || rv.firstName}
                  </p>
                  <p className="body-3 text-grey-600">{rv.email}</p>
                </div>
              </div>
              <div>
                <button
                  className="btn btn-secondary"
                  onClick={removeRatingJudge(rv.userId)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function RatingJudgeInviteDialogWrapper({
  data,
}: RatingJudgeInviteDialogProps) {
  let { data: challenge } = useFetchChallengeById(data.challengeId);
  if (!challenge) return null;
  return <RatingJudgeInviteDialog challenge={challenge} />;
}
