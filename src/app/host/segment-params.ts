import { LanguagesScheme } from "@/i18n";
import { z } from "zod";

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
  lang: z.object({
    lang: LanguagesScheme,
  }),
};
