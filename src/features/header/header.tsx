import Link from 'next/link';
import dynamic from 'next/dynamic';

import Logo from '@/components/logos/bewater.svg';
import { useAuthStore } from '@/stores/auth';
import { MenuItemType } from '@/models/menu';

import { Menu } from './menu';
import { useMenuData } from './useMenuData';

interface HeaderImplProps {
  menuData: MenuItemType[];
  userArea: JSX.Element;
}

const UserArea = dynamic(() => import('./userArea'), {
  ssr: false,
});

export const HeaderImpl = ({ menuData, userArea }: HeaderImplProps) => {
  return (
    <div className="block sticky top-0 left-0 right-0 text-bw-fore bg-bw-back z-10 w-full pl-5 pr-8 py-5 border-[#E4E4E4] border-b border-solid">
      <div className="relative flex items-center justify-between header-width mx-auto">
        <Link href="/">
          <a>
            <Logo className="object-contain shrink-0 cursor-pointer" />
          </a>
        </Link>
        <Menu className="flex items-center h-full" items={menuData} />
        <div className="min-w-[160px] flex justify-end">{userArea}</div>
      </div>
    </div>
  );
};

export const Header = () => {
  const { menuData } = useMenuData();
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  return (
    <HeaderImpl
      menuData={menuData.main}
      userArea={<UserArea isAuthed={!!token} user={user} />}
    />
  );
};
