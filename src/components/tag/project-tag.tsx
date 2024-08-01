"use client";
import clsx from "clsx";
import { Tag } from "./tag";

interface TagProjectTagProps {
  label: string;
  className?: string;
  onClick?: () => void;
}

export function TagProjectTag({
  label,
  className,
  onClick,
}: TagProjectTagProps) {
  !label && console.log({ label });
  return (
    <Tag
      label={label}
      classes={clsx(
        "body-4 border border-grey-300 !rounded !bg-transparent uppercase !px-1",
        "!text-grey-300 !p-0",
        className
      )}
      onClick={onClick}
    />
  );
}
