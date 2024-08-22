"use client";
import clsx from "clsx";

export function PageFilterTag({
  keyword,
  value,
  label,
  on,
  toggle,
}: {
  keyword: string;
  value: string;
  label: string;
  on: boolean;
  toggle: (key: string, value: string) => void;
}) {
  let onToggle = (key: string, value: string) => () => {
    toggle(key, value);
  };
  return (
    <div className="w-full flex justify-start">
      <label
        className={clsx(
          "body-4 flex items-center my-1 cursor-pointer",
          on ? "text-white" : "text-[#94A3B8]"
        )}
      >
        <input
          className="mr-2 w-4 h-4 block accent-[#00FFFF]"
          type="checkbox"
          checked={on}
          onChange={onToggle(keyword, value)}
        ></input>
        <span>{label}</span>
      </label>
      {/* <div
        className={clsx(
          "body-4 w-[30px] text-center",
          on ? "text-white" : "text-[#94A3B8]"
        )}
      >
        {amount}
      </div> */}
    </div>
  );
}
