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
  console.log({ segment });
  return (
    <nav className=" w-full flex flex-row lg:flex-col ">
      {links.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className={clsx('body-3 p-4 inline-block w-full', {
            'bg-[#0F172A] ': segment && link.path.includes(segment),
          })}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
