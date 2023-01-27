import clsx from 'clsx';

import {
  GetUserProfileByIdResponse,
  submitUpdateUserProfile,
} from '@/services/user';
import { User } from '@/stores/auth';

import type { FieldValues } from 'react-hook-form';
import { Input, Select, TextArea } from '@/components/form/control';
import { useToastStore } from '@/components/toast/store';
import { useLoadingStoreAction } from '@/components/loading/store';
import { RoleSetOptions, RoleSetScheme } from '@/constants/options/role';
import { SkillSetOptions, SkillSetScheme } from '@/constants/options/skill';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z
  .object({
    email: z.string().email(),
    userName: z.string().min(3, { message: 'At least 3 characters' }),
    bio: z.string().optional(),
    fullName: z.string().min(3, { message: 'At least 3 characters' }),
    roles: z
      .array(RoleSetScheme)
      .min(1, { message: 'choose at least one role' })
      .max(5, { message: 'You can only choose 5 roles' }),
    skills: z
      .array(SkillSetScheme)
      .max(10, { message: 'You can only choose 10 skills' }),
  })
  .required();

export type Inputs = z.infer<typeof schema>;

export function useSettingsForm(config: Parameters<typeof useForm<Inputs>>[0]) {
  return useForm<Inputs>({
    resolver: zodResolver(schema),
    ...config,
  });
}

interface Props {
  user: User;
  data: GetUserProfileByIdResponse;
}

export const FormUserSettings = ({ data }: Props) => {
  const addToast = useToastStore((s) => s.add);
  const { showLoading, dismissLoading } = useLoadingStoreAction();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useSettingsForm({
    defaultValues: { ...data?.userProfile, bio: data?.userProfile?.bio ?? '' },
  });

  const onSubmit = (submitData: FieldValues) => {
    showLoading();
    submitUpdateUserProfile({
      ...submitData,
      userId: data?.userProfile?.userId!,
    })
      .then(() => {
        addToast({
          title: 'Saved!',
          type: 'success',
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        dismissLoading();
      });
  };
  return (
    <form
      method="post"
      className={clsx('mt-8')}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="Username"
        placeholder="Enter your username"
        required
        error={errors['userName']}
        {...register('userName', { required: 'Username is required.' })}
      />
      <Input
        label="Full name"
        placeholder="Enter your full name"
        required
        error={errors['fullName']}
        {...register('fullName', { required: 'Full name is required.' })}
      />
      <TextArea
        label="Bio"
        rows={3}
        placeholder="Content"
        error={errors['bio']}
        {...register('bio', { required: 'Bio is required.' })}
      />
      <Select
        label="Roles "
        options={RoleSetOptions}
        error={errors['roles']}
        control={control}
        {...register('roles')}
      />

      <Select
        label="Skill "
        options={SkillSetOptions}
        error={errors['skills']}
        control={control}
        {...register('skills')}
      />

      <button className="btn btn-primary" type="submit">
        Save Changes
      </button>
    </form>
  );
};
