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

export const MenuItem = forwardRef(function (
  { label, item, hasSubMenu, isOpen, isActive }: Props,
  ref: React.ForwardedRef<HTMLAnchorElement>,
) {
  const { handleAction } = useMenuActions();

  const handleActionMemo = useMemo(() => {
    // If menu item doesn't have an action then default anchor behavior is used
    return item?.action && handleAction.bind(null, item.action);
  }, [item?.action]);

  return (
    <a
      className={clsx(
        'relative flex items-center h-full px-4 text-sm cursor-default outline-none after:absolute after:top-0 after:left-0 after:right-0 after:h-[3px] after:bg-bw-back after:opacity-50 hover:after:block focus:after:block',
        isOpen || isActive ? 'after:block' : 'after:hidden',
        {
          'after:opacity-100': isActive,
          'cursor-pointer': !hasSubMenu,
        },
      )}
      href={item?.path}
      target={item?.external ? '_blank' : undefined}
      onClick={handleActionMemo}
      ref={ref}
      tabIndex={0}
    >
      {item?.label ? item?.label : label}
    </a>
  );
});
