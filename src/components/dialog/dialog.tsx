import clsx from 'clsx';
import * as RadixDialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

interface DialogProps {
  typeName?: string;
  children?: React.ReactNode;
}

export function Dialog({
  typeName,
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
              className={
                clsx("absolute flex justify-center items-center z-10 top-5 right-5 rounded-full border  border-white/30 w-[30px] h-[30px]", {
                  "mr-8": typeName === "team_create"
                })
              }
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
