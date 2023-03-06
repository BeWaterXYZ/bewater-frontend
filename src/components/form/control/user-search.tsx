import { Avatar } from '@/components/avatar/avatar';
import { UserID, UserProfile } from '@/services/types';
import { searchUsers } from '@/services/user';
import clsx from 'clsx';
import React, { ForwardedRef, useId } from 'react';
import type { FieldError } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import {
  ClassNamesConfig,
  components,
  OptionProps,
  SingleValue,
  SingleValueProps,
} from 'react-select';
import AsyncSelect from 'react-select/async';

const OptionComp = (props: OptionProps<UserProfile>) => {
  let { data } = props;
  return (
    <components.Option {...props}>
      <div className="flex gap-2">
        <div>
          <Avatar
            className="w-10 h-10"
            src={data.avatarURI}
            walletAddress={data.walletAddress}
          />
        </div>
        <div className="flex flex-col justify-around">
          <div className="body-5 text-grey-400">
            {data.fullName ?? data.userName}
          </div>
          <div className="body-5 text-grey-600">@{data.userName}</div>
        </div>
      </div>
    </components.Option>
  );
};

const SingleValueComp = (props: SingleValueProps<UserProfile>) => {
  return (
    <div className=" flex gap-2 pl-2" style={{ gridArea: '1/1/2/3' }}>
      <Avatar
        className="w-5 h-5"
        src={props.data.avatarURI}
        walletAddress={props.data.walletAddress}
      />
      <span className="body-4 text-grey-400">
        {' '}
        {props.data.fullName ?? props.data.userName}
      </span>
    </div>
  );
};

const searchUserByKeyword =
  (toExclude: UserID[]) => async (inputValue: string) => {
    let data = await searchUsers(inputValue);
    console.log({ data });
    data = data
      .filter((up) => !toExclude.includes(up.userId))
      .map((d) => ({ ...d, label: d.fullName }));
    cacheOptions = data;
    return data;
  };

let cacheOptions: UserProfile[] = [];

interface UserSearchProps extends React.ComponentPropsWithoutRef<'select'> {
  label?: string;
  name: string;
  exclude?: UserID[];
  error?: FieldError;
  control: any;
}

export const UserSearch = React.forwardRef(function UserSearch_(
  props: UserSearchProps,
  ref: ForwardedRef<HTMLSelectElement>,
) {
  const {
    label,
    name,
    error,
    className,
    required,
    control,
    value,
    exclude = [],
  } = props;
  const id = useId();
  const styles: ClassNamesConfig<UserProfile> = {
    control: ({ isFocused }) => {
      return clsx('control !p-0 !flex !shadow-none', {
        error: error,
        '!border-day hover:!border-day': isFocused,
      });
    },
    clearIndicator: () => '!hidden',
    indicatorSeparator: () => '!hidden',
    singleValue: () => 'body-4 !text-white',
    menu: () => '!bg-[#0F1021] !border !border-midnight ',
    option: () => '!text-white hover:!bg-midnight !bg-transparent',
    input: () => '!text-white',
  };
  return (
    <div className={clsx('block pb-2', className)}>
      {label ? (
        <label
          className="block body-3 py-1 text-grey-500 font-bold"
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
                val &&
                  field.onChange((val as SingleValue<UserProfile>)?.userId);
              }}
              loadOptions={searchUserByKeyword(exclude)}
              defaultOptions
              cacheOptions
              components={{
                Option: OptionComp,
                SingleValue: SingleValueComp,
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
