import dynamicLoad from 'next/dynamic';
import { ComponentType } from 'react';
import { Loading } from '../loading/loading';

import { Dialog } from './dialog';
import { CloseDialogFunc, Dialogs, DialogsKeys } from './store';
interface DialogContainerProps {
  dialogs: Dialogs;
  closeDialog: CloseDialogFunc;
}

type DialogMap = Record<
  DialogsKeys,
  ComponentType<{ data: any; close: () => void }>
>;


const dialogMaps: DialogMap = {
  metamask_not_support: dynamicLoad(
    () => import('./dialogs/metamask-not-support'),
  ),
  team_join: dynamicLoad(() => import('./dialogs/team-join'), {
    loading: () => <Loading />,
  }),
  team_create: dynamicLoad(() => import('./dialogs/team-create'), {
    loading: () => <Loading />,
  }),
  team_created: dynamicLoad(() => import('./dialogs/team-created'), {
    loading: () => <Loading />,
  }),
  team_manage_member: dynamicLoad(
    () => import('./dialogs/team-manage-member'),
    {
      loading: () => <Loading />,
    },
  ),
  team_invite_member: dynamicLoad(
    () => import('./dialogs/team-invite-member'),
    {
      loading: () => <Loading />,
    },
  ),
  email_change: dynamicLoad(() => import('./dialogs/email-change'), {
    loading: () => <Loading />,
  }),
  team_filter: dynamicLoad(() => import('./dialogs/team-filter'), {
    loading: () => <Loading />,
  }),
  project_edit: dynamicLoad(() => import('./dialogs/project-edit'), {
    loading: () => <Loading />,
  }),
  project_filter: dynamicLoad(() => import('./dialogs/project-filter'), {
    loading: () => <Loading />,
  }),
  project_rating: dynamicLoad(() => import('./dialogs/project-rating'), {
    loading: () => <Loading />,
  }),

  rating_dimensions: dynamicLoad(() => import('./dialogs/rating-dimensions'), {
    loading: () => <Loading />,
  }),
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
