import Icon from './icon';

declare function createIcon(
  path: React.ReactNode,
  displayName: string,
): typeof Icon;

export default createIcon;
