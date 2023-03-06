import { z } from 'zod';

export const errorResponseScheme = z.object({
  message: z.string(),
  error_code: z.string(),
});

export function getErrorResp(err: unknown) {
  let resp;
  try {
    resp = errorResponseScheme.parse(err);
  } catch (err) {}
  return resp;
}
