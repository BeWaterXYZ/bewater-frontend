'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

const links = [
  {
    label: ' Basic Information',
    path: '/settings/basic',
  },
  {
    label: ' Linked Accounts',
    path: '/settings/link',
  },
] as const;

export function Nav() {
  let segment = useSelectedLayoutSegment();
  return (
    <nav className=" w-full flex flex-row lg:flex-col gap-3 ">
      {links.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className={clsx(
            'body-3 text-grey-400 p-3 lg:p-4 inline-block w-full rounded-sm text-center',
            segment && link.path.includes(segment)
              ? 'bg-[#0F172A] '
              : 'border lg:border-none border-grey-800',
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
