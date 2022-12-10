import clsx from 'clsx';
import Link from 'next/link';

import { MenuItemType } from '../linkts';

type NavItemProps = {
  item: MenuItemType;
  label?: string;
};

export function NavItem({ label, item }: NavItemProps) {
  // TODO
  const isActive = false;
  return (
    <Link href={item.path ?? '/'}>
      <a
        className={clsx(
          'relative flex items-center h-full heading-5 outline-none after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[3px] after:bg-bw-fore after:rounded-full after:opacity-0 after:transition-opacity after:duration-[.15s] after:ease-out hover:after:opacity-100 focus:after:opacity-100',
          isActive ? 'after:opacity-100' : 'after:opacity-0',
          {
            'after:opacity-100': isActive,
          },
        )}
      >
        {item?.label ? item?.label : label}
      </a>
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
