"use client";
import { BeWaterLogo } from "@/components/header/logo";
import { UserButton } from "@clerk/nextjs";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

const links = [
  {
    path: null,
    label: "Summary",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="inherit"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 15v2m4-6v6m4-10v10m-8.2 4h8.4c1.68 0 2.52 0 3.162-.327a3 3 0 001.311-1.311C21 18.72 21 17.88 21 16.2V7.8c0-1.68 0-2.52-.327-3.162a3 3 0 00-1.311-1.311C18.72 3 17.88 3 16.2 3H7.8c-1.68 0-2.52 0-3.162.327a3 3 0 00-1.311 1.311C3 5.28 3 6.12 3 7.8v8.4c0 1.68 0 2.52.327 3.162a3 3 0 001.311 1.311C5.28 21 6.12 21 7.8 21z"
        ></path>
      </svg>
    ),
  },
  {
    path: `campaigns`,
    label: "Campaigns",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="inherit"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M2 12l9.642 4.821c.131.066.197.099.266.111.06.012.123.012.184 0 .069-.012.135-.045.266-.11L22 12M2 17l9.642 4.821c.131.066.197.099.266.111.06.012.123.012.184 0 .069-.012.135-.045.266-.11L22 17M2 7l9.642-4.821c.131-.066.197-.098.266-.111a.5.5 0 01.184 0c.069.013.135.045.266.11L22 7l-9.642 4.821c-.131.066-.197.099-.266.111a.501.501 0 01-.184 0c-.069-.012-.135-.045-.266-.11L2 7z"
        ></path>
      </svg>
    ),
  },
  {
    path: `settings`,
    label: "Settings",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="inherit"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M22 21v-2a4.002 4.002 0 00-3-3.874M15.5 3.291a4.001 4.001 0 010 7.418M17 21c0-1.864 0-2.796-.305-3.53a4 4 0 00-2.164-2.165C13.796 15 12.864 15 11 15H8c-1.864 0-2.796 0-3.53.305a4 4 0 00-2.166 2.164C2 18.204 2 19.136 2 21M13.5 7a4 4 0 11-8 0 4 4 0 018 0z"
        ></path>
      </svg>
    ),
  },
];

export function Sidebar() {
  let segment = useSelectedLayoutSegment();
  console.log({ segment });
  return (
    <div className="flex-1 border-r border-r-white/20">
      <div className="p-2 flex justify-between items-center">
        <div>
          <Image
            src="/logo/bewater-h.svg"
            width={120}
            height={24}
            alt="bewater logo"
          />
        </div>
        <UserButton />
      </div>
      <div className="flex flex-col gap-2 p-2 py-4 ">
        {links.map((link) => (
          <Link
            key={link.label}
            className={clsx(
              "body-2 p-3 text-gray-500  rounded-[6px] flex gap-2 items-center",
              {
                "bg-white/20 text-white": link.path === segment,
              }
            )}
            href={`/host/${link.path ?? ""}`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
