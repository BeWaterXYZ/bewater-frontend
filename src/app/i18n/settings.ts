export const languages = ['en', 'zh'];
export const defaultNS = 'translation';
export const fallbackLng = languages[0];

export function getOptions(lng = fallbackLng, ns = defaultNS) {
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
