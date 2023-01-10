import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { isBrowser } from '@/constants';

const searchParamsToCarryOver = ['redirect'];

export default function useQueryAwareRouter() {
  const delegate = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  return useMemo(
    () => new QueryAwareRouterImpl(delegate, searchParams, pathname ?? ''),
    [delegate],
  );
}

class QueryAwareRouterImpl {
  constructor(
    public readonly router: AppRouterInstance,
    public readonly searchParams: ReturnType<typeof useSearchParams>,
    public readonly pathname: string,
  ) {}
  forward(): void {
    throw new Error('Method not implemented.');
  }

  prefetch(url: string) {
    return this.router.prefetch(url);
  }

  push(url: string, options?: Parameters<AppRouterInstance['push']>[1]) {
    if (!isBrowser) return;
    let { searchParams, pathname } = new URL(url, window.location.origin);
    let finalParams = searchParamsToCarryOver.reduce((prev, cur) => {
      let param = searchParams.get(cur) ?? this.searchParams.get(cur);
      if (param) {
        prev.set(cur, param);
      }
      return prev;
    }, new URLSearchParams());
    let finalURL = pathname + '?' + finalParams.toString();
    return this.router.push(finalURL, options);
  }
  pushWithRedirect(url: string) {
    console.log(url);
    let { searchParams, pathname } = new URL(url, window.location.origin);
    searchParams.set('redirect', this.pathname);
    this.router.push(pathname + '?' + searchParams.toString());
  }
  gotoRedirect(fallbackURL: string) {
    let goto = this.searchParams.get('redirect') ?? fallbackURL;
    this.router.push(goto);
  }

  replace(href: string, options?: Parameters<AppRouterInstance['push']>[1]) {
    return this.router.replace(href, options);
  }

  back() {
    this.router.back();
  }

  refresh() {
    throw new Error('Method not implemented.');
  }
}
