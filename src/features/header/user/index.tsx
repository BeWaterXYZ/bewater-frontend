'use client';
import Link from 'next/link';

import { useAuthStore } from '@/stores/auth';

import { UserMenu } from './menu';
import { useEffect, useState } from 'react';

export default function UserArea() {
  const isAuthed = useAuthStore((s) => s.isAuthed);
  const user = useAuthStore((s) => s.user);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  // TODO FIX IT with nextjs 13.0.7
  if (!mounted) return null;
  return !isAuthed() ? (
    <Link href="/connect" className="btn btn-primary">
      Connect
    </Link>
  ) : (
    <UserMenu user={user} />
  );
}
