import clsx from 'clsx';

import { MenuItemType } from '../menu-data';

import { MenuItem } from './menu-item';

type Props = {
  items: MenuItemType[];
  className?: string;
};

export const Menu = ({ items, className }: Props) => {
  return items?.length ? (
    <ul
      className={clsx('flex flex-row gap-x-8 h-full items-center', className)}
    >
      {items.map((item, i) => (
        <li key={i} className={clsx('h-full touch-manipulation')}>
          <MenuItem
            item={item}
            isOpen={false}
            hasSubMenu={false}
            isActive={false}
          />
        </li>
      ))}
    </ul>
  ) : (
    <div />
  );
};
