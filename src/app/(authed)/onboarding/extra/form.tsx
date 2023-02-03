'use client';

import { Select } from '@/components/form/control';
import { useToastStore } from '@/components/toast/store';
import { useMutationUpdateUserProfile } from '@/services/user.query';

import { useLoadingStoreAction } from '@/components/loading/store';

import { RoleSetOptions, RoleSetScheme } from '@/constants/options/role';
import { SkillSetOptions, SkillSetScheme } from '@/constants/options/skill';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { UserProfile } from '@/services/types';
import { validationSchema } from '@/schema';

const schema = z
  .object({
    roles: validationSchema.roles,
    skills: validationSchema.skills,
  })
  .required();

export type Inputs = z.infer<typeof schema>;

interface Props {
  onComplete: () => void;
}

export const FormOnboardingExtra = ({ onComplete }: Props) => {
  const addToast = useToastStore((s) => s.add);
  const { showLoading, dismissLoading } = useLoadingStoreAction();
  const mutation = useMutationUpdateUserProfile();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<Inputs>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });
  const onSubmit = async (formData: Inputs) => {
    showLoading();
    try {
      await mutation.mutateAsync({
        ...formData,
      });
      onComplete();
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
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-500/20 p-7 rounded"
    >
      <Select
        label="Roles "
        required
        maxSelections={5}
        options={RoleSetOptions}
        error={errors['roles']}
        control={control}
        {...register('roles')}
      />

      <Select
        label="Skill "
        required
        maxSelections={10}
        options={SkillSetOptions}
        error={errors['skills']}
        control={control}
        {...register('skills')}
      />
      <button className="btn btn-primary w-full">Finish Setup</button>
    </form>
  );
};
