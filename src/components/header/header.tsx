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
      className='sticky top-0 bg-bw-back text-bw-fore z-10'
    >
      <div
        className='header-width h-20 px-5 flex flex-row mx-auto relative'
      >
        <a className='h-full flex items-center absolute left-8 top-[50%] -translate-y-[50%]' href="/">
          <Logo className='h-6 mr-4 shrink-0' />
        </a>
        <Menu className='flex-1' items={menuData?.main || []} />
      </div>
    </header>
  );
}

export const HeaderWrapper = () => {
  const { menuData } = useMenuData();
  return (
    <Header menuData={menuData} />
  )
}
