import * as z from 'zod';

export const challengeSchema = z.object({
  challengeId: z.string(),
});

export const challengeTeamSchema = z.object({
  challengeId: z.string(),
  teamId: z.string(),
});
