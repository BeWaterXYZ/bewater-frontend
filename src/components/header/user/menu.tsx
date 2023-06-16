'use client';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Link from 'next/link';

import { Avatar } from '@/components/avatar/avatar';

import { useFetchUser } from '@/services/user.query';
import { useAuthStore } from '@/stores/auth';
import { useEffect } from 'react';

export const UserMenu = () => {
  const clearStore = useAuthStore((s) => s.clear);
  const [userId, walletAddress] = useAuthStore((s) => [
    s.user?.externalId,
    s?.walletAddress,
  ]);

  const { data, isLoading } = useFetchUser(userId);
  const logout = () => {
    clearStore();
    window.location.href = '/';
  };

  // useEffect(() => {
  //   if (stateUser && !userId) logout();
  // }, [userId]);

  if (!data) return null;

  const user = data?.userProfile!;
  return (
    <NavigationMenu.Root className="relative">
      {/* <div className="opacity-0 absolute">
        <Link prefetch = {false} href={`/en/user/${user.userId}`} className="body-2">
          .
        </Link>
        <Link prefetch = {false} href="/en/settings/basic" className="body-2">
          .
        </Link>
        <Link prefetch = {false} href="/en/notifications/requests/received" className="body-2">
          .
        </Link>
      </div> */}
      <NavigationMenu.List className="list-none">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="">
            {isLoading ? (
              <Link prefetch={false} href="/en/onboarding">
                <Avatar
                  className="w-8 h-8 hover:opacity-75"
                  src={!isLoading ? user?.avatarURI : ''}
                  walletAddress={walletAddress}
                />
              </Link>
            ) : (
              <Avatar
                className="w-8 h-8 hover:opacity-75"
                src={!isLoading ? user?.avatarURI : ''}
                walletAddress={walletAddress}
              />
            )}
          </NavigationMenu.Trigger>
          {!isLoading && (
            <NavigationMenu.Content className="absolute top-[100%] z-[11] rounded right-0 body-2 w-60 border border-midnight bg-night  shadow-midnight">
              <div className="p-4">
                <p className="body-2">
                  {walletAddress?.substring(0, 8)}...
                  {walletAddress?.substring(
                    walletAddress.length - 8,
                    walletAddress.length,
                  )}
                </p>
              </div>
              <ul className="font-medium ">
                <li className="border-t p-4 py-2 border-midnight hover:bg-midnight transition-colors ease-out cursor-pointer">
                  <Link
                    prefetch={false}
                    href={`/en/user/${user.externalId}`}
                    className="body-2"
                  >
                    Your Profile
                  </Link>
                </li>
                <li className="border-t p-4 py-2 border-midnight hover:bg-midnight transition-colors ease-out cursor-pointer">
                  <Link
                    prefetch={false}
                    href="/en/settings/basic"
                    className="body-2"
                  >
                    Account Settings
                  </Link>
                </li>
                <li className="border-t p-4 py-2 border-midnight hover:bg-midnight transition-colors ease-out cursor-pointer">
                  <Link
                    prefetch={false}
                    href="/en/notifications/requests/received"
                    className="body-2"
                  >
                    Notifications
                  </Link>
                </li>
                <li className="border-t p-4 py-2 border-midnight hover:bg-midnight transition-colors ease-out cursor-pointer">
                  <button className="body-2" onClick={logout}>
                    Disconnect
                  </button>
                </li>
              </ul>
            </NavigationMenu.Content>
          )}
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};
