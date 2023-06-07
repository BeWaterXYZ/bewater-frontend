export type MenuItemType = {
  label: string;
  path?: string;
  active?: boolean;
};
export let nav: MenuItemType[] = [
  {
    label: 'Challenges',
    path: '/challenges',
  },
  // {
  //   label: 'Showcases',
  //   path: '/showcases',
  // },
  // {
  //   label: 'Docs',
  //   path: '/docs',
  // },
];

export let user: MenuItemType[] = [
  {
    label: 'Your Profile',
    path: '/profile',
  },
  {
    label: 'Account Settings',
    path: '/settings',
  },
];
