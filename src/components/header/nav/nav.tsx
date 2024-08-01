"use client";
import clsx from "clsx";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { nav } from "../links";

import { MenuItemType } from "../links";

type NavItemProps = {
  item: MenuItemType;
  underline?: boolean;
  className?: string;
};

export function NavItem({ item, underline, className }: NavItemProps) {
  return (
    <Link
      href={item.path ?? "/"}
      className={clsx(
        " flex items-center h-full body-2 font-bold outline-none py-2 uppercase",
        {
          "text-day [text-shadow:0_0_6px_theme(colors.day)]": item.active,
          "border-b-2 border-b-day": underline && item.active,
        },
        className
      )}
    >
      {item.label}
    </Link>
  );
}

type NavImplProps = {
  items: MenuItemType[];
};

export const NavImpl = ({ items }: NavImplProps) => {
  return (
    <ul
      className={clsx(
        "flex flex-row gap-x-8 h-full items-center justify-center "
      )}
    >
      {items.map((item, i) => (
        <li key={item.path} className={clsx("h-full touch-manipulation")}>
          <NavItem item={item} />
        </li>
      ))}
    </ul>
  );
};

export const Nav = () => {
  const segments = useSelectedLayoutSegments();
  let items = nav.map((n) => ({
    ...n,
    active: segments.some((s) => n.path?.includes(s)),
  }));

  return <NavImpl items={items} />;
};
