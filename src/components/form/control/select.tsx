import React, { useId } from 'react';
import clsx from 'clsx';
import type { FieldError } from 'react-hook-form';

interface Props extends React.ComponentPropsWithRef<'select'> {
  label?: string;
  name?: string;
  error?: FieldError;
  required?: boolean;
  className?: string;
  options: {
    label: string;
    value: string;
  }[];
}

export const Select = React.forwardRef(function TextArea(
  props: Props,
  ref: React.ForwardedRef<HTMLSelectElement>,
) {
  const { options, label, name, error, className, required, ...restProps } =
    props;
  const id = useId();
  return (
    <div className={clsx('block pb-2', className)}>
      {label ? (
        <label className="block body-3 py-1" htmlFor={id}>
          {label}
          {required && ' *'}
        </label>
      ) : null}
      <select
        id={id}
        className={clsx('control', {
          error: error,
        })}
        ref={ref}
        {...restProps}
        name={name}
      >
        {options.map((op) => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>

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
