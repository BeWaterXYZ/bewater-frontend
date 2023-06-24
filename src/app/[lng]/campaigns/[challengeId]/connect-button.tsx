'use client';

import { useAuthStore } from '@/stores/auth';
import Link from 'next/link';

export default function ConnectButton({ lng }: { lng: string }) {
  const token = useAuthStore((s) => s.token);

  return !token ? (
    <div>
      <Link
        prefetch={false}
        href={`/${lng}/connect`}
        className="btn btn-primary-invert body-4 text-day  uppercase w-64 py-6"
      >
        加入 BeWater
      </Link>
    </div>
  ) : null;
}
