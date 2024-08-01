import { Controller, FieldError } from "react-hook-form";
import clsx from "clsx";
import { useId } from "react";

interface RateProps {
  name: string;
  onValueChange: (v: number) => void;
  control: any;
  label?: string;
  error?: FieldError;
}

export function Rate({
  name,
  onValueChange,
  control,
  label,
  error,
}: RateProps) {
  const id = useId();

  return (
    <Controller
      name={name!}
      control={control}
      render={({ field }) => {
        return (
          <div className={clsx("block group relative pb-5")}>
            {label ? (
              <label
                className="block text-xs text-grey-500 font-bold mb-2 group-hover:text-day group-focus:text-day transition-colors"
                htmlFor={id}
              >
                {label}
              </label>
            ) : null}
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rate) => {
                return (
                  <button
                    className={clsx(
                      "w-8 h-8  rounded-sm hover:border hover:border-day",
                      rate === field.value
                        ? "bg-day text-grey-800"
                        : "bg-grey-800 text-white"
                    )}
                    key={rate}
                    type="button"
                    onClick={() => {
                      onValueChange(rate);
                    }}
                  >
                    {rate}
                  </button>
                );
              })}
            </div>

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
    />
  );
}
