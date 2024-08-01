import * as RadioGroup from "@radix-ui/react-radio-group";
import clsx from "clsx";
import React, { useId } from "react";
import { Controller, FieldError } from "react-hook-form";

interface RadioProps extends React.ComponentPropsWithoutRef<"input"> {
  options: {
    value: string;
    label: React.ReactNode;
  }[];
  onValueChange: (v: string) => void;
  control: any;
  error?: FieldError;
  label?: string;
  className?: string;
}

export const Radio = React.forwardRef(function Radio_(
  {
    options,
    name,
    onValueChange,
    control,
    label,
    error,
    className,
  }: RadioProps,
  ref: any
) {
  let id = useId();

  return (
    <Controller
      name={name!}
      control={control}
      render={({ field }) => {
        return (
          <div className={clsx("block group relative pb-5", className)}>
            {label ? (
              <label
                className="block text-xs mb-2 text-grey-500 font-bold group-hover:text-day group-focus:text-day transition-colors"
                htmlFor={id}
              >
                {label}
              </label>
            ) : null}
            <RadioGroup.Root
              className="flex flex-wrap gap-4"
              defaultValue={field.value?.toString()}
              value={field.value?.toString()}
              onValueChange={onValueChange}
            >
              {options.map((op) => {
                return (
                  <div
                    className={clsx(
                      "flex-1 flex gap-3 items-center rounded-sm border border-white/10 p-4 text-grey-300",
                      field.value === op.value
                        ? "bg-white/10"
                        : "bg-white/[0.02]"
                    )}
                    key={id + op.value}
                  >
                    <RadioGroup.Item
                      className="bg-white h-5 min-w-[20px] w-5 rounded-full "
                      value={op.value}
                      id={id + op.value + "-item"}
                    >
                      <RadioGroup.Indicator className=" flex items-center justify-center relative w-full h-full rounded-full bg-day after:content-[''] after:block after:w-[8px] after:h-[8px] after:rounded-full after:bg-white" />
                    </RadioGroup.Item>
                    <label
                      className="text-[14px]"
                      htmlFor={id + op.value + "-item"}
                    >
                      {op.label}
                    </label>
                  </div>
                );
              })}
            </RadioGroup.Root>
            <div
              className={clsx(
                "absolute whitespace-nowrap text-[12px]  text-danger",
                {
                  invisible: !error,
                }
              )}
            >
              {error?.message ?? "placeholder"}
            </div>
          </div>
        );
      }}
    ></Controller>
  );
});
