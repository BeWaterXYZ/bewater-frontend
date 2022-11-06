import { useEffect, useState } from 'react';

import { urlWithBasePath } from '@/utils/urlWithBasePath';

import type { Auth } from '@/models/auth';
import type { MenuData, MenuItemType } from '@/models/menu';

const mainMenu: MenuItemType[] = [
  {
    type: 'menu-item',
    key: 'challenges',
    label: 'Challenges',
    path: urlWithBasePath('/challenges'),
  },
  {
    type: 'menu-item',
    key: 'showcase',
    label: 'Showcase',
    path: urlWithBasePath('/showcase'),
  },
  {
    type: 'menu-item',
    key: 'docs',
    label: 'Docs',
    path: urlWithBasePath('/docs'),
  },
];

const profileMenu: MenuItemType[] = [
  {
    type: 'menu-item',
    key: 'user_profile',
    label: 'Your Profile',
    path: urlWithBasePath('/user/profile'),
  },
  {
    type: 'menu-item',
    key: 'user_settings',
    label: 'Account Settings',
    path: urlWithBasePath('/user/settings'),
  },
];

export function useMenuData(auth?: Auth) {
  const [menuData, setMenuData] = useState<MenuData>();

  useEffect(() => {
    if (auth?.headers && auth?.headers['Authorization']) {
      // TODO: query api to get different menu for account width different associatedFeatures
    } else {
      // show menu for visiters
      setMenuData({
        main: mainMenu.map((menu) => {
          return {
            type: menu.type,
            key: menu.key,
            label: menu.label,
            path: menu.path,
            external: menu.external,
          };
        }),
        // TODO: remove profile for Sign In page
        profile: profileMenu,
      });
    }
  }, [auth]);

  return {
    menuData,
  };
}
