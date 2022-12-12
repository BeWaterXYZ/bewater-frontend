'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

let links = [
  {
    label: 'Introduction',
    path: '/intro',
  },
  {
    label: 'Teams',
    path: '/teams',
  },
  {
    label: 'Projects',
    path: '/projects',
  },
  {
    label: 'Result',
    path: '/result',
  },
];

export function ChallengeNav({ challengeId }: { challengeId: string }) {
  let segment = useSelectedLayoutSegment();
  return (
    <nav className="w-full body-3 flex justify-center border-b border-gray-600">
      {links.map((link) => {
        let isAcitve = segment && link.path.includes(segment);

        return (
          <Link
            key={link.path}
            href={`/challenges/${challengeId}${link.path}`}
            className={clsx('py-3 w-[80px] text-center', {
              'text-day border-b-2 border-day': isAcitve,
            })}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
