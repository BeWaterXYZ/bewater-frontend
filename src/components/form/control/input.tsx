import React, { useId } from 'react';
import clsx from 'clsx';
import type { FieldError } from 'react-hook-form';

interface Props extends React.ComponentPropsWithoutRef<'input'> {
  label?: string;
  error?: FieldError;
}

export const Input = React.forwardRef(function Input_(
  props: Props,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const { label, name, error, className, required, ...restProps } = props;
  const id = useId();
  return (
    <div className={clsx('block pb-2', className)}>
      {label ? (
        <label
          className="block body-4 py-1 text-grey-500 font-bold"
          htmlFor={id}
        >
          {label}
          {required && ' *'}
        </label>
      ) : null}
      <input
        id={id}
        className={clsx('control', {
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
