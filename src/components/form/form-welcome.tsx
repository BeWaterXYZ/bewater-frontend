import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Loading } from '@/components/loading';
import { submitCreateUserProfile } from '@/services/user';
import useNavigator from '@/hooks/useNavigator';

import type { FieldValues } from 'react-hook-form';
import type { Auth } from '@/models/auth';
import type { UserLocalStorage } from '@/models/user';
import type { CreateUserProfileRequest } from '@/types/user';

interface Props {
  token: Auth & { user: UserLocalStorage };
  className?: string;
}

export const FormWelcome = ({ token, className }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigator();
  const onSubmit = useCallback(
    async (data: FieldValues) => {
      setIsLoading(true);
      await submitCreateUserProfile(token, {
        ...data,
        userId: token.user?.userId,
      } as CreateUserProfileRequest);
      navigator.goToUserSettings();
    },
    [navigator, token],
  );
  return !isLoading ? (
    <form
      className={clsx('mb-[104px] max-w-[680px]', className)}
      onSubmit={void handleSubmit(onSubmit)}
    >
      <Input
        label="Username"
        placeholder="Enter your username"
        required
        errors={errors}
        {...register('username', { required: 'Username is required.' })}
      />
      <Input
        label="Full name"
        placeholder="Enter your full name"
        required
        errors={errors}
        {...register('email', { required: 'Full name is required.' })}
      />
      <Button className="mt-16" type="primary" text="Finish Setup" />
    </form>
  ) : (
    <Loading />
  );
};
