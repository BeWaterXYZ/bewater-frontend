'use client';
import Link from 'next/link';
import { useAuthStore } from '@/stores/auth';
import { UserMenu } from './menu';
import { NotificationBell } from './notification';

export default function UserArea({ lng }: { lng: string }) {
  const token = useAuthStore((s) => s.token);
  return !token ? (
    <Link
      prefetch={false}
      href={`/${lng}/connect`}
      className="btn btn-primary-invert h-10 py-4 px-8 uppercase body-4 text-day "
    >
      Connect
    </Link>
  ) : (
    <div className="flex gap-4 items-center">
      <NotificationBell lng={lng} />
      <UserMenu lng={lng} />
    </div>
  );
}
