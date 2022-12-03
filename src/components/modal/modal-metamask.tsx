import { AnimatePresence } from 'framer-motion';

import { Logo } from '@/components/logos';

import { Modal } from './modal';

interface Props {
  modalOpen?: boolean;
  onClose: () => void;
}

export function ModalMetamask({ modalOpen, onClose }: Props) {
  return (
    <AnimatePresence
      // Disable any initial animations on children that
      // are present when the component is first rendered
      initial={false}
      // Only render one component at a time.
      // The exiting component will finish its exit
      // animation before entering component is rendered
      exitBeforeEnter={true}
      // Fires when all exiting nodes have completed animating out
      onExitComplete={() => null}
    >
      {modalOpen && (
        <Modal onClose={onClose}>
          <div className="flex flex-col justify-center items-center">
            <Logo className="w-12 h-12" code="metamask" />
            <div className="typ-h5 mt-5 mb-8">MetaMask is not found.</div>
            <div className="typ-body">
              You can try to install through its official site.
            </div>
            <a
              className="typ-body text-bw-brand"
              target="_blank"
              rel="noopenner noreferrer"
              href="https://metamask.io"
            >
              https://metamask.io
            </a>
          </div>
        </Modal>
      )}
    </AnimatePresence>
  );
}
