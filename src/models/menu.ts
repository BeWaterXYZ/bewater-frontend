// TODO: uncomment this when there was submenu for menu
// export type MenuSectionType = {
//   type: 'menu-section';
//   key: string;
//   label: string;
//   items: MenuItemType[];
// };

export type MenuItemType = {
  type: 'menu-item';
  key: string;
  label: string;
  associatedFeatures?: string[];
  action?: MenuAction;
  path?: string;
  external?: boolean;
};

export type MenuData = {
  main: MenuItemType[];
  profile: MenuItemType[];
};

export enum MenuAction {
  Logout = 'logout',
}
