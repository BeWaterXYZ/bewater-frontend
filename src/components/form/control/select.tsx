import React, { useId } from 'react';
import clsx from 'clsx';
import type { FieldError, Merge } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import RSelect, { ClassNamesConfig } from 'react-select';
import { TagOption } from '@/components/tag';

interface Props extends React.ComponentPropsWithRef<'select'> {
  label?: string;
  name: string;
  error?: FieldError | Merge<FieldError, (FieldError | undefined)[]>;
  required?: boolean;
  className?: string;
  control: any;
  options: TagOption[];
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
  const styles: ClassNamesConfig<TagOption> = {
    control: () => clsx('control !p-0 !flex', { error: error }),
    clearIndicator: () => '!hidden',
    indicatorSeparator: () => '!hidden',
    multiValue: ({ data }) => data.classes.container,
    multiValueLabel: ({ data }) => data.classes.text,
    multiValueRemove: () => 'hover:!bg-transparent',
    menu: () => '!bg-night',
    option: () => '!text-white hover:!bg-day !bg-transparent',
  };
  return (
    <div className={clsx('block pb-2', className)}>
      {label ? (
        <label className="block body-3 py-1 text-grey font-bold " htmlFor={id}>
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
              classNames={styles}
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
