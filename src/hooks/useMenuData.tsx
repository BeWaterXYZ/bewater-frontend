import { useEffect, useState } from 'react';

import { Auth } from '@/models/auth';
import { MenuData, MenuItemType } from '@/models/menu';

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
  }
];

const profileMenu: MenuItemType[] = [{
  type: 'menu-item',
    key: 'signin',
    label: 'Sign In',
    path: '/signin',
}]

export function useMenuData(auth: Auth) {
  const [menuData, setMenuData] = useState<MenuData>();

  useEffect(() => {
    if (auth.headers['X-BW-Access'] && auth.headers['Authorization']) {
      // TODO: query api to get different menu for account width different associatedFeatures
    } else {
      // show menu for visiters
      setMenuData({
        main: mainMenu.map(menu => {
          return {
            type: menu.type,
            key: menu.key,
            label: menu.label,
            path: menu.path,
            external: menu.external,
          }
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
