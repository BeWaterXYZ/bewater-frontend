'use client';
import { AlertContainer } from '@/components/alert';
import { useAlertStore } from '@/components/alert/store';
import { CallbackErrorHandler } from '@/components/callback-error';
import { DialogContainer } from '@/components/dialog';
import { useDialogStore } from '@/components/dialog/store';
import { LoadingContainer } from '@/components/loading';
import { useLoadingStore } from '@/components/loading/store';
import { ToastContainer } from '@/components/toast';
import { useToastStore } from '@/components/toast/store';
import { isBrowser } from '@/constants';
import { attach } from '@/fetch-intercept';

// hack for clerk bug
if (isBrowser) {
  const fetchIntercept = attach(window);
  fetchIntercept.register({
    response: function (response: Response) {
      if (response.url.includes('clerk.accounts.dev/v1/client')) {
        const json = () =>
          response
            .clone()
            .json()
            .then((data) => {
              try {
                data.response.sessions[0].user.web3_wallets[0].verification.strategy =
                  'web3_metamask_signature';
              } catch (err) {
              } finally {
                return data;
              }
            });

        response.json = json;
        return response;
      }

      return response;
    },
  });
}

export function Dumpster({ lng }: { lng: string }) {
  const toasts = useToastStore((s) => s.toasts);
  const dialogs = useDialogStore((s) => s.dialogs);
  const closeDialog = useDialogStore((s) => s.close);
  const loading = useLoadingStore((s) => s.loading);
  const alert = useAlertStore((s) => s.alert);

  return (
    <>
      <DialogContainer dialogs={dialogs} closeDialog={closeDialog} />
      <ToastContainer toasts={toasts} />
      <LoadingContainer loading={loading} />
      <AlertContainer alert={alert} />
      <CallbackErrorHandler />
    </>
  );
}
