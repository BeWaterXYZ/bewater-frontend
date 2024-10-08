"use client";
import clsx from "clsx";
import { Cross2Icon } from "@radix-ui/react-icons";

export interface TagProps {
  label: string;
  title?: string;
  classes: string;
  onClick?: () => void;
}

export function Tag({ label, classes, onClick, title }: TagProps) {
  return (
    <div
      title={title ?? label}
      className={clsx(
        "whitespace-nowrap inline-block rounded-sm text-white px-2 leading-4",
        classes
      )}
    >
      {label}{" "}
      {onClick && (
        <Cross2Icon
          className="inline w-3 h-3 cursor-pointer"
          onClick={onClick}
        />
      )}
    </div>
  );
}
