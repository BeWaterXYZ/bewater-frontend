import { create } from 'zustand';

export interface Toast {
  id: number;
  title: string;
  type: 'success' | 'error' | 'warning';
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
          ...{ id: id++, title: '', description: '', type: 'error' },
          ...toast,
        },
      ],
    });
  },
  clear: () => {
    set({ toasts: [] });
  },
}));
