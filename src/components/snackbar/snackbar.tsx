import { Portal } from '@mui/base';

import { IconAlert, IconClose } from '../icons';

type Props = {
  title: string;
  text?: string;
  className?: string;
  open: boolean;
  onClose: () => void;
};

export const Snackbar = function ({
  title,
  text,
  open = false,
  onClose,
}: Props) {
  return open ? (
    <Portal>
      <div className="fixed bottom-4 left-4 right-4 p-6 bg-red-200 z-50">
        <div className="relative w-full mx-auto pr-10 flex items-start text-xl">
          <IconAlert className="w-[1em] h-[1em] mt-0.5 mr-4 shrink-0 fill-red-500" />
          <div>
            <div className="leading-6 max-w-xl">{title}</div>
            {text && (
              <div className="mt-1 text-sm max-w-xl text-gray-900">{text}</div>
            )}
          </div>
          <button
            className="absolute top-0 right-0 flex items-center justify-center w-6 h-6"
            onClick={onClose}
          >
            <IconClose className="w-[1em] h-[1em]" />
          </button>
        </div>
      </div>
    </Portal>
  ) : null;
};
