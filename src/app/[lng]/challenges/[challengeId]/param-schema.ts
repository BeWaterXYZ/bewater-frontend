import * as z from 'zod';

export const segmentSchema = {
  challengeId: z.object({
    challengeId: z.string(),
  }),
  teamId: z.object({
    teamId: z.string(),
  }),
  projectId: z.object({
    projectId: z.string(),
  }),
  lng: z.object({
    lng: z.string(),
  }),
};
