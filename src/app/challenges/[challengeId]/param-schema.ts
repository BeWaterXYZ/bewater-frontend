import * as z from 'zod';

export const paramSchema = z.object({
  challengeId: z.string(),
});
