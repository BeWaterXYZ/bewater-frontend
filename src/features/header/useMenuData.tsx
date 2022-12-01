import type { MenuItemType } from '@/models/menu';

const mainMenu: MenuItemType[] = [
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

const profileMenu: MenuItemType[] = [
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

export function useMenuData() {
  const menuData = {
    main: mainMenu.map((menu) => {
      return {
        type: menu.type,
        key: menu.key,
        label: menu.label,
        path: menu.path,
        external: menu.external,
      };
    }),
    profile: profileMenu.map((menu) => {
      return {
        type: menu.type,
        key: menu.key,
        label: menu.label,
        path: menu.path,
        external: menu.external,
      };
    }),
  };

  return {
    menuData,
  };
}
