'use client';

import React, { useCallback } from 'react';
import clsx from 'clsx';
import type { FieldError } from 'react-hook-form';
import { useHomeForm, Inputs } from './use-home-form';
import { submitEmailToWaitingList } from '@/services/email';
import { IconCheck } from '@/components/icons';
import { useToggle } from 'react-use';

interface Props extends React.ComponentPropsWithoutRef<'input'> {
  error?: FieldError;
  success?: boolean;
}

export const Input = React.forwardRef(function Input(
  props: Props,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const { name, error, required, success, ...restProps } = props;
  return (
    <div
      className={clsx(
        'flex flex-row items-center h-[50px] border border-white/5 rounded-xl',
        success ? 'bg-white/20 justify-center' : 'justify-between',
      )}
    >
      {!success ? (
        <>
          <input
            className={clsx(
              'px-6 py-4 w-[calc(100%-16px)] outline-none bg-transparent border border-transparent rounded-xl',
              error && 'border-red-500',
            )}
            ref={ref}
            {...restProps}
            name={name}
          />
          <button
            className="p-4 border-none select-none outline-none"
            type="submit"
          >
            <img
              className="w-4 h-4"
              src="/home/social-arrow-right.svg"
              alt=""
              aria-hidden
            />
          </button>
        </>
      ) : (
        <IconCheck className="w-7 h-7 fill-white" />
      )}
    </div>
  );
});

export default function HomeForm() {
  const [success, setSuccess] = useToggle(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useHomeForm({});
  const onSubmit = useCallback(
    (submitData: Inputs) => {
      submitEmailToWaitingList(submitData)
        .then(() => {
          console.log('show check svg');
          // TODO: make some notification
        })
        .catch((error) => {
          console.error(error);
          // TODO: make some error log
        });
      setSuccess(true);
    },
    [setSuccess],
  );
  return (
    <form
      className={clsx(
        'w-full p-6 bg-card bg-white/5 select-none',
        'border border-solid border-white/10 rounded-[20px]',
      )}
      method="post"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="body-2 font-bold whitespace-nowrap">
        Join the waitlist
      </div>
      <div className="desc-3 opacity-50 pb-6 whitespace-nowrap">
        Sign up to be one of the first to use BeWater.
      </div>
      <Input
        placeholder="Email address"
        required
        success={success}
        error={errors['email']}
        {...register('email', { required: 'Email is required.' })}
      />
    </form>
  );
}
