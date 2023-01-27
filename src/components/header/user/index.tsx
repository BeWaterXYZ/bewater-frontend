'use client';
import Link from 'next/link';
import { useAuthStore } from '@/stores/auth';
import { UserMenu } from './menu';

export default function UserArea() {
  const isAuthed = useAuthStore((s) => s.isAuthed);
  const user = useAuthStore((s) => s.user);

  return !isAuthed() ? (
    <Link
      href="/connect"
      className="btn h-12 py-4 px-8 uppercase mono-4 text-day border-day bg-transparent"
    >
      Connect
    </Link>
  ) : (
    <UserMenu user={user} />
  );
}
