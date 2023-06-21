import clsx from "clsx";
import React, { useId } from "react";
import { Controller, FieldError } from "react-hook-form";
import { Uploader, UploaderProps } from "../uploader";

interface UploaderInputProps extends Omit<UploaderProps, "urls" | "onChange"> {
  name: string;
  onValueChange: (v: string | string[]) => void;
  control: any;
  label?: string;
  error?: FieldError;
}

export function UploaderInput({
  name,
  onValueChange,
  control,
  title,
  subTitlte,
  height,
  width,
  label,
  max,
  error,
}: UploaderInputProps) {
  let id = useId();

  return (
    <Controller
      name={name!}
      control={control}
      render={({ field }) => {
        return (
          <div className={clsx("block group relative pb-5")}>
            {label ? (
              <label
                className="block text-[12px] mb-2 text-grey-500 font-bold group-hover:text-day group-focus:text-day transition-colors"
                htmlFor={id}
              >
                {label}
              </label>
            ) : null}
            <Uploader
              title={title}
              subTitlte={subTitlte}
              height={height}
              width={width}
              max={max}
              urls={
                max === 1 ? (field.value ? [field.value] : []) : field.value
              }
              onChange={(urls) => {
                console.log(2, field.name, urls);
                onValueChange(max === 1 ? urls[0] ?? "" : urls);
              }}
            />
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
}
