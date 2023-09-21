'use client';
import { Challenge, Milestone } from '@/services/types';
import clsx from 'clsx';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { isMileStoneEnabled } from './utils';
import { useTranslation } from '@/app/i18n/client';

const links = [
  {
    label: 'stage.Introduction',
    path: '/',
    segment: null,
    milestone: 'Preparation' as Milestone['stageName'],
  },
  {
    label: 'stage.Teams',
    path: '/teams',
    segment: 'teams',
    milestone: 'Teaming' as Milestone['stageName'],
  },
  {
    label: 'stage.Projects',
    path: '/projects',
    segment: 'projects',
    milestone: 'Teaming' as Milestone['stageName'],
  },
  {
    label: 'stage.Result',
    path: '/result',
    segment: 'result',
    milestone: 'Result' as Milestone['stageName'],
  },
] as const;

export function ChallengeNav({
  challenge,
  lng,
}: {
  challenge: Challenge;
  lng: string;
}) {
  const challengeId = challenge.externalId ? challenge.externalId : challenge.id;
  let segment = useSelectedLayoutSegment();
  const { t } = useTranslation(lng, 'translation');

  return (
    <nav className="w-full body-3 flex justify-center border-b border-white/20 bg-night sticky top-[72px] md:top-[72px] z-10">
      {links.map((link) => {
        let isAcitve = link.segment === segment;
        let isEnabled = false;
        if (challenge.milestones?.length > 0) {
          isEnabled = isMileStoneEnabled(link.milestone, challenge);
        }
        return isEnabled ? (
          <Link
            key={link.path}
            href={`/${lng}/campaigns/${challengeId}${link.path}`}
            className={clsx('py-3 mx-3 text-center uppercase', {
              'text-day border-b-2 border-day [text-shadow:0_0_6px_theme(colors.day)]':
                isAcitve,
            })}
          >
            {t(link.label)}
          </Link>
        ) : (
          <span
            key={link.path}
            className="py-3 mx-3 text-center uppercase text-white/30 cursor-not-allowed"
          >
            {t(link.label)}
          </span>
        );
      })}
    </nav>
  );
}
