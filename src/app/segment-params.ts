import { z } from "zod";

export let segmentSchema = {
  challengeId: z.object({
    challengeId: z.string(),
  }),
  teamId: z.object({
    teamId: z.string(),
  }),
  projectId: z.object({
    projectId: z.string(),
  }),
};
