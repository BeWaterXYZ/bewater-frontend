'use client';
import Link from 'next/link';
import { useAuthStore } from '@/stores/auth';
import { UserMenu } from './menu';
import { NotificationBell } from './notification';

export default function UserArea() {
  // fix me . need user here to update this component
  const user = useAuthStore((s) => s.user);
  console.log(user);
  const isAuthed = useAuthStore((s) => s.isAuthed);

  return !isAuthed() ? (
    <Link
      href="/connect"
      className="btn btn-primary-invert h-10 py-4 px-8 uppercase body-4 text-day "
    >
      Connect
    </Link>
  ) : (
    <div className="flex gap-4 items-center">
      <NotificationBell />
      <UserMenu />
    </div>
  );
}
