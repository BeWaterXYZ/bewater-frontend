import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuthStore } from '@/stores/auth';

export function useRequireAuthed() {
  const token = useAuthStore((s) => s.token);
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      void router.push('/auth/connect-wallet');
    }
  }, [token, router]);
}
