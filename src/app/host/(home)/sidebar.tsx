"use client";
import { BeWaterLogo } from "@/components/header/logo";
import {
  OrganizationSwitcher,
  UserButton,
  useOrganization,
  useUser,
} from "@clerk/nextjs";
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
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 15a3 3 0 100-6 3 3 0 000 6z"
        ></path>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M18.727 14.727a1.5 1.5 0 00.3 1.655l.055.054a1.816 1.816 0 010 2.573 1.818 1.818 0 01-2.573 0l-.055-.055a1.5 1.5 0 00-1.654-.3 1.5 1.5 0 00-.91 1.373v.155a1.818 1.818 0 11-3.636 0V20.1a1.5 1.5 0 00-.981-1.373 1.5 1.5 0 00-1.655.3l-.054.055a1.818 1.818 0 01-3.106-1.287 1.818 1.818 0 01.533-1.286l.054-.055a1.5 1.5 0 00.3-1.654 1.5 1.5 0 00-1.372-.91h-.155a1.818 1.818 0 110-3.636H3.9a1.5 1.5 0 001.373-.981 1.5 1.5 0 00-.3-1.655l-.055-.054A1.818 1.818 0 117.491 4.99l.054.054a1.5 1.5 0 001.655.3h.073a1.5 1.5 0 00.909-1.372v-.155a1.818 1.818 0 013.636 0V3.9a1.499 1.499 0 00.91 1.373 1.5 1.5 0 001.654-.3l.054-.055a1.817 1.817 0 012.573 0 1.819 1.819 0 010 2.573l-.055.054a1.5 1.5 0 00-.3 1.655v.073a1.5 1.5 0 001.373.909h.155a1.818 1.818 0 010 3.636H20.1a1.499 1.499 0 00-1.373.91z"
        ></path>
      </svg>
    ),
  },
] as const;

export function Sidebar() {
  let segment = useSelectedLayoutSegment();
  let { user } = useUser();
  let { organization } = useOrganization();
  let isAdmin = user?.publicMetadata?.teamMember ?? false;
  let isOrg = !!organization?.id;
  let links_ = isOrg ? links : links.filter((l) => l.path !== "settings");
  return (
    <div className="flex-1 border-r border-r-white/20">
      <div className="p-2 flex justify-between items-center">
        <div className="relative h-8 w-32">
          <div className="absolute">
            {isAdmin ? (
              <OrganizationSwitcher />
            ) : (
              <Image
                className="block"
                src="/logo/bewater-h.svg"
                width={120}
                height={24}
                alt="bewater logo"
              />
            )}
          </div>
        </div>
        <div className="">
          <UserButton />
        </div>
      </div>
      <div className="flex flex-col gap-2 p-2 py-4 ">
        {links_.map((link) => (
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
