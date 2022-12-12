'use client';
import Link from 'next/link';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

import { Avatar } from '@/components/avatar';

import type { User } from '@/stores/auth';

interface UserMenuProps {
  user: User;
}
export const UserMenu = ({ user }: UserMenuProps) => {
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
          <NavigationMenu.Content className="absolute top-[100%] rounded right-0 body-2 w-60 border border-titanium bg-night  shadow-titanium">
            <div className="p-4">
              <p className="body-2">
                {user.walletAddress?.substring(0, 8)} ...
                {user.walletAddress?.substring(
                  user.walletAddress.length - 8,
                  user.walletAddress.length,
                )}
              </p>
            </div>
            <ul className="font-medium">
              <li className="border-t p-4 py-2">
                <Link href="/user/profile">Your Profile</Link>
              </li>
              <li className="border-t p-4 py-2">
                <Link href="/user/settings">Account Settings</Link>
              </li>
              <li className="border-t p-4 py-2">
                <Link href="/user/logout">Disconnect</Link>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};
