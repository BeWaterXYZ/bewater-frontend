export interface LanguageColors {
  [lang: string]:
    | {
        color: string | null;
        url: string;
      }
    | undefined;
}
