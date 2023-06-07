import { z } from 'zod';

export let errorResponseScheme = z.object({
  message: z.string(),
  error_code: z.string(),
});

export function getErrorResp(err: any) {
  let resp;
  try {
    resp = errorResponseScheme.parse(err.data);
  } catch (err) {}
  return resp;
}
