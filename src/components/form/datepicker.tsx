import React, { ReactNode, useId } from "react";
import clsx from "clsx";
import { Controller, type FieldError } from "react-hook-form";
import { CalendarIcon } from "@radix-ui/react-icons";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import { format, parseISO } from "date-fns";
import "./datepicker.css";
interface Props extends React.ComponentPropsWithoutRef<"input"> {
  label?: ReactNode;
  onValueChange: (v: string) => void;
  error?: FieldError;
  control: any;
  dateFormat?: string;
  showTimeSelect?: boolean;
}

export const DatePicker = React.forwardRef(function DatePicker_(
  props: Props,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const {
    label,
    error,
    className,
    name,
    required,
    control,
    onValueChange,
    placeholder = "Click to select a date",
    disabled,
    dateFormat = "yyyy/MM/dd",
    showTimeSelect = false,
  } = props;
  const id = useId();

  return (
    <Controller
      name={name!}
      control={control}
      render={({ field }) => {
        return (
          <div className={clsx("block group relative", className)}>
            {label ? (
              <label
                className="block text-xs text-grey-500 font-bold pb-2 group-hover:text-day group-focus:text-day group-focus-within:text-day transition-colors"
                htmlFor={id}
              >
                {label}
                {required && " *"}
              </label>
            ) : null}

            <div
              className="relative w-full text-[14px] bg-night block body-3 rounded-sm text-white border border-midnight hover:!border-day focus:!border-day focus:outline-none transition-colors"
              id={id}
            >
              <ReactDatePicker
                showTimeSelect={showTimeSelect}
                dateFormat={dateFormat}
                disabled={disabled}
                wrapperClassName="w-full"
                calendarClassName="!flex"
                className={clsx("w-full bg-white/0 h-10 px-2 outline-none", {
                  "text-white/30": !!disabled,
                })}
                placeholderText={placeholder}
                selected={field.value ? parseISO(field.value as string) : null}
                onChange={(date) => {
                  date && onValueChange(date.toISOString());
                }}
              />
              <CalendarIcon
                className="text-grey-500 absolute right-2 top-[10px] pointer-events-none"
                height={20}
                width={20}
              />
            </div>

            <div
              className={clsx(
                "absolute whitespace-nowrap text-xs text-danger",
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
    />
  );
});
