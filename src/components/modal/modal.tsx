import { motion } from 'framer-motion';
import * as React from 'react';

import { IconClose } from '@/components/icons';

import { Backdrop } from './backdrop';

// TODO: move the dropIn effect to common animation set later if we have more animation effect
const dropIn = {
  hidden: {
    y: '100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
};

interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

export function Modal({ onClose, children }: Props) {
  return (
    <Backdrop onClick={onClose}>
      <motion.div
        onClick={(e: React.SyntheticEvent<HTMLDivElement>) =>
          e.stopPropagation()
        }
        className="relative mx-auto w-fit mt-40 p-16 bg-white"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
        <IconClose
          className="absolute z-10 top-4 right-4 fill-black w-4 h-4 cursor-pointer"
          onClick={onClose}
        />
      </motion.div>
    </Backdrop>
  );
}
