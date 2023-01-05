import React, { useId } from 'react';
import clsx from 'clsx';
import type { FieldError, Merge } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import RSelect from 'react-select';
interface Props extends React.ComponentPropsWithRef<'select'> {
  label?: string;
  name: string;
  error?: FieldError | Merge<FieldError, (FieldError | undefined)[]>;
  required?: boolean;
  className?: string;
  control: any;
  options: {
    label: string;
    value: string;
  }[];
  isMulti?: boolean;
}

export const Select = React.forwardRef(function TextArea(
  props: Props,
  ref: React.ForwardedRef<HTMLSelectElement>,
) {
  const {
    isMulti = false,
    options,
    label,
    name,
    error,
    className,
    required,
    control,
    value,
  } = props;
  const id = useId();
  return (
    <div className={clsx('block pb-2', className)}>
      {label ? (
        <label className="block body-3 py-1 text-grey " htmlFor={id}>
          {label}
          {required && ' *'}
        </label>
      ) : null}

      <Controller
        name={name}
        control={control}
        render={({ field }) =>
          isMulti ? (
            <RSelect
              isMulti
              options={options}
              value={options.filter((c) =>
                (field.value ?? []).includes(c.value),
              )}
              onChange={(val) =>
                val &&
                field.onChange(Array.from(val.values()).map((d) => d.value))
              }
            />
          ) : (
            <RSelect
              options={options}
              value={options.find((c) => c.value === value)}
              onChange={(val) => val && field.onChange(val.value)}
            />
          )
        }
      />
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
