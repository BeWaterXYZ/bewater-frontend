import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function useRequireAuthed() {
  const token = useAuthStore((s) => s.token);
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      void router.push('/auth/connect-wallet');
    }
  }, [token]);
}
