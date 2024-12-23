import React, { useId } from "react";
import clsx from "clsx";
import type { FieldError } from "react-hook-form";

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
  error?: FieldError;
  inputClassName?: string;
  errorClassName?: string;
  preserveSpaceForErrorMessage?: boolean;
  labelClassName?: string;
  hideError?: boolean;
}

export const Input = React.forwardRef(function Input_(
  props: Props,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const {
    label,
    name,
    error,
    className,
    required,
    inputClassName,
    errorClassName,
    labelClassName,
    preserveSpaceForErrorMessage = true,
    hideError = false,
    ...restProps
  } = props;
  const id = useId();
  return (
    <div className={clsx("block", className)}>
      {label ? (
        <label
          className={`block body-4 py-1 text-grey-500 font-bold ${labelClassName}`}
          htmlFor={id}
        >
          {label}
          {required && " *"}
        </label>
      ) : null}
      <input
        id={id}
        className={clsx("control", inputClassName, {
          error: error,
        })}
        ref={ref}
        {...restProps}
        name={name}
      ></input>

      {!hideError && (
        <div
          className={clsx(
            "whitespace-nowrap body-4 text-danger",
            errorClassName,
            {
              invisible: !error,
            }
          )}
        >
          {error?.message ??
            (preserveSpaceForErrorMessage ? "placeholder" : null)}
        </div>
      )}
    </div>
  );
});
