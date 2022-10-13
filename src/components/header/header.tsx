import clsx from 'clsx';
import { useState } from 'react';

import Logo from '@/components/logos/bewater.svg';
import { Menu, MenuItem } from '@/components/menu';

import type { MenuData } from '@/models/menu';

type Props = {
  menuData: MenuData;
};

export function Header({ menuData }: Props) {
  const [subMenuOpen, setSubMenuOpen] = useState<string | null>(null);

  return (
    <header
      className='sticky top-0 bg-ef-white border-b border-solid border-ef-tints-200 z-50'
    >
      <div
        className='header-width h-14 px-5 flex justify-between mx-auto'
      >
        <div className='h-full flex items-center'>
          <a href="/">
            <Logo className='h-6 mr-4 shrink-0' />
          </a>

          <ul className='flex items-center h-full'>

            {menuData.main.map((item) => (
              <MenuItem
                key={item.key}
                label={item.label}
                hasSubMenu={false}
                isActive={false}
                isOpen={false}
              />
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
