import { z } from "zod";

export let querySchema = z.object({
  tag: z.optional(z.string()),
  shortlist: z.optional(z.string()),
  status: z.optional(z.string()),
  role: z.optional(z.string()),
});

export type QueryType = z.infer<typeof querySchema>;
