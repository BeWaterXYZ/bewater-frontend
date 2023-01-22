'use client';
import { useCallback } from 'react';

import { Input } from '@/components/form/control';
import { submitCreateUserProfile } from '@/services/user';
import { User } from '@/stores/auth';
import { useToastStore } from '@/components/toast/store';

import { useOnboardingForm, Inputs } from './use-onboarding-form';
import { useLoadingStoreAction } from '@/components/loading/store';

interface Props {
  user: User;
  onComplete: () => void;
}

export const FormOnboarding = ({ user, onComplete }: Props) => {
  const addToast = useToastStore((s) => s.add);
  const { showLoading, dismissLoading } = useLoadingStoreAction();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useOnboardingForm();
  const onSubmit = useCallback(
    (data: Inputs) => {
      showLoading();
      submitCreateUserProfile({
        ...data,
        userId: user.userId!,
        walletAddress: user.walletAddress!,
      })
        .then((res) => {
          onComplete();
        })
        .catch((error) => {
          console.error(error);
          addToast({
            title: 'An error occurs',
            description: 'Create user failed, please visit the site later',
            type: 'error',
          });
        })
        .finally(() => {
          dismissLoading();
        });
    },
    [user, addToast],
  );
  return (
    <form
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-500/20 p-7 rounded"
    >
      <p className="body-2 py-4">Set up your basic profile</p>

      <Input
        label="Username"
        placeholder="Enter your username"
        error={errors['userName']}
        {...register('userName')}
      />
      <Input
        label="Full name"
        placeholder="Enter your full name"
        error={errors['fullName']}
        {...register('fullName')}
      />
      <Input
        label="Email"
        placeholder="Enter your email"
        error={errors['email']}
        {...register('email')}
      />
      <button className="btn btn-primary w-full">Finish Setup</button>
    </form>
  );
};
