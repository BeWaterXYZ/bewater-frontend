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

export function Dumpster() {
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
