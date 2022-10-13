import Logo from '@/components/logos/bewater.svg';
import { Menu } from '@/components/menu';
import { useMenuData } from '@/hooks/useMenuData';

import type { Auth } from '@/models/auth';
import type { MenuData } from '@/models/menu';

type Props = {
  menuData?: MenuData;
};

export function Header({ menuData }: Props) {
  return (
    <header
      className='sticky top-0 bg-bw-back z-10'
    >
      <div
        className='header-width h-20 px-5 flex justify-between mx-auto'
      >
        <a className='h-full flex items-center' href="/">
          <Logo className='h-6 mr-4 shrink-0' />
        </a>
        <Menu items={menuData?.main || []} />
        <div />
      </div>
    </header>
  );
}

export const HeaderWrapper = () => {
  const { menuData } = useMenuData({} as Auth);
  return (
    <Header menuData={menuData} />
  )
}
