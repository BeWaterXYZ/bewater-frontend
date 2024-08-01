"use client";
import clsx from "clsx";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

const links = [
  {
    label: " Basic Information",
    path: "/settings/basic",
  },
  {
    label: "Builder Settings",
    path: "/settings/extra",
  },
] as const;

export function Nav({ lng }: { lng: string }) {
  let segment = useSelectedLayoutSegment();
  return (
    <nav className=" w-full flex flex-row lg:flex-col gap-3 ">
      {links.map((link) => (
        <Link
          key={link.path}
          href={`/${lng}${link.path}`}
          className={clsx(
            "body-3 text-grey-400 p-3 lg:p-4 inline-block w-full rounded-sm text-center",
            segment && link.path.includes(segment)
              ? "bg-grey-900 "
              : "border lg:border-none border-grey-800"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
