'use client';

import { Input } from '@/components/form/control';
import { useLoadingStoreAction } from '@/components/loading/store';
import { useToastStore } from '@/components/toast/store';
import {
  checkUsername,
  getEmailVerificationCode,
  submitCreateUserProfile,
} from '@/services/user';
import { User } from '@/stores/auth';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CountdownButton } from './countdown-button';

const schema = z
  .object({
    email: z.string().email(),
    verificationCode: z.string().min(6, { message: '6 digits code' }),
    userName: z
      .string()
      .min(3, { message: 'At least 3 characters' })
      .refine(checkUsername(''), {
        message: 'The user name is taken',
      }),
    fullName: z.string().min(3, { message: 'At least 3 characters' }),
  })
  .required();

export type Inputs = z.infer<typeof schema>;

interface Props {
  user: User;
  onComplete: () => void;
}

export const FormOnboarding = ({ user, onComplete }: Props) => {
  const [verificationCodeSent, verificationCodeSentSet] = useState(false);
  const addToast = useToastStore((s) => s.add);
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
  const onSubmit = async (data: Inputs) => {
    showLoading();
    try {
      let res = await submitCreateUserProfile({
        ...data,
        // fix , todo
        roles: [],
        skills: [],
        userId: user.userId!,
        walletAddress: user.walletAddress!,
      });
      if (res.userProfile) {
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
      addToast({
        title: 'An error occurs',
        description: 'Create user failed, please visit the site later',
        type: 'error',
      });
    } finally {
      dismissLoading();
    }
  };

  const sendEmail = async () => {
    console.log(errors);
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
      className="bg-gray-500/20 p-7 rounded"
    >
      <p className="body-2 py-4">Set up your basic profile</p>

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
        <div className="relative -top-[3px]">
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

      <button className="btn btn-primary w-full">Continue</button>
    </form>
  );
};
