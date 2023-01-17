import { Logo } from '@/components/logos';

import { Dialogs } from '../store';

interface MetaMaskNotSupportDialogProps {
  data: Dialogs['metamask_not_support'];
  close: () => void;
}

export default function MetaMaskNotSupportDialog(
  props: MetaMaskNotSupportDialogProps,
) {
  return (
    <div className="flex flex-col justify-center items-center ">
      <Logo className="w-12 h-12" code="metamask" />
      <div className="heading-5 mt-5 mb-8 text-black">
        MetaMask is not found.
      </div>
      <div className="body-3 text-black">
        You can try to install through its official site.
      </div>
      <a
        className="body-1 text-black"
        target="_blank"
        rel="noopenner noreferrer"
        href="https://metamask.io"
      >
        https://metamask.io
      </a>
    </div>
  );
}
