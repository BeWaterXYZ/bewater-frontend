import create from 'zustand';

export interface Alert {
  title: string;
  description?: string;
  okCopy: string;
  cancelCopy: string;
  callback?: (result: boolean) => void;
}

type State = {
  alert?: Alert;
};
type Actions = {
  show: (alert: Alert) => void;
  dismiss: () => void;
};

export const useAlertStore = create<State & Actions>((set) => ({
  show: (alert) => set({ alert }),
  dismiss: () => {
    set({ alert: undefined });
  },
}));

export function useAlert() {
  let show = useAlertStore((s) => s.show);
  let dismiss = useAlertStore((s) => s.dismiss);
  let confirm = async (alert: Alert) => {
    let resolve: (value: boolean) => void;
    let promise = new Promise((res) => {
      resolve = res;
    });

    let callback = (result: boolean) => {
      resolve(result);
      dismiss();
    };
    show({ ...alert, callback });

    return promise;
  };
  return { confirm };
}
