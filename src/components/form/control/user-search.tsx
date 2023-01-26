import { Avatar } from '@/components/avatar';
import { UserProfile } from '@/services/types';
import clsx from 'clsx';
import React, { ForwardedRef, useId } from 'react';
import type { FieldError } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import {
  ClassNamesConfig,
  components,
  OptionProps,
  SingleValue,
} from 'react-select';
import AsyncSelect from 'react-select/async';

interface UserSearchProps extends React.ComponentPropsWithoutRef<'select'> {
  label?: string;
  name: string;
  error?: FieldError;
  control: any;
}

const promiseOptions = (inputValue: string) =>
  new Promise<UserProfile[]>((resolve) => {
    setTimeout(() => {
      let data = [
        {
          userId: 'userid-1',
          walletAddress: '0x043uasfdnk1498143asfk1234',
          email: 'bewater-user@gmail.com',
          userName: 'bewater-user',
          fullName: 'Andy Bewater',
          label: 'Andy Bewater',
        },
        {
          userId: 'userid-2',
          walletAddress: '0x043uasfdnk1498143asfk1234',
          email: 'bewater-user@gmail.com',
          userName: 'bewater-user',
          fullName: 'Bob Bewater',
          label: 'Bob Bewater',
        },
      ];
      cacheOptions = data;
      resolve(data);
    }, 1000);
  });

const Option = (props: OptionProps<UserProfile>) => {
  let { data } = props;
  return (
    <components.Option {...props}>
      <div className="flex gap-2">
        <div>
          <Avatar
            size="small"
            src={data.avatarURI}
            walletAddress={data.walletAddress}
          />
        </div>
        <div className="flex flex-col justify-around">
          <div className="body-5 ">{data.fullName ?? data.userName}</div>
          <div className="body-5  text-grey">@{data.userName}</div>
        </div>
      </div>
    </components.Option>
  );
};

let cacheOptions: UserProfile[] = [];

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
    menu: () => '!bg-[#0F1021] !border !border-midnight ',
    option: () => '!text-white hover:!bg-midnight !bg-transparent',
    input: () => '!text-white',
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
        render={({ field }) => {
          console.log({ field });
          return (
            <AsyncSelect
              id={id}
              isMulti={false}
              classNames={styles}
              placeholder="Search username, email or wallet address"
              loadingMessage={() => 'searching'}
              noOptionsMessage={() => 'no options'}
              value={cacheOptions.find((op) => op.userId === field.value)}
              onChange={(val) => {
                let val_ = val as SingleValue<UserProfile>;
                val_ && field.onChange(val_.userId);
              }}
              loadOptions={promiseOptions}
              defaultOptions
              cacheOptions
              components={{
                Option,
              }}
            />
          );
        }}
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
