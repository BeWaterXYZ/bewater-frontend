'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

const links = [
  {
    label: 'Introduction',
    path: '/',
    segment: null,
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
] as const;

export function ChallengeNav({ challengeId }: { challengeId: string }) {
  let segment = useSelectedLayoutSegment();

  return (
    <nav className="w-full body-3 flex justify-center border-b border-white/20">
      {links.map((link) => {
        let isAcitve = link.segment === segment;

        return (
          <Link
            key={link.path}
            href={`/challenges/${challengeId}${link.path}`}
            className={clsx('py-3 mx-3 text-center', {
              'text-brand-500 border-b-2 border-brand-500 [text-shadow:0_0_6px_theme(colors.brand.500)]':
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
