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
import { DialogContainer } from '@/components/dialog';
import { useDialogStore } from '@/components/dialog/store';

import type { AppProps } from 'next/app';

function BeWaterWebsite({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: unknown }>) {
  const [queryClient] = useState(() => new QueryClient());
  const toasts = useToastStore((s) => s.toasts);
  const dialogs = useDialogStore((s) => s.dialogs);
  const closeDialog = useDialogStore((s) => s.close);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps?.dehydratedState}>
        <div className="h-full flex flex-col bg-night">
          <Header />
          <div className="flex-1">
            <Component {...pageProps} />
          </div>
          <Footer />
          <DialogContainer dialogs={dialogs} closeDialog={closeDialog} />
          <ToastContainer toasts={toasts} />
        </div>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default BeWaterWebsite;
