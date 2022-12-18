import clsx from 'clsx';
import { useState, useCallback } from 'react';

import { Loading } from '@/components/loading';
import { submitUpdateUserProfile } from '@/services/user';
import { User } from '@/stores/auth';

import type {
  GetUserProfileByIdResponse,
  UpdateUserProfileRequest,
} from '@/types/user';
import type { FieldValues } from 'react-hook-form';
import { Input, TextArea } from '@/components/form/control';
import { SocialLink } from '@/components/form/social-link';
import { useSettingsForm } from './use-settings-form';

interface Props {
  user: User;
  data: GetUserProfileByIdResponse;
  className?: string;
}
type FormProfileProps = Pick<Props, 'user' | 'data' | 'className'>;
type FormProfileWrapProps = Pick<Props, 'user' | 'className'>;

export const FormUserSettings = ({ data, className }: FormProfileProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useSettingsForm({
    defaultValues: data?.userProfile,
  });

  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = useCallback((submitData: FieldValues) => {
    setIsLoading(true);
    submitUpdateUserProfile({
      ...submitData,
      userId: data?.userProfile?.userId,
    } as UpdateUserProfileRequest)
      .then(() => {
        // TODO: make some success alert?
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <form
      method="post"
      className={clsx('', className)}
      // eslint-disable-next-line
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="body-1">Edit your profile</p>
      <hr className="border-titanium/20 my-4" />
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
        error={errors['email']}
        {...register('email', { required: 'Full name is required.' })}
      />
      <TextArea
        label="Bio"
        rows={3}
        placeholder="Content"
        required
        error={errors['email']}
        {...register('email', { required: 'Full name is required.' })}
      />
      <Input
        name="address"
        label="Wallet Address"
        value={data?.userProfile?.walletAddress}
        placeholder=""
        readOnly
      />
      <Input
        label="Email"
        placeholder="Enter your email"
        required
        error={errors['email']}
        {...register('email', { required: 'Email is required.' })}
      />
      <SocialLink name="github" label="Github" />
      <SocialLink name="discord" label="Discord" />
      <SocialLink name="twitter" label="Twitter" />

      <button className="btn btn-primary">Save Changes</button>
      {isLoading ? <Loading /> : null}
    </form>
  );
};
