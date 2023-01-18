import React, { ForwardedRef, useId } from 'react';
import clsx from 'clsx';
import type { FieldError, Merge } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import RSelect, { ClassNamesConfig } from 'react-select';
import { Option } from '@/components/tag';
interface SelectProps extends React.ComponentPropsWithoutRef<'select'> {
  label?: string;
  name: string;
  error?: FieldError | Merge<FieldError, (FieldError | undefined)[]>;
  control: any;
  options: Option[];
  isMulti?: boolean;
}

export const Select = React.forwardRef(function TextArea(
  props: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>,
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
  const styles: ClassNamesConfig<Option> = {
    control: ({ isFocused }) => {
      return clsx('control !p-0 !flex !shadow-none ', {
        error: error,
        '!border-day hover:!border-day': isFocused,
      });
    },
    clearIndicator: () => '!hidden',
    indicatorSeparator: () => '!hidden',
    singleValue: () => 'body-4',
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
              id={id}
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
              id={id}
              isMulti={false}
              classNames={styles}
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
