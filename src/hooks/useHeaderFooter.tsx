import { useCallback } from 'react';
import { NextComponentType } from 'next';

import { HeaderWrapper, BasicHeader } from '@/components/header';
import { Footer } from '@/components/footer';

export function useHeaderFooter(Component?: NextComponentType) {
  const renderHeader = useCallback(() => {
    if (Component?.displayName === 'PageConnectWallet') {
      return <BasicHeader />;
    }
    return <HeaderWrapper />;
  }, [Component]);

  const renderFooter = useCallback(() => {
    return <Footer />;
  }, []);

  return {
    renderHeader,
    renderFooter,
  };
}
