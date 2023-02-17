import React, { ForwardedRef, useId } from 'react';
import clsx from 'clsx';
import type { FieldError, Merge } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import RSelect, { ClassNamesConfig } from 'react-select';
import { OptionItem } from '@/constants/options/types';
interface SelectProps<T extends string>
  extends React.ComponentPropsWithoutRef<'select'> {
  label?: string;
  name: string;
  error?: FieldError | Merge<FieldError, (FieldError | undefined)[]>;
  control: any;
  options: OptionItem<T>[];
  maxSelections?: number;
}

export const Select = React.forwardRef(function Select_<T extends string>(
  props: SelectProps<T>,
  ref: ForwardedRef<HTMLSelectElement>,
) {
  const {
    options,
    label,
    name,
    error,
    className,
    required,
    control,
    maxSelections,
  } = props;

  const id = useId();
  const styles: ClassNamesConfig<OptionItem<T>> = {
    control: ({ isFocused }) => {
      return clsx('control !p-0 !flex !shadow-none ', {
        error: error,
        '!border-day hover:!border-day': isFocused,
      });
    },
    clearIndicator: () => '!hidden',
    indicatorSeparator: () => '!hidden',
    singleValue: () => 'body-4',
    multiValue: ({ data }) => data.classes.container + ' !my-1',
    multiValueLabel: ({ data }) => data.classes.text,
    multiValueRemove: () => 'hover:!bg-transparent',
    menu: () => '!bg-[#0F1021] !rounded-sm !border !border-midnight',
    option: () => '!text-white hover:!bg-midnight !bg-transparent',
  };
  return (
    <div className={clsx('block ', className)}>
      {label ? (
        <label
          className="block body-4 py-1 text-grey-500 font-bold "
          htmlFor={id}
        >
          {label}
          {required && ' *'}
        </label>
      ) : null}

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          let cur = field.value ?? [];

          let reachMax = maxSelections ? cur.length === maxSelections : false;
          let showOptions = !reachMax || maxSelections === 1;
          return (
            <RSelect
              id={id}
              isMulti={true}
              classNames={styles}
              options={showOptions ? options : []}
              maxMenuHeight={148}
              noOptionsMessage={() => {
                if (cur.length === maxSelections)
                  return 'You have reached max selections';
                return 'no options';
              }}
              value={cur.map((value: string) =>
                options.find((op) => value === op.value),
              )}
              onChange={(val) => {
                let values = Array.from(val.values()).map((d) => d.value);
                if (maxSelections) {
                  while (values.length > maxSelections) {
                    values.shift();
                  }
                }
                field.onChange(values);
              }}
              onBlur={field.onBlur}
            />
          );
        }}
      />
      <div
        className={clsx('whitespace-nowrap body-4  text-danger', {
          invisible: !error,
        })}
      >
        {error?.message ?? 'placeholder'}
      </div>
    </div>
  );
});
