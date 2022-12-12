'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

export function ChallengeNav() {
  // TODO
  // let router = useRouter();
  // let pathname =router.pathname;

  let { challengeId } = { challengeId: '123' }; // router.query;
  return (
    <nav className="w-full body-3 flex justify-center border-b border-gray-600">
      {links.map((link) => {
        let isAcitve = false; // pathname.includes(link.path);
        return (
          <Link
            key={link.path}
            href={`/challenges/${challengeId}${link.path}`}
            legacyBehavior
          >
            <a
              className={clsx('py-3 w-[80px] text-center', {
                'text-day border-b-2 border-day': isAcitve,
              })}
            >
              {link.label}
            </a>
          </Link>
        );
      })}
    </nav>
  );
}
