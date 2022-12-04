import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import { Modal } from './modal';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Base/Modal',
  component: Modal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Modal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Modal> = () => {
  const [modalOpen, setModalOpen] = React.useState(true);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);
  return (
    <>
      <motion.button
        whileHover={{ scale: 1 }}
        whileTap={{ scale: 0.9 }}
        className="typ-body py-1 px-4 border border-solid rounded-button cursor-pointer w-auto h-8 box-border border-bw-fore bg-bw-fore text-bw-back"
        onClick={() => (modalOpen ? close() : open())}
      >
        Launch modal
      </motion.button>
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
          <Modal onClose={close}>
            <div className="flex flex-row justify-center items-center">
              MetaMask
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export const Normal = Template.bind({});
