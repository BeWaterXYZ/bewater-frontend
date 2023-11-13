"use client";
import { ChallengeID } from "@/services/types";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
const links = [
  {
    path: "org",
    label: "Organization",
  },
  // {
  //   path: "people",
  //   label: "People",
  // },
];
export function Header() {
  let segment = useSelectedLayoutSegment();

  return (
    <div className="text-white flex justify-between w-full h-14 items-center p-4 border-b border-b-white/20">
      <div className="flex">
        {links.map((link) => (
          <Link
            key={link.label}
            className={clsx(
              "body-2 p-3   rounded-[6px] flex  gap-2 items-center",
              link.path === segment ? "text-day" : "text-gray-500"
            )}
            href={`/host/settings/${link.path}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div></div>
    </div>
  );
}
