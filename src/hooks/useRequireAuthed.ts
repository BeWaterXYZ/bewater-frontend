import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuthStore } from '@/stores/auth';

export function useRequireAuthed() {
  const isAuthed = useAuthStore((s) => s.isAuthed);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthed()) {
      void router.push('/connect');
    }
  }, [isAuthed, router]);
}
