import { Avatar } from "@/components/avatar/avatar";
import { UserID, UserProfile } from "@/services/types";
import { searchUsers } from "@/services/user";
import clsx from "clsx";
import React, { ForwardedRef, useId, useRef } from "react";
import type { FieldError } from "react-hook-form";
import { Controller } from "react-hook-form";
import {
  ClassNamesConfig,
  components,
  OptionProps,
  SingleValue,
  SingleValueProps,
} from "react-select";
import AsyncSelect from "react-select/async";

const OptionComp = (props: OptionProps<UserProfile>) => {
  let { data } = props;
  return (
    <components.Option {...props}>
      <div className="flex gap-2">
        <div>
          <Avatar className="w-8 h-8" src={data.avatarURI} />
        </div>
        <div className="flex flex-col justify-around">
          <div className="body-4 text-grey-400">{data.userName}</div>
          <div className="body-4 text-grey-600">@{data.userName}</div>
        </div>
      </div>
    </components.Option>
  );
};

const SingleValueComp = (props: SingleValueProps<UserProfile>) => {
  return (
    <div className=" flex gap-2 ml-2" style={{ gridArea: "1/1/2/3" }}>
      <Avatar className="w-5 h-5" src={props.data.avatarURI} />
      <span className="body-4 text-grey-400">
        {props.data.userName ?? props.data.fullName}
      </span>
    </div>
  );
};

interface UserSearchProps extends React.ComponentPropsWithoutRef<"select"> {
  label?: string;
  name: string;
  exclude?: UserID[];
  error?: FieldError;
  control: any;
  disableError?: boolean;
  placeholder?: string;
  singleValue?: (props: SingleValueProps) => React.ReactElement | null;
  handleSelect?: (id: string) => void;
  controlClassName?: string;
}

export const UserSearch = React.forwardRef(function UserSearch_(
  props: UserSearchProps,
  ref: ForwardedRef<HTMLSelectElement>
) {
  const {
    label,
    name,
    error,
    className,
    required,
    control,
    handleSelect,
    value,
    disableError,
    singleValue,
    controlClassName,
    placeholder = "username, email or wallet address",
    exclude = [],
  } = props;
  const searchUserByKeyword =
    (toExclude: UserID[]) => async (inputValue: string) => {
      if (!inputValue) {
        return [];
      }
      let data = await searchUsers(inputValue);
      data = data
        .filter((up) => !toExclude.includes(up.id))
        .map((d) => ({ ...d, label: d.userName }));
      cacheOptions.current = data;
      return data;
    };
  const cacheOptions = useRef<UserProfile[]>([]);
  const id = useId();
  const styles: ClassNamesConfig<UserProfile> = {
    control: ({ isFocused }) => {
      return clsx(
        "control !p-0 !flex !shadow-none",
        {
          error: error,
          "!border-day hover:!border-day": isFocused,
        },
        controlClassName
      );
    },
    clearIndicator: () => "!hidden",
    indicatorSeparator: () => "!hidden",
    singleValue: () => "body-4 !text-white",
    menu: () => "!bg-[#0F1021] !border !border-midnight ",
    option: () => "!text-white hover:!bg-midnight !bg-transparent",
    input: () => "!text-white",
  };
  return (
    <div className={clsx("block", disableError ? "" : "pb-2", className)}>
      {label ? (
        <label
          className="block body-3 py-1 text-grey-500 font-bold"
          htmlFor={id}
        >
          {label}
          {required && " *"}
        </label>
      ) : null}

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          let value = cacheOptions.current.find((op) => op.id === field.value);
          return (
            <AsyncSelect
              id={id}
              isMulti={false}
              classNames={styles}
              className="font-secondary"
              placeholder={placeholder}
              loadingMessage={() => "Searching"}
              noOptionsMessage={() => "No options"}
              value={value}
              isClearable
              onChange={(val) => {
                val && handleSelect?.((val as SingleValue<UserProfile>)?.id!);
              }}
              loadOptions={searchUserByKeyword(exclude)}
              // defaultOptions
              cacheOptions={cacheOptions.current}
              components={{
                Option: OptionComp,
                // SingleValue: () => null,
                DropdownIndicator: () => null,
              }}
            />
          );
        }}
      />
      <div
        className={clsx("whitespace-nowrap body-4 py-1 text-danger", {
          invisible: !error,
          hidden: !!disableError,
        })}
      >
        {error?.message ?? "placeholder"}
      </div>
    </div>
  );
});
