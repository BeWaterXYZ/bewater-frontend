export const languages = ['zh', 'en'];
export const defaultNS = 'translation';
export const fallbackLng = languages[0];

export function getOptions(
  lng = fallbackLng,
  ns: string | string[] = defaultNS,
) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
    // load: 'languageOnly',
  };
}
