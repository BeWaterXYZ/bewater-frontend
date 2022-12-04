import create from 'zustand';

type State = {
  metamask: boolean;
};

type Actions = {
  open: (name: string) => void;
  close: (name: string) => void;
};

export const useModalStore = create<State & Actions>((set) => ({
  metamask: false,
  open: (name: string) => set(() => ({ [name]: true })),
  close: (name: string) => set(() => ({ [name]: false })),
}));
