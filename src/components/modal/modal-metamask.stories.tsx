import { ComponentMeta, ComponentStory } from '@storybook/react';
import { motion } from 'framer-motion';
import React from 'react';

import { ModalMetamask } from './modal-metamask';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Base/ModalMetamask',
  component: ModalMetamask,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ModalMetamask>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ModalMetamask> = () => {
  const [modalOpen, setModalOpen] = React.useState(false);

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
      <ModalMetamask modalOpen={modalOpen} onClose={close} />
    </>
  );
};

export const Normal = Template.bind({});
