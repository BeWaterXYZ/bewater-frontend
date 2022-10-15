import clsx from 'clsx';

import type { MenuItemType } from '@/models/menu';

import { MenuItem } from './menu-item';

type Props = {
  items: MenuItemType[];
  className?: string;
};

export const Menu = ({
  items,
  className,
}: Props) => {
  return items?.length ? (
    <ul className={clsx('flex flex-row justify-center items-center h-20', className)}>
      {items.map((item,i) =>
        <li
          key={i}
          className={clsx('h-full touch-manipulation')}
        >
          <MenuItem
            item={item}
            isOpen={false}
            hasSubMenu={false}
            isActive={false}
          />
        </li>
      )}
    </ul>
  ) : <div />;
}
