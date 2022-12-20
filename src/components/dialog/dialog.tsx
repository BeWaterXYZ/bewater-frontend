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
            <button className="IconButton" aria-label="Close">
              <Cross2Icon className="absolute z-10 top-4 right-4" />
            </button>
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
