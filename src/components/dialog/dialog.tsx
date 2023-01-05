import * as RadixDialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

interface DialogProps {
  children?: React.ReactNode;
}

export function Dialog({
  children,
  ...rest
}: DialogProps & RadixDialog.DialogProps) {
  return (
    <RadixDialog.Root {...rest}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="DialogOverlay" />
        <RadixDialog.Content className="DialogContent">
          {children}
          <RadixDialog.Close asChild>
            <button
              className="absolute z-10 top-4 right-4 rounded-full border p-1 border-white/30"
              aria-label="Close"
            >
              <Cross2Icon className=" text-white" />
            </button>
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
