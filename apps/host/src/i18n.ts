import { createUnionSchema } from "@/types/utils";

export const languages = ["en", "zh"] as const;
export type Languages = typeof languages[number]

export const LanguagesScheme = createUnionSchema(languages);
