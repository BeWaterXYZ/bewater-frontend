import { useCallback } from 'react';

import { MenuAction } from '@/models/menu';

export function useMenuActions() {
  const handleAction = useCallback((action: string) => {
    switch (action) {
      case MenuAction.Logout:
        handleLogout();
        break;
      case 'default':
        console.error(`Unknown menu action: ${action}`);
        break;
    }
  }, []);

  return {
    handleAction,
  };
}

function handleLogout() {
  window.location.href = `/api/auth/logout`;
}
