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
  // TODO FIX IT
  if (!mounted) return null;
  return !isAuthed() ? (
    <Link href="/connect" legacyBehavior>
      <a className="btn btn-primary">Connect</a>
    </Link>
  ) : (
    <UserMenu user={user} />
  );
}
