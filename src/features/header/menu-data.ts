export type MenuItemType = {
  type: 'menu-item';
  key: string;
  label: string;
  associatedFeatures?: string[];
  path?: string;
  external?: boolean;
};
export const mainMenu: MenuItemType[] = [
  {
    type: 'menu-item',
    key: 'challenges',
    label: 'Challenges',
    path: '/challenges',
  },
  {
    type: 'menu-item',
    key: 'showcase',
    label: 'Showcase',
    path: '/showcase',
  },
  {
    type: 'menu-item',
    key: 'docs',
    label: 'Docs',
    path: '/docs',
  },
];

export const profileMenu: MenuItemType[] = [
  {
    type: 'menu-item',
    key: 'user_profile',
    label: 'Your Profile',
    path: '/user/profile',
  },
  {
    type: 'menu-item',
    key: 'user_settings',
    label: 'Account Settings',
    path: '/user/settings',
  },
];
