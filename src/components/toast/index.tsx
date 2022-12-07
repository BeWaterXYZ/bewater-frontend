import * as Toast from '@radix-ui/react-toast';

import { useToastStore } from './store';

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  return (
    <div>
      <Toast.Provider>
        {toasts.map((toast) => (
          <Toast.Root key={toast.id}>
            <Toast.Description>{toast.title}</Toast.Description>
          </Toast.Root>
        ))}

        <Toast.Viewport className="absolute flex flex-col gap-3 bottom-0 right-0 p-4" />
      </Toast.Provider>
    </div>
  );
}
