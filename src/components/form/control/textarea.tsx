import React, { useId } from 'react';
import clsx from 'clsx';
import type { FieldError } from 'react-hook-form';

interface Props extends React.ComponentPropsWithRef<'textarea'> {
  label?: string;
  name: string;
  error?: FieldError;
  required?: boolean;
  className?: string;
}

export const TextArea = React.forwardRef(function TextArea(
  props: Props,
  ref: React.ForwardedRef<HTMLTextAreaElement>,
) {
  const { label, name, error, className, required, ...restProps } = props;
  const id = useId();
  return (
    <div className={clsx('block pb-2', className)}>
      {label ? (
        <label className="block body-3 py-1 text-grey font-bold" htmlFor={id}>
          {label}
          {required && ' *'}
        </label>
      ) : null}
      <textarea
        id={id}
        className={clsx('control', {
          error: error,
        })}
        ref={ref}
        {...restProps}
        name={name}
      ></textarea>

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
