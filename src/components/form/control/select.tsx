import React, { ForwardedRef, useId, useRef } from "react";
import clsx from "clsx";
import type { FieldError, Merge } from "react-hook-form";
import { Controller } from "react-hook-form";
import RSelect, { ClassNamesConfig } from "react-select";
import { OptionItem } from "@/constants/options/types";
interface SelectProps<T extends string>
  extends React.ComponentPropsWithoutRef<"select"> {
  label?: string;
  name: string;
  id?: string;
  error?: FieldError | Merge<FieldError, (FieldError | undefined)[]>;
  control: any;
  options: OptionItem<T>[];
  maxSelections?: number;
  isSingle?: boolean;
  usHandler?: (newValue: any[]) => void;
}

export const Select = React.forwardRef(function Select_<T extends string>(
  props: SelectProps<T>,
  ref: ForwardedRef<HTMLSelectElement>
) {
  const {
    options,
    label,
    name,
    error,
    className,
    id: elId,
    required,
    control,
    maxSelections,
    isSingle = false,
    usHandler,
    defaultValue,
  } = props;

  const id = useId();
  const styles: ClassNamesConfig<OptionItem<T>> = {
    container: () => "",
    control: ({ isFocused }) => {
      return clsx("!relative control !p-0 !flex !shadow-none ", {
        error: error,
        "!border-day hover:!border-day": isFocused,
      });
    },
    clearIndicator: () => "!hidden",
    indicatorSeparator: () => "!hidden",
    singleValue: () => "text-sm leading-5 !text-gray-300",
    multiValue: ({ data }) => data.classes.container + " !my-1",
    multiValueLabel: ({ data }) => data.classes.text ?? "",
    multiValueRemove: () => "hover:!bg-transparent",
    menu: () =>
      "!top-[40px] !bg-[#0F1021] !rounded-sm !border !border-midnight",
    menuList: () => "!p-0",
    option: ({ data }) =>
      `font-secondary !text-gray-300 !text-sm !p-2 hover:!bg-midnight !bg-transparent`,
    placeholder: () => "!text-gray-600",
  };
  const elRef = useRef<HTMLDivElement>(null);

  return (
    <div className={clsx("block", className)} ref={elRef}>
      {label ? (
        <label
          className="block body-4 py-1 text-grey-500 font-bold"
          htmlFor={id}
        >
          {label}
          {required && " *"}
        </label>
      ) : null}

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          let cur = field.value ?? [];

          let reachMax = maxSelections ? cur.length === maxSelections : false;
          let showOptions = !reachMax || maxSelections === 1;
          return (
            <RSelect
              id={id}
              onMenuOpen={() =>
                void setTimeout(
                  () =>
                    elRef.current?.parentElement?.scrollTo({
                      top: elRef.current?.offsetTop - 65,
                      behavior: "smooth",
                    }),
                  0
                )
              }
              isMulti={!isSingle}
              classNames={styles}
              options={showOptions ? options : []}
              maxMenuHeight={148}
              noOptionsMessage={() => {
                if (cur.length === maxSelections)
                  return "You have reached max selections";
                return "no options";
              }}
              value={cur.map((value: string) =>
                options.find((op) => value === op.value)
              )}
              onChange={(val: any) => {
                if (!Array.isArray(val)) {
                  val = [val];
                }
                const values = Array.from(val.values()).map(
                  (d: any) => d.value
                );
                const rawVal = [...values];
                if (maxSelections) {
                  while (values.length > maxSelections) {
                    values.shift();
                  }
                }
                if (usHandler && typeof usHandler === "function") {
                  usHandler(rawVal);
                }
                field.onChange(values);
              }}
              onBlur={field.onBlur}
              defaultValue={defaultValue}
            />
          );
        }}
      />
      <div
        className={clsx("whitespace-nowrap body-4 text-danger", {
          invisible: !error,
        })}
      >
        {error?.message ?? "placeholder"}
      </div>
    </div>
  );
});
