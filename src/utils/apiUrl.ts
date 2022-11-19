import getConfig from 'next/config';

import type { NextRuntimeConfig } from '@/types/next-runtime-config';

const {
  publicRuntimeConfig: { apiHost, basePath, environment },
} = getConfig() as NextRuntimeConfig;

export const isLocal = environment === 'local';

export function apiUrl(path: string): string {
  if (!isLocal) {
    return `${apiHost}${path.replace('/api', '')}`;
  }
  return `${basePath}${path}`;
}
