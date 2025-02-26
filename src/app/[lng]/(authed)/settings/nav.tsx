"use client";
import { useClerk } from "@clerk/nextjs";
import clsx from "clsx";
import Link from "next/link";
import { redirect, useRouter, useSelectedLayoutSegment } from "next/navigation";
import { useEffect } from "react";

const links = [
  {
    label: " Basic Information",
    path: "/settings/basic",
  },
  {
    label: "Builder Profile",
    path: "/settings/extra",
  },
] as const;

export function Nav({ lng }: { lng: string }) {
  let segment = useSelectedLayoutSegment();
  const clerk = useClerk();
  
  if (!clerk.user) {
    return null;
  }
  return (
    <nav className=" w-full flex flex-row lg:flex-col gap-3 ">
      {links.map((link) => (
        <Link
          key={link.path}
          href={`/${lng}${link.path}`}
          className={clsx(
            "body-3 text-grey-400 p-3 lg:p-4 inline-block w-full rounded-sm text-left",
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
