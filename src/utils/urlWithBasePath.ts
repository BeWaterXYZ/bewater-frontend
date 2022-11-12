import getConfig from 'next/config';

import type { NextRuntimeConfig } from '@/types/next-runtime-config';

const {
  publicRuntimeConfig: { basePath },
} = getConfig() as NextRuntimeConfig;

export function urlWithBasePath(path: string) {
  return `${basePath}${path}`;
}
