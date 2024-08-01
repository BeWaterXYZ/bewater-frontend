"use client";
import { useOrganization, useUser } from "@clerk/nextjs";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import ProfileMenu from "./profile-menu";
import Upgrade from "./upgrade";
import { icons } from "./icons";

const links = [
  {
    path: null,
    label: "Summary",
    icon: icons.dataUsage_20,
  },
  {
    path: `campaigns`,
    label: "Campaigns",
    icon: icons.tableSimple_20,
  },
  {
    path: `members`,
    label: "Members",
    icon: icons.people_20,
  },
  {
    path: `settings`,
    label: "Settings",
    icon: icons.settings_20,
  },
] as const;

export function Sidebar() {
  let segment = useSelectedLayoutSegment();
  let { user } = useUser();
  let { organization } = useOrganization();
  let isOrg = !!organization?.id;
  let links_ = isOrg
    ? links
    : links.filter(
        (l) =>
          !(["members", "settings"] as Array<string | null>).includes(l.path)
      );
  return (
    <div className="flex flex-col flex-1 border-r border-r-white/20">
      <div className="p-2 flex justify-between items-center mb-4">
        <ProfileMenu user={user} organization={organization} />
      </div>
      <div className="flex flex-1 flex-col gap-2 px-2">
        {links_.map((link) => (
          <Link
            key={link.label}
            className={clsx(
              "body-3 leading-5 p-2 rounded flex gap-2 items-center hover:bg-white/20 hover:text-gray-100 transition-colors ease-out duration-300",
              {
                "text-gray-500": link.path !== segment,
                "bg-white/20 text-gray-100": link.path === segment,
              }
            )}
            href={`/host/${link.path ?? ""}`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </div>
      <Upgrade />
    </div>
  );
}
