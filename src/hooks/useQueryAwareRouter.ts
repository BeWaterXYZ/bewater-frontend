import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { URLSearchParams } from 'url';
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
    let { searchParams, pathname } = new URL(url);
    let finalParams = searchParamsToCarryOver.reduce((prev, cur) => {
      let param = searchParams.get(cur) ?? this.searchParams.get(cur);
      if (param) {
        prev.set(cur, param);
      }
      return prev;
    }, new URLSearchParams());
    return this.router.push(pathname + '?' + finalParams.toString(), options);
  }
  pushWithRedirect(url: string) {
    let { searchParams, pathname } = new URL(url);
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

  // private passQuery(original: UrlObject | string): UrlObject {
  //   if (typeof original === 'string') {
  //     return { pathname: original, query: this.copyQuery() };
  //   } else {
  //     return {
  //       ...original,
  //       query: Object.assign({}, this.copyQuery(), original.query),
  //     };
  //   }
  // }

  // private copyQuery() {
  //   return pick(this.delegate., searchParamsToCarryOver) as ParsedUrlQuery;
  // }
}
