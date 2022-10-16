import Logo from '@/components/logos/bewater.svg';
import { Menu } from '@/components/menu';
import { useMenuData } from '@/hooks/useMenuData';

import type { MenuData } from '@/models/menu';

type Props = {
  menuData?: MenuData;
};

export function Header({ menuData }: Props) {
  return (
    <div className="block sticky top-0 left-0 right-0 text-bw-fore bg-bw-back z-10 w-full pl-5 pr-8 py-5 border-[#E4E4E4] border-b border-solid">
      <div className=" relative flex items-center justify-between header-width mx-auto">
        <a href="/">
          <Logo className="object-contain shrink-0" />
        </a>
        {/* Avatar placeholder */}
        <div className="w-10 h-10 bg-black rounded-full cursor-pointer"></div>
      </div>
      <Menu
        className="absolute flex items-center h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 "
        items={menuData?.main || []}
      />
    </div>
  );
}

export const HeaderWrapper = () => {
  const { menuData } = useMenuData();
  return <Header menuData={menuData} />;
};
