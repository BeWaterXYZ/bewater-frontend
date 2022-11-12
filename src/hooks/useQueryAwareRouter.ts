import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { pick } from 'lodash';

import type { ParsedUrlQuery } from 'querystring';
import type { UrlObject } from 'url';
import type { NextRouter } from 'next/router';

export type QueryAwareRouter = Pick<
  NextRouter,
  'push' | 'replace' | 'prefetch' | 'reload' | 'back' | 'query' | 'events'
>;

const searchParamsToCarryOver = [
  'theme', // Should be light
  'platform', // web | ios | android
];

export default function useQueryAwareRouter(): QueryAwareRouter {
  const delegate = useRouter();
  return useMemo(() => new QueryAwareRouterImpl(delegate), [delegate]);
}

class QueryAwareRouterImpl implements QueryAwareRouter {
  constructor(public readonly delegate: NextRouter) {}

  prefetch(
    url: string,
    as?: string,
    options?: Parameters<NextRouter['prefetch']>[2],
  ) {
    return this.delegate.prefetch(url, as, options);
  }

  push(
    url: UrlObject | string,
    as?: UrlObject | string,
    options?: Parameters<NextRouter['push']>[2],
  ) {
    return this.delegate.push(
      this.passQuery(url),
      as && this.passQuery(as),
      options,
    );
  }

  replace(
    url: UrlObject | string,
    as?: UrlObject | string,
    options?: Parameters<NextRouter['replace']>[2],
  ) {
    return this.delegate.replace(
      this.passQuery(url),
      as && this.passQuery(as),
      options,
    );
  }

  back() {
    this.delegate.back();
  }

  reload() {
    this.delegate.reload();
  }

  get query() {
    return this.delegate.query;
  }

  get events() {
    return this.delegate.events;
  }

  private passQuery(original: UrlObject | string): UrlObject {
    if (typeof original === 'string') {
      return { pathname: original, query: this.copyQuery() };
    } else {
      return {
        ...original,
        query: Object.assign({}, this.copyQuery(), original.query),
      };
    }
  }

  private copyQuery() {
    return pick(this.delegate.query, searchParamsToCarryOver) as ParsedUrlQuery;
  }
}
