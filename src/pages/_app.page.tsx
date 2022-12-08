import { useState } from 'react';
import '../styles/index.css';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { Footer } from '@/features/footer';
import { Header } from '@/features/header';
import { ToastContainer } from '@/components/toast';
import { useToastStore } from '@/components/toast/store';

import type { AppProps } from 'next/app';

function BeWaterWebsite({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: unknown }>) {
  const [queryClient] = useState(() => new QueryClient());
  const toasts = useToastStore((s) => s.toasts);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps?.dehydratedState}>
        <div className="h-full flex flex-col">
          <Header />
          <div className="flex-1">
            <Component {...pageProps} />
          </div>
          <Footer />
          <ToastContainer toasts={toasts} />
        </div>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default BeWaterWebsite;
