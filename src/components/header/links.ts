export type MenuItemType = {
  label: string;
  path?: string;
  active?: boolean;
};
export const nav: MenuItemType[] = [
  {
    label: 'Challenges',
    path: '/challenges',
  },
  {
    label: 'Showcase',
    path: '/showcase',
  },
  {
    label: 'Docs',
    path: '/docs',
  },
];

export const user: MenuItemType[] = [
  {
    label: 'Your Profile',
    path: '/user/profile',
  },
  {
    label: 'Account Settings',
    path: '/user/settings',
  },
];
