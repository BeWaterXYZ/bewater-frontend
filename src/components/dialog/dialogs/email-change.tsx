import { CountdownButton } from '@/components/countdown-button';
import { Input, Select, TextArea } from '@/components/form/control';
import { useLoadingStoreAction } from '@/components/loading/store';
import { useToastStore } from '@/components/toast/store';
import { RoleSetOptions, RoleSetScheme } from '@/constants/options/role';
import { validationSchema } from '@/schema';
import { sendGroupingRequest } from '@/services/grouping-request';
import { getEmailVerificationCode } from '@/services/user';
import { useMutationUpdateEmail } from '@/services/user.query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Dialogs } from '../store';

const schema = z
  .object({
    email: validationSchema.email,
    verificationCode: validationSchema.verificationCode,
  })
  .required();

export type Inputs = z.infer<typeof schema>;

interface TeamJoinDialogProps {
  data: NonNullable<Dialogs['team_join']>;
  close: () => void;
}

export default function EmailChangeDialog({
  data: team,
  close,
}: TeamJoinDialogProps) {
  const [verificationCodeSent, verificationCodeSentSet] = useState(false);

  const { showLoading, dismissLoading } = useLoadingStoreAction();
  const addToast = useToastStore((s) => s.add);
  const mutation = useMutationUpdateEmail();

  const onSubmit = async (formData: Inputs) => {
    showLoading();
    try {
      let res = await mutation.mutateAsync({
        emailAddress: formData.email,
        verificationCode: formData.verificationCode,
      });
      if (res.userProfile) {
        addToast({
          type: 'success',
          title: 'Email updated',
        });
      } else {
        if (!res.verified) {
          addToast({
            type: 'error',
            title: 'Email verifaction code is not correct',
          });
        } else {
          addToast({
            type: 'error',
            title: 'please try again later',
          });
        }
      }
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Request not sent!',
        description: 'please try again later',
      });
    } finally {
      dismissLoading();
      close();
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Inputs>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {},
  });

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
    <div className="flex flex-col justify-center w-[80vw] max-w-md">
      <p className="heading-6">Change Your Email</p>

      <form method="post" onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Input
              label="Email"
              placeholder="Enter your email"
              error={errors['email']}
              {...register('email')}
            />
          </div>
          <div className="relative top-[4px]">
            <CountdownButton onClick={sendEmail} />
          </div>
        </div>
        {verificationCodeSent ? (
          <p className="body-5 text-gray-500">
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

        <div className="mt-4 flex flex-row justify-end gap-4">
          <button className="btn btn-secondary " type="button" onClick={close}>
            Cancel
          </button>
          <button className="btn btn-primary ">Confirm</button>
        </div>
      </form>
    </div>
  );
}
