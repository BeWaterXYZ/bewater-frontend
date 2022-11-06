import React from 'react';
import clsx from 'clsx';

import { HelpText } from './help-text';

import type { FieldErrorsImpl } from 'react-hook-form';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: Partial<FieldErrorsImpl<{ [x: string]: any }>>;
  required?: boolean;
  className?: string;
}

export const Input = React.forwardRef(function Input(
  props: Props,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const { label, name, errors, className, required, ...restProps } = props;
  return (
    <>
      {label ? (
        <label className="block typ-label py-1">
          {label}
          {required && '*'}
        </label>
      ) : null}
      <input
        className={clsx('input', className, {
          error: errors[name],
        })}
        ref={ref}
        {...restProps}
        name={name}
      ></input>
      <HelpText text={errors[name]?.message as string} />
    </>
  );
});
