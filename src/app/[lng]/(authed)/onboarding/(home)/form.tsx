'use client';

import { CountdownButton } from '@/components/countdown-button';
import { Input } from '@/components/form/control';
import { useLoadingStoreAction } from '@/components/loading/store';
import { useToastStore } from '@/components/toast/store';
import { validationSchema } from '@/schema';
import { UserProfile } from '@/services/types';
import {
  checkUsername,
  getEmailVerificationCode,
  submitCreateUserProfile,
} from '@/services/user';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z
  .object({
    email: validationSchema.email,
    verificationCode: validationSchema.verificationCode,
    userName: validationSchema.userName(''),
    fullName: validationSchema.fullName,
  })
  .required();

export type Inputs = z.infer<typeof schema>;

interface Props {
  onComplete: () => void;
}

export const FormOnboarding = ({ onComplete }: Props) => {
  const [verificationCodeSent, verificationCodeSentSet] = useState(false);
  const addToast = useToastStore((s) => s.add);
  // const walletAddress = useAuthStore((s) => s.walletAddress);
  // const setAuthState = useAuthStore((s) => s.setState);
  const { showLoading, dismissLoading } = useLoadingStoreAction();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Inputs>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });
  const onSubmit = async (formData: Inputs) => {
    showLoading();
    try {
      let res = await submitCreateUserProfile({
        ...formData,
        // walletAddress,
      });
      if (res.userProfile) {
        // setAuthState({ user: res.userProfile });
        onComplete();
      } else if (!res.verified) {
        addToast({
          title: 'An error occurs',
          description: 'Create user failed, verification code is not correct',
          type: 'error',
        });
      } else {
        addToast({
          title: 'An error occurs',
          description: 'Create user failed, please visit the site later',
          type: 'error',
        });
      }
    } catch (err) {
      console.error(err);
      addToast({
        title: 'An error occurs',
        description: 'Create user failed, please visit the site later ',
        type: 'error',
      });
    } finally {
      dismissLoading();
    }
  };

  const sendEmail = async () => {
    if (!errors.email) {
      let { email } = getValues();
      // start sending email
      showLoading();
      try {
        let res = await getEmailVerificationCode(email);
        if (!res.sentVerificationCode) {
          addToast({
            title: 'An error occurs',
            description: 'failed to send email verifaction code',
            type: 'error',
          });
        } else {
          verificationCodeSentSet(true);
        }
        return res.sentVerificationCode;
      } catch (err) {
        addToast({
          title: 'An error occurs',
          description: 'failed to send email verifaction code',
          type: 'error',
        });
        return false;
      } finally {
        dismissLoading();
      }
    }
    return false;
  };
  return (
    <form
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-500/20 p-6 rounded"
    >
      <p className="body-2 pb-6">Set up your basic profile</p>

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
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <Input
            label="Email"
            placeholder="Enter your email"
            error={errors['email']}
            {...register('email')}
          />
        </div>
        <div className="relative top-[3px]">
          <CountdownButton onClick={sendEmail} />
        </div>
      </div>
      {verificationCodeSent ? (
        <p className="body-5 text-grey-500">
          We’ve just sent you a temporary verification code. Please check your
          inbox and paste the code below.
        </p>
      ) : null}
      <Input
        label="Verification Code"
        placeholder="Enter verification code"
        error={errors['verificationCode']}
        {...register('verificationCode')}
      />

      <button className="btn btn-primary w-full mt-6">Continue</button>
    </form>
  );
};
