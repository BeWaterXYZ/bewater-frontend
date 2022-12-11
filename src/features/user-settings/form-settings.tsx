import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { useState, useCallback } from 'react';

import { useFetchUser } from '@/services/user';
import { Loading } from '@/components/loading';
import { submitUpdateUserProfile } from '@/services/user';
import { User } from '@/stores/auth';

import { FormItem } from '../../components/form/form-item';
import { Input } from '../../components/form/input';
import { SocialLink } from '../../components/form/social-link';

import type {
  GetUserProfileByIdResponse,
  UpdateUserProfileRequest,
} from '@/types/user';
import type { FieldValues } from 'react-hook-form';

interface Props {
  user: User;
  data?: GetUserProfileByIdResponse;
  className?: string;
}
type FormProfileProps = Pick<Props, 'user' | 'data' | 'className'>;
type FormProfileWrapProps = Pick<Props, 'user' | 'className'>;

export const FormUserSettings = ({
  user,
  data,
  className,
}: FormProfileProps) => {
  const { walletAddress } = user;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: data?.updatedUserInfo,
  });
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = useCallback(
    (submitData: FieldValues) => {
      setIsLoading(true);
      submitUpdateUserProfile({
        ...submitData,
        userId: user?.userId,
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
    },
    [user],
  );
  console.log(data?.updatedUserInfo);
  return (
    <form
      method="post"
      className={clsx('', className)}
      // eslint-disable-next-line
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
        error={errors['email']}
        {...register('email', { required: 'Full name is required.' })}
      />
      <FormItem
        label={'Wallet Address'}
        type={'link'}
        inputType={''}
        buttonType={'btn-primary'}
        buttonText={''}
        linkText={walletAddress ?? ''}
        placeholder={''}
      />
      <SocialLink name="github" label="Github" />
      <SocialLink name="discord" label="Discord" />
      <SocialLink name="twitter" label="Twitter" />
      {isLoading ? <Loading /> : null}
    </form>
  );
};

export function FormSettingsWrapper({ user, className }: FormProfileWrapProps) {
  const { error, data, isLoading } = useFetchUser(user.userId);

  if (isLoading) return <Loading />;

  if (error) {
    console.error(error);
    return <div>Error occurs!</div>;
  }
  return data ? (
    <FormUserSettings user={user} data={data} className={className} />
  ) : null;
}
