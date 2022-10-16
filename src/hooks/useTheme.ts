const getTheme = (theme?: string) => {
  if (theme === 'dark') {
    return 'dark';
  }
  return 'light';
};

export default function useTheme(theme?: string) {
  const _theme = getTheme(theme);
  if (typeof document !== 'undefined' && document.body) {
    document.body.setAttribute('data-theme', _theme);
  }
}
