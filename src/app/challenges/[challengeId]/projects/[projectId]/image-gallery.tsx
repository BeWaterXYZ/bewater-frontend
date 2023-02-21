'use client';

import FsLightbox from 'fslightbox-react';
import { useEffect, useState } from 'react';

interface ImageGalleryProps {
  sources: string[];
  firstToShow: string;
  show: boolean;
  onClose: () => void;
}
export function ImageGallery({
  sources,
  firstToShow,
  show,
  onClose,
}: ImageGalleryProps) {
  const [trigger, triggerSet] = useState(false);
  useEffect(() => {
    if (show) {
      triggerSet(!trigger);
    }
  }, [show, firstToShow]);
  return (
    <FsLightbox
      toggler={trigger}
      sources={sources}
      source={firstToShow}
      onClose={onClose}
    />
  );
}
