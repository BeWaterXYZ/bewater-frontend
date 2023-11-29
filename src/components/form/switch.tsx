import React, { useId } from "react";
import * as RSwitch from "@radix-ui/react-switch";
import { Controller, FieldError } from "react-hook-form";

interface SwitchRawProps {
  label: string;
  onCheckedChange: (v: boolean) => void;
  checked: boolean;
}
const SwitchRaw = ({ label, onCheckedChange, checked }: SwitchRawProps) => {
  let id = useId();
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <label
        className="body-3"
        htmlFor={`switch-${id}`}
        style={{ paddingRight: 15 }}
      >
        {label}
      </label>
      <RSwitch.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="bg-black w-[40px] h-[24px] rounded-full relative  data-[state='checked']:bg-day"
        id={`switch-${id}`}
      >
        <RSwitch.Thumb className="w-5 h-5 block rounded-full translate-x-[2px] bg-white data-[state='checked']:translate-x-[17px] transition-transform" />
      </RSwitch.Root>
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
  return <Controller
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
  />;
};
