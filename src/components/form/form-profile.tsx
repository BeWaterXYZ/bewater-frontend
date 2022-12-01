import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { useState, useCallback } from 'react';

import { useFetchUser } from '@/services/user';
import { Loading } from '@/components/loading';
import { submitUpdateUserProfile } from '@/services/user';

import { FormItem } from './form-item';
import { Input } from './input';
import { SocialLink } from './social-link';

import type {
  GetUserProfileByIdResponse,
  UpdateUserProfileRequest,
} from '@/types/user';
import type { FieldValues } from 'react-hook-form';
import type { Auth } from '@/models/auth';
import { useAuthStore } from '@/stores/auth';
import { UserLocalStorage } from '@/models/user';

interface Props {
  user: UserLocalStorage;
  data?: GetUserProfileByIdResponse;
  className?: string;
}
type FormProfileProps = Pick<Props, 'user' | 'data' | 'className'>;
type FormProfileWrapProps = Pick<Props, 'user' | 'className'>;

export const FormProfile = ({ user, data, className }: FormProfileProps) => {
  const { walletAddress } = useAuthStore((s) => s.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: data?.userProfile,
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
  return (
    <form
      method="post"
      className={clsx('mb-[104px] max-w-[680px]', className)}
      // eslint-disable-next-line
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="Username"
        placeholder="Enter your username"
        required
        errors={errors}
        {...register('userName', { required: 'Username is required.' })}
      />
      <Input
        label="Full name"
        placeholder="Enter your full name"
        required
        errors={errors}
        {...register('email', { required: 'Full name is required.' })}
      />
      <FormItem
        label={'Wallet Address'}
        type={'link'}
        inputType={''}
        buttonType={''}
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

export function FormProfileWrap({ user, className }: FormProfileWrapProps) {
  const { isLoading, isError, error, data } = useFetchUser(user.userId);
  if (isError) {
    console.error(error);
    return <div>Error occurs!</div>;
  }
  return !isLoading ? (
    <FormProfile user={user} data={data} className={className} />
  ) : (
    <Loading />
  );
}
