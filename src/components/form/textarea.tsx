import React, { useId } from "react";
import clsx from "clsx";
import type { FieldError } from "react-hook-form";

interface Props extends React.ComponentPropsWithoutRef<"textarea"> {
  label?: string;
  error?: FieldError;
}

export const TextArea = React.forwardRef(function TextArea_(
  props: Props,
  ref: React.ForwardedRef<HTMLTextAreaElement>
) {
  const { label, name, error, className, required, ...restProps } = props;
  const id = useId();
  return (
    <div className={clsx("block group relative pb-4", className)}>
      {label ? (
        <label
          className="block text-[12px] py-1 text-grey-500 font-bold group-hover:text-day group-focus:text-day transition-colors"
          htmlFor={id}
        >
          {label}
          {required && " *"}
        </label>
      ) : null}
      <textarea
        id={id}
        className={clsx(
          "w-full text-[14px] bg-night  block body-3 py-2 px-2 rounded-sm text-white border border-midnight hover:!border-day focus:!border-day focus:outline-none transition-colors",
          {
            error: error,
          }
        )}
        ref={ref}
        {...restProps}
        name={name}
      ></textarea>

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
