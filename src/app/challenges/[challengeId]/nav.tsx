'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

let links = [
  {
    label: 'Introduction',
    path: '/',
    segment: '(intro)',
  },
  {
    label: 'Teams',
    path: '/teams',
    segment: 'teams',
  },
  {
    label: 'Projects',
    path: '/projects',
    segment: 'projects',
  },
  {
    label: 'Result',
    path: '/result',
    segment: 'result',
  },
];

export function ChallengeNav({ challengeId }: { challengeId: string }) {
  let segment = useSelectedLayoutSegment();
  console.log({ segment });
  return (
    <nav className="w-full body-3 flex justify-center border-b border-gray-600 mb-4">
      {links.map((link) => {
        let isAcitve = segment && link.segment === segment;

        return (
          <Link
            key={link.path}
            href={`/challenges/${challengeId}${link.path}`}
            className={clsx('py-3 mx-3 text-center', {
              'text-day border-b-2 border-day  [text-shadow:0_0_10px_theme(colors.day)]':
                isAcitve,
            })}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
