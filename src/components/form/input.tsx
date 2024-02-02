import React, { useId } from "react";
import clsx from "clsx";
import type { FieldError } from "react-hook-form";

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
  error?: FieldError;
  inputClassName?: string;
}

export const Input = React.forwardRef(function Input_(
  props: Props,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const {
    id,
    label,
    name,
    error,
    className,
    required,
    inputClassName,
    disabled,
    ...restProps
  } = props;
  const did = useId();
  return (
    <div className={clsx("block group relative mb-5", className)}>
      {label ? (
        <label
          className={clsx("block text-xs text-grey-500 font-bold pb-2",
            {
              "group-hover:text-day group-focus:text-day group-focus-within:text-day transition-colors": !disabled
            }
          )}
          htmlFor={did}
        >
          {label}
          {required && " *"}
        </label>
      ) : null}
      <input
        id={id ? id : did}
        className={clsx(
          "w-full text-[14px] bg-night disabled:bg-night/50 disabled:text-grey-600 block body-3 py-2 px-2 rounded-sm text-white border border-midnight",
          inputClassName,
          {
            error: error,
            "hover:!border-day focus:!border-day focus:outline-none transition-colors": !disabled,
          }
        )}
        disabled={!!disabled}
        ref={ref}
        {...restProps}
        name={name}
      ></input>

      <div
        className={clsx("absolute whitespace-nowrap text-[12px] text-danger", {
          invisible: !error,
        })}
      >
        {error?.message ?? "placeholder"}
      </div>
    </div>
  );
});
