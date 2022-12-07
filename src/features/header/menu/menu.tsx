import clsx from 'clsx';

import { MenuItemType } from '../menu-data';

import { MenuItem } from './menu-item';

type Props = {
  items: MenuItemType[];
};

export const Menu = ({ items }: Props) => {
  return (
    <ul
      className={clsx(
        'flex flex-row gap-x-8 h-full items-center justify-center ',
      )}
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
  );
};
