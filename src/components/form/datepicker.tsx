import React, { useId } from "react";
import clsx from "clsx";
import type { FieldError } from "react-hook-form";
import { CalendarIcon } from "@radix-ui/react-icons";

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
  error?: FieldError;
}

export const DatePicker = React.forwardRef(function DatePicker_(
  props: Props,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const { label, error, className, required, ...restProps } = props;
  const id = useId();
  return (
    <div className={clsx("block group relative", className)}>
      {label ? (
        <label
          className="block text-xs text-grey-500 font-bold mb-2 group-hover:text-day group-focus:text-day transition-colors"
          htmlFor={id}
        >
          {label}
          {required && " *"}
        </label>
      ) : null}
      <div className=" relative w-full text-[14px] bg-night  block body-3   rounded-sm text-white border border-midnight hover:!border-day focus:!border-day focus:outline-none transition-colors">
        <input
          type="date"
          ref={ref}
          className="w-full bg-white/0 h-10 px-2"
          {...restProps}
        />
        <CalendarIcon
          className="text-white/75 absolute right-2 top-2 pointer-events-none"
          height={20}
          width={20}
        />
      </div>

      <div
        className={clsx("absolute whitespace-nowrap text-xs  text-danger", {
          invisible: !error,
        })}
      >
        {error?.message ?? "placeholder"}
      </div>
    </div>
  );
});
