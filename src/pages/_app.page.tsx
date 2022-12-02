import { useRouter } from 'next/router';
import { useState } from 'react';
import '../styles/index.css';

import { isBrowser } from '@/constants';
import useTheme from '@/hooks/useTheme';
import getFirstParam from '@/utils/getFirstParam';

import { Footer } from '@/components/footer';
import { Header } from '@/features/header';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import type { AppContext, AppProps } from 'next/app';
import type { ParsedUrlQuery } from 'querystring';
interface Props {
  query: ParsedUrlQuery;
}

function BeWaterWebsite({
  Component,
  query,
  pageProps,
}: Props & AppProps<{ dehydratedState: unknown }>) {
  const router = useRouter();
  const theme = getFirstParam(router.query.theme);
  useTheme(theme);
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps?.dehydratedState}>
        <div className="bw-layout">
          <Header />
          <div className="bw-content">
            <Component {...pageProps} query={query} />
          </div>
          <Footer />
        </div>
      </Hydrate>
    </QueryClientProvider>
  );
}

BeWaterWebsite.getInitialProps = ({ ctx }: AppContext) => {
  // Globally scoped data, no need to update upon navigation.
  if (isBrowser) {
    return {
      query: ctx.query,
    };
  } else {
    return { query: ctx.query };
  }
};

export default BeWaterWebsite;
