'use client';
import { useRequireAuthed } from '@/hooks/useRequireAuthed';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useRequireAuthed();

  return <div className="pt-24 lg:pt-20">{children}</div>;
}
