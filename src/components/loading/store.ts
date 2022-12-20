import { useEffect } from 'react';
import create from 'zustand';
type State = {
  loading: boolean;
};

type Actions = {
  show: () => void;
  dismiss: () => void;
};

export const useLoadingStore = create<State & Actions>((set) => ({
  loading: false,
  show: () => set({ loading: true }),
  dismiss: () => set({ loading: false }),
}));

export function useLoadingStoreAction() {
  return {
    showLoading: useLoadingStore((s) => s.show),
    dismissLoading: useLoadingStore((s) => s.dismiss),
  };
}

export function useLoadingWhen(loading: boolean) {
  let { showLoading, dismissLoading } = useLoadingStoreAction();

  useEffect(() => {
    loading ? showLoading() : dismissLoading();
  }, [loading]);
}
