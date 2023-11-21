import { Select, TextArea } from "@/components/form/control";
import { UserSearch } from "@/components/form/control/user-search";
import { useLoadingStoreAction } from "@/components/loading/store";
import { useToastStore } from "@/components/toast/store";
import { RoleSetOptions } from "@/constants/options/role";
import { validationSchema } from "@/schema";
import { sendGroupingRequest } from "@/services/notification";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialogs, useDialogStore } from "../store";

const schema = z.object({
  user: validationSchema.userId,
  role: validationSchema.role,
  message: z.string().optional(),
});

type Inputs = z.infer<typeof schema>;

interface RatingJudgeInviteDialogProps {
  data: NonNullable<Dialogs["rating_judge_invite"]>;
  close: () => void;
}
export default function RatingJudgeInviteDialog({
  data,
  close,
}: RatingJudgeInviteDialogProps) {
  const { showLoading, dismissLoading } = useLoadingStoreAction();
  let showDialog = useDialogStore((s) => s.open);

  const addToast = useToastStore((s) => s.add);
  const onSubmit = async (formData: Inputs) => {
    showLoading();
    try {
      addToast({
        type: "success",
        title: "Invitation sent!",
        description: "please wait for team member to accept",
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
      close();
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
      message: "",
      role: [],
    },
  });

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
    </div>
  );
}
