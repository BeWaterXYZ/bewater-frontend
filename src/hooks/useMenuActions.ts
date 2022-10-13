import { MenuAction } from '@/models/menu';
import { useCallback } from 'react';

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
