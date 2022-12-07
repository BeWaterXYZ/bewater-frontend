import create from 'zustand';

interface Toast {
  id: number;
  title: string;
  description: string;
}

type State = {
  toasts: Toast[];
};

type Actions = {
  add: (toast: Partial<Toast>) => void;
  clear: () => void;
};

let id = 0;
export const useToastStore = create<State & Actions>((set, get) => ({
  toasts: [],

  add: (toast) => {
    const old = get().toasts;
    set({
      toasts: [
        ...old,
        {
          ...{ id: id++, title: '', description: '' },
          ...toast,
        },
      ],
    });
  },
  clear: () => {
    set({ toasts: [] });
  },
}));
