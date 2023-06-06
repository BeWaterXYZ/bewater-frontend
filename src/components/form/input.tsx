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
  const { label, name, error, className, required, ...restProps } = props;
  const id = useId();
  return (
    <div className={clsx("block", className)}>
      {label ? (
        <label
          className="block text-[12px] py-1 text-grey-500 font-bold"
          htmlFor={id}
        >
          {label}
          {required && " *"}
        </label>
      ) : null}
      <input
        id={id}
        className={clsx(
          "w-full text-[14px] bg-night  block body-3 py-2 px-2 text-white hover:!border-gray-400 focus:!border-day focus:outline-none",
          {
            error: error,
          }
        )}
        ref={ref}
        {...restProps}
        name={name}
      ></input>

      <div
        className={clsx("whitespace-nowrap text-[12px]  text-danger", {
          invisible: !error,
        })}
      >
        {error?.message ?? "placeholder"}
      </div>
    </div>
  );
});
