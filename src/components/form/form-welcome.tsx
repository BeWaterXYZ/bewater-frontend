import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/form/input';
import { Loading } from '@/components/loading';
import { submitCreateUserProfile } from '@/services/user';
import useNavigator from '@/hooks/useNavigator';
import { UserLocalStorage } from '@/models/user';

import type { FieldValues } from 'react-hook-form';
import type { CreateUserProfileRequest } from '@/types/user';

interface Props {
  user: UserLocalStorage;
  className?: string;
  onError?: (text?: string) => void;
}

export const FormWelcome = ({ user, className, onError }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigator();
  const onSubmit = useCallback(
    (data: FieldValues) => {
      setIsLoading(true);
      submitCreateUserProfile({
        ...data,
        userId: user.userId,
        walletAddress: user.walletAddress,
      } as CreateUserProfileRequest)
        .then((res) => {
          if (res.status !== 200) {
            setIsLoading(false);
            onError && onError(res.error[0]);
          } else {
            navigator.goToUserSettings();
          }
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
          onError && onError();
        });
    },
    [navigator, user, onError],
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
        {...register('fullname', { required: 'Full name is required.' })}
      />
      <Input
        label="Email"
        placeholder="Enter your email"
        required
        errors={errors}
        {...register('email', { required: 'Email is required.' })}
      />
      <button className="btn btn-primary">Finish Setup</button>
      {isLoading ? <Loading /> : null}
    </form>
  );
};
