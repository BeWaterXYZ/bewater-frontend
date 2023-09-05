"use client";
import clsx from "clsx";

interface Props {
  src?: string;
  className?: string;
  onClick?: () => void;
}

export const Avatar = ({ src, className, onClick }: Props) => {
  return (
    <div className={clsx("relative", className)}>
      <img
        width={200}
        height={200}
        className="w-full h-full rounded-full cursor-pointer object-cover hover:opacity-75 transition-opacity ease-out"
        src={
          src ??
          "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yUzBXV1ZUT21nNUlnTERoMXhIUURZaERvM0UiLCJyaWQiOiJ1c2VyXzJUNnk0c2tDME9tRGNzbndEdFdBNXVNMFk3NSJ9"
        }
        alt="avatar"
      />
    </div>
  );
};
