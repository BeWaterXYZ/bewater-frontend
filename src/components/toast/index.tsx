import { Cross2Icon } from '@radix-ui/react-icons';
import * as Toast from '@radix-ui/react-toast';
import clsx from 'clsx';
import Image from 'next/image';

import { Toast as ToastType } from './store';

interface ToastContainerProps {
  toasts: ToastType[];
}

export function ToastContainer({ toasts }: ToastContainerProps) {
  return (
    <div>
      <Toast.Provider>
        {toasts.map((toast) => (
          <Toast.Root
            key={toast.id}
            className={clsx(
              'rounded shadow-sm p-4 relative bg-gray-800 border border-[#1E293B]',
              {
                // 'bg-red-400': toast.type === 'error',
                // 'bg-green-400': toast.type === 'success',
                // 'bg-blue-400': toast.type === 'info',
              },
            )}
          >
            <div className="flex flex-row">
              <div className="mx-1">
                <Image
                  src="/icons/check-circle.svg"
                  width={24}
                  height={24}
                  alt="check"
                />
              </div>
              <div>
                <Toast.Title className="body-3 font-bold">
                  {toast.title}
                </Toast.Title>
                <Toast.Description className="body-4 text-grey">
                  {toast.description}
                </Toast.Description>
              </div>
              <div className="w-20">
                <Toast.Close>
                  <button
                    className="absolute z-10 top-4 right-4 rounded-full  p-1 "
                    aria-label="Close"
                  >
                    <Cross2Icon className=" text-grey" />
                  </button>
                </Toast.Close>
              </div>
            </div>
          </Toast.Root>
        ))}

        <Toast.Viewport className="absolute flex flex-col gap-3 bottom-0 right-0 p-4" />
      </Toast.Provider>
    </div>
  );
}
