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

interface Props {
  token: Auth;
  userId: string;
  data?: GetUserProfileByIdResponse;
  className?: string;
}
type FormProfileProps = Pick<Props, 'token' | 'data' | 'className'>;
type FormProfileWrapProps = Pick<Props, 'token' | 'userId' | 'className'>;

export const FormProfile = ({ token, data, className }: FormProfileProps) => {
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
      submitUpdateUserProfile(token, {
        ...submitData,
        userId: token.user?.userId,
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
    [token],
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
        linkText={'0x1234561234561234561234561234561234561234'}
        placeholder={''}
      />
      <SocialLink name="github" label="Github" />
      <SocialLink name="discord" label="Discord" />
      <SocialLink name="twitter" label="Twitter" />
      {isLoading ? <Loading /> : null}
    </form>
  );
};

export function FormProfileWrap({
  token,
  userId,
  className,
}: FormProfileWrapProps) {
  const { isLoading, isError, error, data } = useFetchUser(userId);
  if (isError) {
    console.error(error);
    return <div>Error occurs!</div>;
  }
  return !isLoading ? (
    <FormProfile data={data} className={className} token={token} />
  ) : (
    <Loading />
  );
}
