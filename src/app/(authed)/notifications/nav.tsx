'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

const links = [
  {
    label: 'Ongoing',
    path: '/notifications/ongoing',
  },
  {
    label: 'Invitation & Application',
    path: '/notifications/requests/received',
  },
] as const;

export function Nav() {
  let segment = useSelectedLayoutSegment();
  return (
    <nav className=" w-full flex flex-row lg:flex-col gap-4 lg:sticky  lg:top-[72px] ">
      {links.map((link) => (
        <Link
          prefetch={false}
          key={link.path}
          href={link.path}
          className={clsx(
            'body-3 p-4  inline-block w-full text-center lg:text-left whitespace-nowrap',
            segment && link.path.includes(segment)
              ? 'bg-grey-900 '
              : 'border lg:border-none border-grey-800',
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
