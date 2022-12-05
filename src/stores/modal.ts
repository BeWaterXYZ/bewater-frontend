import create from 'zustand';

type ModalNames = 'metamask' | 'whatever';

type State = {
  [key in ModalNames]: boolean;
};

type Actions = {
  open: (name: ModalNames) => void;
  close: (name: ModalNames) => void;
};

export const useModalStore = create<State & Actions>((set) => ({
  metamask: false,
  whatever: false,
  open: (name: ModalNames) => set(() => ({ [name]: true })),
  close: (name: ModalNames) => set(() => ({ [name]: false })),
}));
