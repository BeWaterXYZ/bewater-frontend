'use client';

import Link from 'next/link';

export default function ConnectButton() {
  return (
    <div>
      <Link
        prefetch={false}
        href={`/sign-up`}
        className="btn btn-primary-invert body-4 text-day  uppercase w-64 py-6"
      >
        加入 BeWater
      </Link>
    </div>
  );
}
