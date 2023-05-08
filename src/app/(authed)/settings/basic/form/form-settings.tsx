import clsx from 'clsx';

import {
  checkUsername,
  GetUserProfileByIdResponse,
  submitUpdateUserProfile,
} from '@/services/user';

import type { FieldValues } from 'react-hook-form';
import { Input, Select, TextArea } from '@/components/form/control';
import { useToastStore } from '@/components/toast/store';
import { useLoadingStoreAction } from '@/components/loading/store';
import { RoleSetOptions, RoleSetScheme } from '@/constants/options/role';
import { SkillSetOptions, SkillSetScheme } from '@/constants/options/skill';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UserProfile } from '@/services/types';
import { useMutationUpdateUserProfile } from '@/services/user.query';
import { validationSchema } from '@/schema';

interface Props {
  data: GetUserProfileByIdResponse;
}

export const FormUserSettings = ({ data }: Props) => {
  const schema = z
    .object({
      userName: validationSchema.userName(data.userProfile?.userName ?? ''),
      bio: validationSchema.bio,
      fullName: validationSchema.fullName,
      roles: validationSchema.roles,
      skills: validationSchema.skills,
    })
    .required();

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
    defaultValues: { ...data?.userProfile, bio: data?.userProfile?.bio ?? '' },
  });
  const mutation = useMutationUpdateUserProfile();

  const onSubmit = async (formData: FieldValues) => {
    showLoading();
    try {
      await mutation.mutateAsync({
        ...formData,
      });
      addToast({
        title: 'Saved!',
        type: 'success',
      });
    } catch (err) {
      addToast({
        title: 'Save failed',
        type: 'error',
      });
    } finally {
      dismissLoading();
    }
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
        label="Full Name"
        placeholder="Enter your full name"
        required
        error={errors['fullName']}
        {...register('fullName', { required: 'Full name is required.' })}
      />
      <TextArea
        label="Bio"
        rows={3}
        placeholder="Introduce yourself :)"
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
        label="Skills "
        options={SkillSetOptions}
        error={errors['skills']}
        control={control}
        {...register('skills')}
      />

      <div className="flex justify-end mt-4 mb-20">
        <button className="btn btn-primary" type="submit">
          Save Changes
        </button>
      </div>
    </form>
  );
};
