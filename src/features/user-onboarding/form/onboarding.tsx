import { useCallback, useState } from 'react';

import { Input } from '@/components/form/input';
import { Loading } from '@/components/loading';
import { submitCreateUserProfile } from '@/services/user';
import useNavigator from '@/hooks/useNavigator';
import { User } from '@/stores/auth';
import { useToastStore } from '@/components/toast/store';

import { useOnboardingForm, Inputs } from './use-onboarding-form';

interface Props {
  user: User;
}

export const FormOnboarding = ({ user }: Props) => {
  const addToast = useToastStore((s) => s.add);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useOnboardingForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigator();
  const onSubmit = useCallback(
    (data: Inputs) => {
      setIsLoading(true);
      submitCreateUserProfile({
        ...data,
        userId: user.userId!,
        walletAddress: user.walletAddress!,
      })
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
    <form method="post" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Username"
        placeholder="Enter your username"
        error={errors['userName']}
        {...register('userName')}
      />
      <Input
        label="Full name"
        placeholder="Enter your full name"
        error={errors['fullname']}
        {...register('fullname')}
      />
      <Input
        label="Email"
        placeholder="Enter your email"
        error={errors['email']}
        {...register('email')}
      />
      <button className="btn btn-primary">Finish Setup</button>
      {isLoading ? <Loading /> : null}
    </form>
  );
};
