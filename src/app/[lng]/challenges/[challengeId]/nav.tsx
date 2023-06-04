'use client';
import { Challenge, Milestone } from '@/services/types';
import clsx from 'clsx';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { isMileStoneEnabled } from './utils';

const links = [
  {
    label: 'Introduction',
    path: '/',
    segment: null,
    milestone: 'Preparation' as Milestone['stageName'],
  },
  {
    label: 'Teams',
    path: '/teams',
    segment: 'teams',
    milestone: 'Teaming' as Milestone['stageName'],
  },
  {
    label: 'Projects',
    path: '/projects',
    segment: 'projects',
    milestone: 'Teaming' as Milestone['stageName'],
  },
  {
    label: 'Result',
    path: '/result',
    segment: 'result',
    milestone: 'Result' as Milestone['stageName'],
  },
] as const;

export function ChallengeNav({ challenge }: { challenge: Challenge }) {
  let challengeId = challenge.id;
  let segment = useSelectedLayoutSegment();

  return (
    <nav className="w-full body-3 flex justify-center border-b border-white/20 bg-night sticky top-[72px] md:top-[72px] z-10">
      {links.map((link) => {
        let isAcitve = link.segment === segment;
        let isEnabled = isMileStoneEnabled(link.milestone, challenge);
        return isEnabled ? (
          <Link
            prefetch={false}
            key={link.path}
            href={`/en/challenges/${challengeId}${link.path}`}
            className={clsx('py-3 mx-3 text-center uppercase', {
              'text-day border-b-2 border-day [text-shadow:0_0_6px_theme(colors.day)]':
                isAcitve,
            })}
          >
            {link.label}
          </Link>
        ) : (
          <span
            key={link.path}
            className="py-3 mx-3 text-center uppercase text-white/30 cursor-not-allowed"
          >
            {link.label}
          </span>
        );
      })}
    </nav>
  );
}