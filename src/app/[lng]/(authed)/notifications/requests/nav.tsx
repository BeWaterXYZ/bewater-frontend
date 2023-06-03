'use client';

import { NavItem } from '@/components/header/nav';
import { useSelectedLayoutSegments } from 'next/navigation';

export function Nav() {
  const links = [
    {
      path: '/en/notifications/requests/received',
      label: 'Received',
    },
    {
      path: '/en/notifications/requests/sent',
      label: 'Sent',
    },
  ];

  const segments = useSelectedLayoutSegments();

  let items = links.map((n) => ({
    ...n,
    active: segments.some((s) => n.path?.includes(s)),
  }));

  return (
    <nav className="flex gap-4 border-b border-b-white/20 mb-4  bg-night">
      {items.map((link) => (
        <NavItem
          item={link}
          key={link.path}
          underline
          className="mr-3 font-normal"
        />
      ))}
    </nav>
  );
}
