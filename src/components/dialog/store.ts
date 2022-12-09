import create from 'zustand';

export type Dialogs = {
  metamask_not_support?: boolean;
  what_ever?: {
    data_you_want_pass_to_dialog: string;
  };
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
    what_ever: undefined,
  },
  open: (name, data) =>
    set((old) => ({ dialogs: { ...old.dialogs, [name]: data } })),

  close: (name) =>
    set((old) => ({ dialogs: { ...old.dialogs, [name]: undefined } })),
}));
