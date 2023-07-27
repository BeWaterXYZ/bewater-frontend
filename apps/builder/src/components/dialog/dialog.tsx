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
              className="absolute flex justify-center items-center z-10 top-5 right-5 rounded-full border  border-white/30 w-[30px] h-[30px]"
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
