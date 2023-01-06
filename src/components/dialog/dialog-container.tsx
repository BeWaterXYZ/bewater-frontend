import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

import { Dialog } from './dialog';
import { Dialogs, DialogsKeys, CloseDialogFunc } from './store';
interface DialogContainerProps {
  dialogs: Dialogs;
  closeDialog: CloseDialogFunc;
}

type DialogMap = Record<
  DialogsKeys,
  ComponentType<{ data: any; close?: () => void }>
>;

const dialogMaps: DialogMap = {
  metamask_not_support: dynamic(
    () => import('./dialogs/metamask-not-support'),
    //   {
    //     ssr: false,
    //   },
  ),
  team_join: dynamic(() => import('./dialogs/team-join')),
  team_create: dynamic(() => import('./dialogs/team-create')),
};

export function DialogContainer({
  dialogs,
  closeDialog,
}: DialogContainerProps) {
  const keys = Object.keys(dialogs).filter((k) => !!dialogs[k as DialogsKeys]);
  return (
    <>
      {keys.map((_key) => {
        const key = _key as DialogsKeys;
        const DialogComp = dialogMaps[key];
        return (
          <Dialog
            key={key}
            open
            defaultOpen
            onOpenChange={(open) => {
              if (!open) {
                closeDialog(key);
              }
            }}
          >
            <DialogComp data={dialogs[key]} close={() => closeDialog(key)} />
          </Dialog>
        );
      })}
    </>
  );
}
