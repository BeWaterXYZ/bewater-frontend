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
  console.log({ sources, firstToShow, show });
  const [trigger, triggerSet] = useState(false);
  useEffect(() => {
    if (show) {
      triggerSet(!trigger);
    }
  }, [show]);
  return show ? (
    <FsLightbox
      toggler={trigger}
      sources={sources}
      source={firstToShow}
      onClose={onClose}
    />
  ) : null;
}
