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
  let [imageSrc, imageSrcSet] = useState(
    !src
      ? `https://www.gradproject.xyz/api/${walletAddress}`
      : !src?.startsWith('ipfs://')
      ? src
      : undefined,
  );

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
  }, []);

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
