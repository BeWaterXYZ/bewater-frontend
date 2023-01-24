import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Alert } from './store';

interface AlertProps {
  alert: Alert;
}

export function Alert({ alert }: AlertProps) {
  return (
    <AlertDialog.Root open>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="DialogOverlay z-40" />
        <AlertDialog.Content className="DialogContent  z-50 flex flex-col w-[300px] md:w-[400px]">
          <AlertDialog.Title className="heading-5">
            {alert.title}
          </AlertDialog.Title>
          <div className="flex-1" />
          <AlertDialog.Description className="body-4">
            {alert.description}
          </AlertDialog.Description>
          <div className="flex-1" />
          <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
            <AlertDialog.Cancel asChild>
              <button
                className="btn btn-secondary"
                onClick={() => alert.callback?.(false)}
              >
                {alert.cancelCopy}
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                className="btn btn-primary"
                onClick={() => alert.callback?.(true)}
              >
                {alert.okCopy}
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
