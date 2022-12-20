'use client';
import { useRequireAuthed } from '@/hooks/useRequireAuthed';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthed = useRequireAuthed();

  return isAuthed ? children : null;
}
