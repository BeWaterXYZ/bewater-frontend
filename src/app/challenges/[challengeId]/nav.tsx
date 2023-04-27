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
  console.log(challenge.milestones);

  return (
    <nav className="w-full body-3 flex justify-center border-b border-white/20">
      {links.map((link) => {
        let isAcitve = link.segment === segment;
        let isEnabled = isMileStoneEnabled(link.milestone, challenge);
        console.log(link.label, isEnabled);
        return isEnabled ? (
          <Link
            key={link.path}
            href={`/challenges/${challengeId}${link.path}`}
            className={clsx('py-3 mx-3 text-center uppercase', {
              'text-day border-b-2 border-day [text-shadow:0_0_6px_theme(colors.day)]':
                isAcitve,
            })}
          >
            {link.label}
          </Link>
        ) : (
          <span className="py-3 mx-3 text-center uppercase text-white/50 ">
            {link.label}
          </span>
        );
      })}
    </nav>
  );
}
