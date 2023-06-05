'use client';
import { useRequireAuthed } from '@/hooks/useRequireAuthed';

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  const { lng = 'en' } = params || {};

  useRequireAuthed(lng);

  return <div className="pt-24 lg:pt-20">{children}</div>;
}
