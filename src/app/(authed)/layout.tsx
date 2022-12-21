'use client';
import { useRequireAuthed } from '@/hooks/useRequireAuthed';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useRequireAuthed();

  return children;
}
