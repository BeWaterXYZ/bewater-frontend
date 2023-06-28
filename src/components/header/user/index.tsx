'use client';
import Link from 'next/link';
import { useAuthStore } from '@/stores/auth';
import { UserMenu } from './menu';
import { NotificationBell } from './notification';
import { useClerk, UserButton } from '@clerk/nextjs';

export default function UserArea({ lng }: { lng: string }) {
  const clerk = useClerk();

  return !clerk.user ? (
    <Link
      prefetch={false}
      href={`/sign-in`}
      className="btn btn-primary-invert h-10 py-4 px-8 uppercase body-4 text-day "
    >
      Sign In
    </Link>
  ) : (
    <div className="flex gap-4 items-center">
      <NotificationBell lng={lng} />
      <UserButton
        afterSignOutUrl="/"
        userProfileMode="navigation"
        userProfileUrl="/settings/basic"
      />
    </div>
  );
}
