import React, { useId } from "react";
import clsx from "clsx";
import type { FieldError } from "react-hook-form";

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
  error?: FieldError;
}

export const Input = React.forwardRef(function Input_(
  props: Props,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const { id, label, name, error, className, required, readOnly = false, ...restProps } = props;
  const did = useId();
  return (
    <div className={clsx("block group relative pb-5", className)}>
      {label ? (
        <label
          className="block text-xs text-grey-500 font-bold mb-2 group-hover:text-day group-focus:text-day transition-colors"
          htmlFor={did}
        >
          {label}
          {required && " *"}
        </label>
      ) : null}
      <input
        id={id ? id : did}
        className={clsx(
          "w-full text-[14px] bg-night disabled:bg-night/50 disabled:text-grey-600 block body-3 py-2 px-2  rounded-sm text-white border border-midnight hover:!border-day focus:!border-day focus:outline-none transition-colors",
          {
            error: error,
          }
        )}
        ref={ref}
        {...restProps}
        name={name}
        readOnly={readOnly}
      ></input>

      <div
        className={clsx("absolute whitespace-nowrap text-[12px]  text-danger", {
          invisible: !error,
        })}
      >
        {error?.message ?? "placeholder"}
      </div>
    </div>
  );
});
