'use client';

import { NavItem } from '@/components/header/nav';
import { useSelectedLayoutSegment } from 'next/navigation';

export function Nav({ userId }: { userId: string }) {
  const links = [
    {
      path: `/user/${userId}`,
      label: 'Overview',
      segment: '(overview)',
    },
    {
      path: `/user/${userId}/challenges`,
      segment: 'challenges',
      label: 'Challenges',
    },
  ];
  const segments = useSelectedLayoutSegment();

  let items = links.map((n) => ({
    ...n,
    active: segments === n.segment,
  }));

  return (
    <nav className="flex gap-x-8 border-b border-b-white/20 mb-4  bg-night">
      {items.map((link) => (
        <NavItem
          item={link}
          key={link.path}
          underline
          className="font-normal "
        />
      ))}
    </nav>
  );
}
