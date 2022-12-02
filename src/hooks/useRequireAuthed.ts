import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function useRequireAuthed() {
  let token = useAuthStore((s) => s.token);
  let router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push('/auth/connect-wallet');
    }
  }, [token]);
}
