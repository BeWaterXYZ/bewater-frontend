import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/form/input';
import { Loading } from '@/components/loading';
import { submitCreateUserProfile } from '@/services/user';
import useNavigator from '@/hooks/useNavigator';
import { User } from '@/stores/auth';
import { useToastStore } from '@/components/toast/store';

import type { FieldValues } from 'react-hook-form';
import type { CreateUserProfileRequest } from '@/types/user';

interface Props {
  user: User;
  className?: string;
}

export const FormWelcome = ({ user, className }: Props) => {
  const addToast = useToastStore((s) => s.add);
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
            addToast({
              title: 'An error occurs',
              description:
                res?.error[0] ??
                'Create user failed, please visit the site later',
              type: 'error',
            });
          } else {
            navigator.goToUserSettings();
          }
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
          addToast({
            title: 'An error occurs',
            description: 'Create user failed, please visit the site later',
            type: 'error',
          });
        });
    },
    [navigator, user],
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
