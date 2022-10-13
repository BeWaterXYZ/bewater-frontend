import clsx from 'clsx';
import MenuUnstyled from '@mui/base/MenuUnstyled';

import type { MenuItemType } from '@/models/menu';

import { MenuItem } from './menu-item';

type Props = {
  label: string;
  items: MenuItemType[];
  isActive: boolean;
};

export const Menu = ({
  label,
  items,
  isActive,
}: Props) => {
  return (
    <li
      className={clsx('h-full touch-manipulation')}
    >
      <MenuItem
        isOpen={false}
        label={label}
        hasSubMenu={false}
        isActive={isActive}
      />
    </li>
  );
}
