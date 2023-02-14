import clsx from 'clsx';
import Image from 'next/image';

interface Props {
  walletAddress?: string;
  src?: string;
  className?: string;
  onClick?: () => void;
}

function translateSRC(src?: string, walletAddress?: string) {
  return src?.startsWith('ipfs://')
    ? src.replace('ipfs://', 'https://') + '.ipfs.nftstorage.link'
    : !src
    ? `https://www.gradproject.xyz/api/${walletAddress}`
    : src;
}

export const Avatar = ({
  walletAddress = '',
  src,
  className,
  onClick,
}: Props) => {
  let transaltedSrc = translateSRC(src, walletAddress);

  return (
    <div className={clsx('relative', className)}>
      <Image
        fill
        className="w-full h-full rounded-full cursor-pointer object-cover"
        src={transaltedSrc}
        alt="avatar"
      />
    </div>
  );
};
