import React, { ForwardedRef, useId } from 'react';
import clsx from 'clsx';
import type { FieldError, Merge } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import RSelect, { ClassNamesConfig } from 'react-select';
import AsyncSelect from 'react-select/async';
import { OptionItem } from '@/constants/options/types';
import { UserProfile } from '@/services/types';
import { getMockUserProfile } from '../../../__mock__/user';
interface UserSearchProps extends React.ComponentPropsWithoutRef<'select'> {
  label?: string;
  name: string;
  error?: FieldError;
  control: any;
}

const promiseOptions = (inputValue: string) =>
  new Promise<UserProfile[]>((resolve) => {
    setTimeout(() => {
      resolve([getMockUserProfile('andy'), getMockUserProfile('bob')]);
    }, 1000);
  });

export const UserSearch = React.forwardRef(function UserSearch_(
  props: UserSearchProps,
  ref: ForwardedRef<HTMLSelectElement>,
) {
  const { label, name, error, className, required, control, value } = props;
  const id = useId();
  const styles: ClassNamesConfig<UserProfile> = {
    control: ({ isFocused }) => {
      return clsx('control !p-0 !flex !shadow-none ', {
        error: error,
        '!border-day hover:!border-day': isFocused,
      });
    },
    clearIndicator: () => '!hidden',
    indicatorSeparator: () => '!hidden',
    singleValue: () => 'body-4',

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
        render={({ field }) => (
          <AsyncSelect
            id={id}
            isMulti={false}
            classNames={styles}
            placeholder="Search username, email or wallet address"
            loadingMessage={() => 'loading'}
            noOptionsMessage={() => 'no options'}
            onChange={(val) => {
              console.log({ val });
              val && field.onChange(val.userId);
            }}
            components={{}}
            loadOptions={promiseOptions}
          />
        )}
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
