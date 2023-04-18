'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useToastStore } from '../toast/store';

export function CallbackErrorHandler() {
  const addToast = useToastStore((s) => s.add);
  const searchParams = useSearchParams();
  let error = searchParams?.get('error');
  let isMountedRef = useRef(false);
  useEffect(() => {
    // hack1
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return undefined;
    }

    if (error) {
      // hack2
      setTimeout(() => {
        window.history.replaceState(
          undefined,
          '',
          window.location.origin + window.location.pathname,
        );
      }, 1000);

      addToast({
        title: 'Oops',
        type: 'error',
        description:
          error === 'GITHUB_ACCOUNT_USED'
            ? 'GitHub account has been used for other account connection'
            : 'Figma account has been used for other account connection',
      });
    }
  }, [error]);

  return null;
}
