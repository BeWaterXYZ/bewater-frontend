import getConfig from 'next/config';

import { withTimeout } from '@/utils/withTimeout';

import type { NextRuntimeConfig } from '@/types/next-runtime-config';

const {
  publicRuntimeConfig: { apiHost },
} = getConfig() as NextRuntimeConfig;

export function apiUrl(path: string): string {
  return `${apiHost}${path}`;
}

export async function fetchBody<T>(
  req: string,
  init: RequestInit = {},
): Promise<T> {
  const res = await fetchResponse(req, init);
  await verifyOk(res);

  return res.json() as Promise<T>;
}

export async function fetchResponse(
  req: string,
  init: RequestInit,
): Promise<Response> {
  return await withTimeout(
    fetch(apiUrl(req), {
      ...init,
      headers: {
        ...init?.headers,
        accept: 'application/json',
      },
    }),
    10000,
    req,
  );
}

async function verifyOk(res: Response): Promise<Response> {
  if (!res.ok) {
    throw Error(
      `Error occurs when fetching data: ${res.url} returned ${res.status} ${
        res.statusText
      } ${await res.text()}`,
    );
  } else {
    return res;
  }
}
