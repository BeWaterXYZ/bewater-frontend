"use client";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
// import "yet-another-react-lightbox/plugins/captions.css";
// import "yet-another-react-lightbox/plugins/thumbnails.css";
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

  return show ? (
    <Lightbox
      open={show}
      close={() => onClose()}
      slides={sources.map((s) => ({ type: "image", src: s }))}
    />
  ) : null;
}
