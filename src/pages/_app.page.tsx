import '../styles/index.css';
import { useCallback, useState } from 'react';
import { SWRConfig } from 'swr';
import { useRouter } from 'next/router';

import { AuthContext, useAuthToken } from '@/hooks/useAuth';
import useTheme from '@/hooks/useTheme';
import getFirstParam from '@/utils/getFirstParam';
import swrConfig from '@/utils/swrConfig';
import { isBrowser } from '@/constants';

import type { AppProps, AppContext } from 'next/app';
import type { ParsedUrlQuery } from 'querystring';
import { Footer } from '@/components/footer';
import { Header } from '@/features/header';

interface Props {
  query: ParsedUrlQuery;
}

function BeWaterWebsite({ Component, query, pageProps }: Props & AppProps) {
  const router = useRouter();
  const theme = getFirstParam(router.query.theme);
  useTheme(theme);

  return (
    <SWRConfig value={swrConfig}>
      <div className="bw-layout">
        <Header />
        <div className="bw-content">
          <Component {...pageProps} query={query} />
        </div>
        <Footer />
      </div>
    </SWRConfig>
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
