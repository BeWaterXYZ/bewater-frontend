'use client';
import { DialogContainer } from '@/components/dialog';
import { useDialogStore } from '@/components/dialog/store';
import { ToastContainer } from '@/components/toast';
import { useToastStore } from '@/components/toast/store';

export function Dumpster() {
  const toasts = useToastStore((s) => s.toasts);
  const dialogs = useDialogStore((s) => s.dialogs);
  const closeDialog = useDialogStore((s) => s.close);
  return (
    <>
      <DialogContainer dialogs={dialogs} closeDialog={closeDialog} />
      <ToastContainer toasts={toasts} />
    </>
  );
}
