import { apiUrl } from '@/utils/apiUrl';
import { withTimeout } from '@/utils/withTimeout';

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
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
      headers: {
        'Content-Type': 'application/json',
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
