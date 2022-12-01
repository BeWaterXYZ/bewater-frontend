import Link from 'next/link';
import Logo from '@/components/logos/bewater.svg';
import { Menu } from './menu';
import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import { useMenuData } from './useMenuData';
import { useAuthStore } from '@/stores/auth';
import { MenuItemType } from '@/models/menu';
import { UserLocalStorage } from '@/models/user';

interface HeaderUserAreaProps {
  isAuthed: boolean;
  user: UserLocalStorage;
}
export function HeaderUserArea({ isAuthed, user }: HeaderUserAreaProps) {
  console.log({ isAuthed });
  return !isAuthed ? (
    <Link href="/auth/connect-wallet" passHref>
      <Button type="primary" text="Connect Wallet" />
    </Link>
  ) : (
    <Avatar
      size="small"
      src={user.avatarURI}
      walletAddress={user.walletAddress}
    />
  );
}

interface HeaderImplProps {
  menuData: MenuItemType[];
  userArea: JSX.Element;
}

export const HeaderImpl = ({ menuData, userArea }: HeaderImplProps) => {
  return (
    <div className="block sticky top-0 left-0 right-0 text-bw-fore bg-bw-back z-10 w-full pl-5 pr-8 py-5 border-[#E4E4E4] border-b border-solid">
      <div className="relative flex items-center justify-between header-width mx-auto">
        <Link href="/">
          <a>
            <Logo className="object-contain shrink-0 cursor-pointer" />
          </a>
        </Link>
        <Menu className=" flex items-center h-full " items={menuData} />
        {userArea}
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
      userArea={<HeaderUserArea isAuthed={!!token} user={user} />}
    />
  );
};
