import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Alert } from './store';
import clsx from 'clsx';

interface AlertProps {
  alert: Alert;
}

export function Alert({ alert }: AlertProps) {
  const { type = 'info' } = alert;
  return (
    <AlertDialog.Root open>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="DialogOverlay z-40" />
        <AlertDialog.Content className="DialogContent  z-50 flex flex-col w-[300px] md:w-[400px]">
          <AlertDialog.Title className="body-2 text-center">
            {alert.title}
          </AlertDialog.Title>
          <div className="flex-1" />
          <AlertDialog.Description className="body-3 text-center">
            {alert.description}
          </AlertDialog.Description>
          <div className="flex-1" />
          <div className="flex gap-4 justify-center">
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
                className={clsx(
                  'btn',
                  type === 'info' ? 'btn-primary' : 'btn-danger',
                )}
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
