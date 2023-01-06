import clsx from 'clsx';
import { useCallback } from 'react';

import {
  GetUserProfileByIdResponse,
  submitUpdateUserProfile,
} from '@/services/user';
import { User } from '@/stores/auth';

import type { FieldValues } from 'react-hook-form';
import { Input, TextArea } from '@/components/form/control';
import { SocialLink } from '@/components/form/social-link';
import { useSettingsForm } from './use-settings-form';
import { useToastStore } from '@/components/toast/store';
import { useLoadingStoreAction } from '@/components/loading/store';

interface Props {
  user: User;
  data: GetUserProfileByIdResponse;
  className?: string;
}

export const FormUserSettings = ({ data, className }: Props) => {
  const addToast = useToastStore((s) => s.add);
  const { showLoading, dismissLoading } = useLoadingStoreAction();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useSettingsForm({
    defaultValues: data?.userProfile,
  });

  const onSubmit = useCallback((submitData: FieldValues) => {
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
  }, []);
  console.log(register('userName', { required: 'Username is required.' }));
  return (
    <form
      method="post"
      className={clsx('', className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="heading-6">Edit your profile</p>

      <hr className="border-titanium/20 my-6" />

      <p className="body-2 text-gray-400/30 my-6">Basic Information</p>
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
        required
        error={errors['bio']}
        {...register('bio', { required: 'Bio is required.' })}
      />
      <Input
        name="address"
        label="Wallet Address"
        value={data?.userProfile?.walletAddress}
        placeholder=""
        readOnly
        disabled
      />
      <Input
        label="Email"
        placeholder="Enter your email"
        required
        error={errors['email']}
        {...register('email', { required: 'Email is required.' })}
      />
      {/* <SocialLink name="github" label="Github" />
      <SocialLink name="discord" label="Discord" />
      <SocialLink name="twitter" label="Twitter" /> */}

      <button className="btn btn-primary" type="submit">
        Save Changes
      </button>
    </form>
  );
};
