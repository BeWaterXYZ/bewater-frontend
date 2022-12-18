import React, { useId } from 'react';
import clsx from 'clsx';
import type { FieldError } from 'react-hook-form';

interface Props extends React.ComponentPropsWithRef<'input'> {
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
  const id = useId();
  return (
    <div className={clsx('block pb-2', className)}>
      {label ? (
        <label className="block body-3 py-1" htmlFor={id}>
          {label}
          {required && ' *'}
        </label>
      ) : null}
      <input
        id={id}
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
