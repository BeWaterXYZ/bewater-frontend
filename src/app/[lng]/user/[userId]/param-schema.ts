import { z } from 'zod';

export const userSchema = z.object({
  userId: z.string(),
});
