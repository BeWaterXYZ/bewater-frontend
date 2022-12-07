import Link from 'next/link';
import dynamic from 'next/dynamic';

import Logo from '@/components/logos/bewater.svg';
import { useAuthStore } from '@/stores/auth';

import { Menu } from './menu';
import { mainMenu, MenuItemType } from './menu-data';

interface HeaderImplProps {
  menuData: MenuItemType[];
  userArea: JSX.Element;
}

const UserArea = dynamic(() => import('./user-area'), {
  ssr: false,
});

export const HeaderImpl = ({ menuData, userArea }: HeaderImplProps) => {
  return (
    <div className="sticky top-0 left-0 right-0 text-black bg-white  w-full  flex  flex-shrink-0 justify-center items-center border-border border-b border-solid">
      <div className=" flex items-center justify-between container flex-wrap">
        <div className="w-1/2 order-1 md:w-1/5 ">
          <Link href="/">
            <a>
              <Logo className="object-contain shrink-0 cursor-pointer" />
            </a>
          </Link>
        </div>
        <div className="w-full order-3 md:order-2 md:w-3/5  ">
          <Menu items={menuData} />
        </div>
        <div className="w-1/2  order-2 md:oirder-3 md:w-1/5 ">
          <div className="flex justify-end py-4">{userArea}</div>
        </div>
      </div>
    </div>
  );
};

export const Header = () => {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  return (
    <HeaderImpl
      menuData={mainMenu}
      userArea={<UserArea isAuthed={!!token} user={user} />}
    />
  );
};
