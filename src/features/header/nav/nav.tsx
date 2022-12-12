'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';

import { MenuItemType } from '../links';

type NavItemProps = {
  item: MenuItemType;
  label?: string;
};

export function NavItem({ label, item }: NavItemProps) {
  // TODO
  const segments = useSelectedLayoutSegments();
  console.log({ segments });
  const isActive = segments.some((s) => item.path?.includes(s));
  return (
    <Link
      href={item.path ?? '/'}
      className={clsx(' flex items-center h-full heading-5 outline-none ', {
        'text-day border-b border-day': isActive,
      })}
    >
      {item?.label ? item?.label : label}
    </Link>
  );
}

type NavProps = {
  items: MenuItemType[];
};

export const Nav = ({ items }: NavProps) => {
  return (
    <ul
      className={clsx(
        'flex flex-row gap-x-8 h-full items-center justify-center ',
      )}
    >
      {items.map((item, i) => (
        <li key={item.path} className={clsx('h-full touch-manipulation')}>
          <NavItem item={item} />
        </li>
      ))}
    </ul>
  );
};
