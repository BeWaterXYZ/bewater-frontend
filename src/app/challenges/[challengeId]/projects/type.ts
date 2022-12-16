import { z } from 'zod';

export let querySchema = z.object({
  status: z.optional(z.string()),
  tag: z.optional(z.string()),
});

export type QueryType = z.infer<typeof querySchema>;
