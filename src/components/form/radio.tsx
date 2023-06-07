import * as RadioGroup from "@radix-ui/react-radio-group";
import clsx from "clsx";
import React, { useId } from "react";
import { Controller } from "react-hook-form";

interface RadioProps extends React.ComponentPropsWithoutRef<"input"> {
  options: {
    value: string;
    label: React.ReactNode;
  }[];
  onValueChange: (v: string) => void;
  control: any;
}

export const Radio = React.forwardRef(function Radio_(
  { options, name, onValueChange, control }: RadioProps,
  ref: any
) {
  let id = useId();

  return (
    <Controller
      name={name!}
      control={control}
      render={({ field }) => {
        return (
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
                    "flex-1 flex gap-2 items-center rounded-sm border border-white/10  p-4",
                    field.value === op.value ? "bg-white/10" : "bg-white/[0.02]"
                  )}
                  key={id + op.value}
                >
                  <RadioGroup.Item
                    className="bg-white h-6 w-6 rounded-full "
                    value={op.value}
                    id={id + op.value + "-item"}
                  >
                    <RadioGroup.Indicator className=" flex items-center justify-center relative w-full h-full rounded-full bg-day after:content-[''] after:block after:w-[12px] after:h-[12px] after:rounded-full after:bg-white" />
                  </RadioGroup.Item>
                  <label className="text-[14px]" htmlFor={id + op.value + "-item"}>
                    {op.label}
                  </label>
                </div>
              );
            })}
          </RadioGroup.Root>
        );
      }}
    ></Controller>
  );
});
