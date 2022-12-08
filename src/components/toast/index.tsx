import * as Toast from '@radix-ui/react-toast';
import clsx from 'clsx';

import { useToastStore } from './store';

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  return (
    <div>
      <Toast.Provider>
        {toasts.map((toast) => (
          <Toast.Root
            key={toast.id}
            className={clsx('rounded shadow-sm p-4', {
              'bg-red-400': toast.type === 'error',
              'bg-green-400': toast.type === 'success',
              'bg-blue-400': toast.type === 'info',
            })}
          >
            <Toast.Title className="body-1">{toast.title}</Toast.Title>
            <Toast.Description className="body-2">
              {toast.description}
            </Toast.Description>
          </Toast.Root>
        ))}

        <Toast.Viewport className="absolute flex flex-col gap-3 bottom-0 right-0 p-4" />
      </Toast.Provider>
    </div>
  );
}
