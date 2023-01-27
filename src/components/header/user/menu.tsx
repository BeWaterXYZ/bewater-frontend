'use client';
import Link from 'next/link';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

import { Avatar } from '@/components/avatar';

import { useAuthStore, User } from '@/stores/auth';

interface UserMenuProps {
  user: User;
}
export const UserMenu = ({ user }: UserMenuProps) => {
  const clearStore = useAuthStore((s) => s.clear);
  const logout = () => {
    // fix me
    clearStore();
    window.location.href = '/';
  };
  return (
    <NavigationMenu.Root className="relative">
      <NavigationMenu.List className="list-none">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="">
            <Avatar
              size="small"
              src={user.avatarURI}
              walletAddress={user.walletAddress}
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute top-[100%] rounded right-0 body-2 w-60 border border-midnight bg-night  shadow-midnight">
            <div className="p-4">
              <p className="body-2">
                {user.walletAddress?.substring(0, 8)} ...
                {user.walletAddress?.substring(
                  user.walletAddress.length - 8,
                  user.walletAddress.length,
                )}
              </p>
            </div>
            <ul className="font-medium ">
              <li className="border-t p-4 py-2 border-midnight ">
                <Link href="/profile" className="body-2">
                  Your Profile
                </Link>
              </li>
              <li className="border-t p-4 py-2 border-midnight">
                <Link href="/settings" className="body-2">
                  Account Settings
                </Link>
              </li>
              <li className="border-t p-4 py-2 border-midnight ">
                <Link
                  href="/notifications/requests/received"
                  className="body-2"
                >
                  Notifications
                </Link>
              </li>
              <li className="border-t p-4 py-2 border-midnight">
                <button className="body-2" onClick={logout}>
                  Disconnect
                </button>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};
