import clsx from 'clsx';

import Logo from '@/components/logos/bewater.svg';
import { Menu } from '@/components/menu';
import { Button } from '@/components/button';
import { useMenuData } from '@/hooks/useMenuData';
import { isAuthed, useAuthContext } from '@/hooks/useAuth';
import { urlWithBasePath } from '@/utils/urlWithBasePath';

import type { MenuData } from '@/models/menu';

type Props = {
  menuData?: MenuData;
  showButton?: boolean;
};

export function Header({ menuData, showButton = false }: Props) {
  return (
    <div className="block sticky top-0 left-0 right-0 text-bw-fore bg-bw-back z-10 w-full pl-5 pr-8 py-5 border-[#E4E4E4] border-b border-solid">
      <div className=" relative flex items-center justify-between header-width mx-auto">
        <a href={urlWithBasePath('/')}>
          <Logo className="object-contain shrink-0 cursor-pointer" />
        </a>
        <a
          className={clsx({
            hidden: !showButton,
          })}
          href={urlWithBasePath('/auth/connect-wallet')}
        >
          <Button type="primary" text="Connect Wallet" />
        </a>
        <div
          className={clsx('w-10 h-10 bg-black rounded-full cursor-pointer', {
            hidden: showButton,
          })}
        />
        <Menu
          className="absolute flex items-center h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 "
          items={menuData?.main || []}
        />
      </div>
    </div>
  );
}

export function BasicHeader({ menuData }: Props) {
  return (
    <div className="block sticky top-0 left-0 right-0 text-bw-fore bg-bw-back z-10 w-full pl-5 pr-8 py-5 border-[#E4E4E4] border-b border-solid">
      <div className=" relative flex items-center justify-between header-width mx-auto">
        <a href={urlWithBasePath('/')}>
          <Logo className="object-contain shrink-0 cursor-pointer" />
        </a>
        <Menu
          className="absolute flex items-center h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 "
          items={menuData?.main || []}
        />
      </div>
    </div>
  );
}

export const HeaderWrapper = () => {
  const { menuData } = useMenuData();
  const token = useAuthContext();
  return <Header menuData={menuData} showButton={!isAuthed(token)} />;
};
