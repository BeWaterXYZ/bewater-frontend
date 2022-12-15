import React from 'react';
import clsx from 'clsx';

import type { FieldError } from 'react-hook-form';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  error?: FieldError;
  required?: boolean;
  className?: string;
}

export const Input = React.forwardRef(function Input(
  props: Props,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const { label, name, error, className, required, ...restProps } = props;
  return (
    <div className={clsx('block pb-2', className)}>
      {label ? (
        <label className="block body-3 py-1">
          {label}
          {required && ' *'}
        </label>
      ) : null}
      <input
        className={clsx('input', {
          error: error,
        })}
        ref={ref}
        {...restProps}
        name={name}
      ></input>

      <div
        className={clsx('whitespace-nowrap body-4 py-1 text-danger', {
          invisible: !error,
        })}
      >
        {error?.message ?? 'placeholder'}
      </div>
    </div>
  );
});
