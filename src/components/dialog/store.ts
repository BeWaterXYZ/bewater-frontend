import create from 'zustand';

export type Dialogs = {
  metamask_not_support?: boolean;
  team_join?: { teamId: string };
  team_create?: boolean;
};

type State = {
  dialogs: Dialogs;
};

export type DialogsKeys = keyof Dialogs;
export type CloseDialogFunc = <T extends DialogsKeys>(name: T) => void;

type Actions = {
  open: <T extends DialogsKeys>(name: T, data: Dialogs[T]) => void;
  close: CloseDialogFunc;
};

export const useDialogStore = create<State & Actions>((set) => ({
  dialogs: {
    metamask_not_support: undefined,
    team_join: undefined,
    team_create: undefined,
  },
  open: (name, data) =>
    set((old) => ({ dialogs: { ...old.dialogs, [name]: data } })),

  close: (name) =>
    set((old) => ({ dialogs: { ...old.dialogs, [name]: undefined } })),
}));
