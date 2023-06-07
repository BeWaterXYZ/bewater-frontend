import React, { useId } from "react";
import clsx from "clsx";
import type { FieldError } from "react-hook-form";

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
  error?: FieldError;
}

export const DatePicker = React.forwardRef(function DatePicker_(
  props: Props,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const { label, error, className, required, ...restProps } = props;
  console.log(restProps);
  const id = useId();
  return (
    <div className={clsx("block group relative", className)}>
      {label ? (
        <label
          className="block text-[12px] py-1 text-grey-500 font-bold group-hover:text-day group-focus:text-day transition-colors"
          htmlFor={id}
        >
          {label}
          {required && " *"}
        </label>
      ) : null}
      <input
        type="date"
        
        ref={ref}
        className="datepicker w-full text-[14px] bg-night  block body-3 py-2 px-2  text-white border border-midnight hover:!border-day focus:!border-day focus:outline-none transition-colors"
        {...restProps}
      />
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
