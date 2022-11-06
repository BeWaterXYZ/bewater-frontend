import '../styles/index.css';
import '@rainbow-me/rainbowkit/styles.css';
import { useCallback, useState } from 'react';
import { SWRConfig } from 'swr';
import { useRouter } from 'next/router';

import { useHeaderFooter } from '@/hooks/useHeaderFooter';
import { AuthContext, useAuthToken } from '@/hooks/useAuth';
import useTheme from '@/hooks/useTheme';
import getFirstParam from '@/utils/getFirstParam';
import swrConfig from '@/utils/swrConfig';
import { isBrowser } from '@/constants';
import { UserLocalStorage } from '@/models/user';

import type { AppProps, AppContext } from 'next/app';
import type { ParsedUrlQuery } from 'querystring';
import type { Auth } from '@/models/auth';

interface Props {
  query: ParsedUrlQuery;
}

function BeWaterWebsite({ Component, query, pageProps }: Props & AppProps) {
  const [token, setToken] = useState<Auth & { user: UserLocalStorage }>({
    headers: { Authorization: '' },
    user: {},
  });
  const router = useRouter();
  const theme = getFirstParam(router.query.theme);
  useTheme(theme);
  const _setToken = useCallback(
    (newToken: Auth & { user: UserLocalStorage }) => {
      setToken(newToken);
    },
    [],
  );
  useAuthToken(_setToken);
  const { renderHeader, renderFooter } = useHeaderFooter(Component);
  return (
    <AuthContext.Provider value={token}>
      <SWRConfig value={swrConfig}>
        <div className="bw-layout">
          <>
            {renderHeader()}
            <div className="bw-content">
              <Component {...pageProps} query={query} />
            </div>
            {renderFooter()}
          </>
        </div>
      </SWRConfig>
    </AuthContext.Provider>
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
