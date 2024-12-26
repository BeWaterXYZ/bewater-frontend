import React, { useId } from "react";
import clsx from "clsx";
import type { FieldError } from "react-hook-form";

interface Props extends React.ComponentPropsWithoutRef<"textarea"> {
  label?: string | React.ReactNode;
  error?: FieldError;
  maxLength?: number;
}

export const TextArea = React.forwardRef(function TextArea(
  props: Props,
  ref: React.ForwardedRef<HTMLTextAreaElement>
) {
  const { label, name, error, className, required, maxLength, ...restProps } = props;
  const id = useId();
  const [length, setLength] = React.useState(0);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLength(e.target.value.length);
    if (restProps.onChange) {
      restProps.onChange(e);
    }
  };

  return (
    <div className={clsx("block", className)}>
      <div className="flex justify-between items-center">
        {label ? (
          <label
            className="block body-4 py-1 text-grey-500 font-bold"
            htmlFor={id}
          >
            {label}
            {required && " *"}
          </label>
        ) : null}
        {maxLength && (
          <span className="body-4 text-grey-500">
            {length}/{maxLength}
          </span>
        )}
      </div>
      <textarea
        id={id}
        className={clsx("control", {
          error: error,
        })}
        ref={ref}
        maxLength={maxLength}
        {...restProps}
        onChange={handleInput}
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
