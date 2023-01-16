import * as z from 'zod';

export const challengeSchema = z.object({
  challengeId: z.coerce.number(),
});

export const challengeTeamSchema = z.object({
  challengeId: z.coerce.number(),
  teamId: z.coerce.number(),
});
