import React, { useId } from "react";
import * as RSwitch from "@radix-ui/react-switch";
import { Controller, FieldError } from "react-hook-form";

interface SwitchRawProps {
  label: string;
  onCheckedChange: (v: boolean) => void;
  checked: boolean;
}
export const SwitchRaw = ({
  label,
  onCheckedChange,
  checked,
}: SwitchRawProps) => {
  let id = useId();
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <RSwitch.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="bg-gray-200 w-[32px] h-5 rounded-full relative data-[state='checked']:bg-day mr-2"
        id={`switch-${id}`}
      >
        <RSwitch.Thumb className="w-4 h-4 block rounded-full translate-x-[2px] bg-white data-[state='checked']:translate-x-[14px] transition-transform" />
      </RSwitch.Root>
      <label
        className="font-secondary text-sm leading-5"
        htmlFor={`switch-${id}`}
      >
        {label}
      </label>
    </div>
  );
};

interface SwitchProps {
  onValueChange: (v: boolean) => void;
  control: any;
  error?: FieldError;
  label?: string;
  name: string;
}
export const Switch = ({
  name,
  onValueChange,
  error,
  label,
  control,
}: SwitchProps) => {
  return (
    <Controller
      name={name!}
      control={control}
      render={({ field }) => {
        return (
          <SwitchRaw
            checked={field.value}
            label={label ?? ""}
            onCheckedChange={(b) => onValueChange(b)}
          />
        );
      }}
    />
  );
};
