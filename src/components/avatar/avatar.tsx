'use client';
import { IPFSGateways } from '@/constants/ipfs';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface Props {
  walletAddress?: string;
  src?: string;
  className?: string;
  onClick?: () => void;
}

function useImageSrc(src?: string, walletAddress?: string) {
  let [imageSrc, imageSrcSet] = useState(() => {
    if (!src) {
      return walletAddress
        ? `https://www.gradproject.xyz/api/${walletAddress}`
        : '/icons/fish.svg';
    } else if (!src?.startsWith('ipfs://')) {
      return src;
    }
    return undefined;
  });

  useEffect(() => {
    let cid = src?.replace('ipfs://', '');
    let promises = IPFSGateways.map(
      (url) =>
        new Promise<string>((res, rej) => {
          let img = new Image();
          let imageSr_ = url + cid;
          img.onload = () => res(imageSr_);
          img.src = imageSr_;
        }),
    );
    Promise.race(promises).then((r) => {
      imageSrcSet(r);
    });
  }, [src]);

  return imageSrc;
}

export const Avatar = ({
  walletAddress = '',
  src,
  className,
  onClick,
}: Props) => {
  let imageSrc = useImageSrc(src, walletAddress);

  return (
    <div className={clsx('relative', className)}>
      <img
        width={200}
        height={200}
        className="w-full h-full rounded-full cursor-pointer object-cover"
        src={imageSrc}
        alt="avatar"
      />
    </div>
  );
};
