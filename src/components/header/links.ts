export type MenuItemType = {
  label: string;
  path?: string;
  active?: boolean;
};

export const nav: MenuItemType[] = [
  {
    label: "Campaigns",
    path: "/campaigns",
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

export const user: MenuItemType[] = [
  {
    label: "Your Profile",
    path: "/profile",
  },
  {
    label: "Account Settings",
    path: "/settings",
  },
];
