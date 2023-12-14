'use client';

import { NavItem } from '@/components/header/nav';
import { useSelectedLayoutSegment } from 'next/navigation';

export function Nav({ userId, externalNa, lng }: { userId: string; externalNa: string; lng: string }) {
  const links = [
    {
      path: `/${lng}/user/${externalNa ? externalNa : userId}`,
      label: 'Overview',
      segment: '(overview)',
    },
    {
      path: `/${lng}/user/${externalNa ? externalNa : userId}/campaigns`,
      segment: 'campaigns',
      label: 'Campaigns',
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
