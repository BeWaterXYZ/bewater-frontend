import React, { useId } from "react";
import clsx from "clsx";
import type { FieldError } from "react-hook-form";

interface Props extends React.ComponentPropsWithoutRef<"textarea"> {
  label?: string;
  error?: FieldError;
}

export const TextArea = React.forwardRef(function TextArea(
  props: Props,
  ref: React.ForwardedRef<HTMLTextAreaElement>
) {
  const { label, name, error, className, required, ...restProps } = props;
  const id = useId();
  return (
    <div className={clsx("block", className)}>
      {label ? (
        <label
          className="block body-4 py-1 text-grey-500 font-bold"
          htmlFor={id}
        >
          {label}
          {required && " *"}
        </label>
      ) : null}
      <textarea
        id={id}
        className={clsx("control", {
          error: error,
        })}
        ref={ref}
        {...restProps}
        name={name}
      ></textarea>

      <div
        className={clsx("whitespace-nowrap body-4  text-danger", {
          invisible: !error,
        })}
      >
        {error?.message ?? "placeholder"}
      </div>
    </div>
  );
});
