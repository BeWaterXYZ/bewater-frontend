import clsx from "clsx";

import { checkUsername, GetUserProfileByIdResponse } from "@/services/user";

import type { FieldValues } from "react-hook-form";
import { Input, Select, TextArea } from "@/components/form/control";
import { useToastStore } from "@/components/toast/store";
import { useLoadingStoreAction } from "@/components/loading/store";
import { RoleSetOptions, RoleSetScheme } from "@/constants/options/role";
import { SkillSetOptions, SkillSetScheme } from "@/constants/options/skill";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserProfile } from "@/services/types";
import { useMutationUpdateUserProfile } from "@/services/user.query";
import { validationSchema } from "@/schema";

interface Props {
  data: UserProfile;
}

export const FormUserSettings = ({ data }: Props) => {
  const schema = z.object({
    bio: validationSchema.bio,
    telegramLink: z.string().optional(),
    websiteLink: z.string().url().optional(),
    roles: validationSchema.roles,
    skills: validationSchema.skills,
  });

  type Inputs = z.infer<typeof schema>;

  const addToast = useToastStore((s) => s.add);
  const { showLoading, dismissLoading } = useLoadingStoreAction();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),

    defaultValues: {
      ...data,
      bio: data?.bio ?? "",
      websiteLink: data?.websiteLink ?? "",
      telegramLink: data?.telegramLink ?? "",
    },
  });
  const mutation = useMutationUpdateUserProfile();

  const onSubmit = async (formData: FieldValues) => {
    showLoading();
    try {
      await mutation.mutateAsync({
        ...formData,
      });
      addToast({
        title: "Saved!",
        type: "success",
      });
    } catch (err) {
      addToast({
        title: "Save failed",
        type: "error",
      });
    } finally {
      dismissLoading();
    }
  };
  return (
    <form
      method="post"
      className={clsx("mt-8")}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* <Input
        label="Username"
        placeholder="Enter your username"
        required
        error={errors['userName']}
        {...register('userName', { required: 'Username is required.' })}
      />
       */}
      <TextArea
        label="Bio"
        rows={3}
        placeholder="Introduce yourself :)"
        error={errors["bio"]}
        {...register("bio", { required: "Bio is required." })}
      />

      <Select
        label="Roles "
        options={RoleSetOptions}
        error={errors["roles"]}
        control={control}
        {...register("roles")}
      />

      <Select
        label="Skills "
        options={SkillSetOptions}
        error={errors["skills"]}
        control={control}
        {...register("skills")}
      />
      <Input
        label="Website "
        placeholder="Enter your website"
        error={errors["websiteLink"]}
        {...register("websiteLink")}
      />
      <Input
        label="Telegram"
        placeholder="Enter your telegram id"
        error={errors["telegramLink"]}
        {...register("telegramLink")}
      />

      <div className="flex justify-end mt-4 mb-20">
        <button className="btn btn-primary" type="submit">
          Save Changes
        </button>
      </div>
    </form>
  );
};
