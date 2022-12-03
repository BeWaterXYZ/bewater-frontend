import { motion } from 'framer-motion';
import * as React from 'react';

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

export function Backdrop({ children, onClick }: Props) {
  return (
    <motion.div
      onClick={onClick}
      className="fixed top-0 bottom-0 left-0 right-0 bg-gray-500 bg-opacity-30 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}
