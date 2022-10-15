import clsx from 'clsx';
import { forwardRef, useMemo } from 'react';

import { useMenuActions } from '@/hooks/useMenuActions';

import type { MenuItemType } from '@/models/menu';

type Props = {
  item?: MenuItemType;
  label?: string;
  isOpen: boolean;
  hasSubMenu: boolean;
  isActive: boolean;
};

export const MenuItem = forwardRef(function MenuItem(
  { label, item, hasSubMenu, isOpen, isActive }: Props,
  ref: React.ForwardedRef<HTMLAnchorElement>,
) {
  const { handleAction } = useMenuActions();

  const handleActionMemo = useMemo(() => {
    // If menu item doesn't have an action then default anchor behavior is used
    return item?.action && handleAction.bind(null, item.action);
  }, [item?.action, handleAction]);

  const externalProps = item?.external
    ? {
        rel: 'noreferrer noopener',
        target: '_blank',
      }
    : {};

  return (
    <a
      className={clsx(
        'relative flex items-center h-full typ-h5 outline-none after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[3px] after:bg-bw-fore after:rounded-full after:opacity-0 after:transition-opacity after:duration-[.15s] after:ease-out hover:after:opacity-100 focus:after:opacity-100',
        isOpen || isActive ? 'after:opacity-100' : 'after:opacity-0',
        {
          'after:opacity-100': isActive,
          'cursor-pointer': !hasSubMenu,
        },
      )}
      href={item?.path}
      {...externalProps}
      onClick={handleActionMemo}
      ref={ref}
      tabIndex={0}
    >
      {item?.label ? item?.label : label}
    </a>
  );
});
