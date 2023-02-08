import { getRandomColor } from '@/utils/random-color';
import clsx from 'clsx';
import Image from 'next/image';

interface Props {
  walletAddress?: string;
  src?: string;
  className?: string;
  onClick?: () => void;
}

function translateSRC(src?: string) {
  return src?.startsWith('ipfs://')
    ? src.replace('ipfs://', 'https://') + '.ipfs.nftstorage.link'
    : src;
}

export const Avatar = ({
  walletAddress = '',
  src,
  className,
  onClick,
}: Props) => {
  let transaltedSrc = translateSRC(src);
  return (
    <div className={clsx('relative', className)}>
      {transaltedSrc ? (
        <Image
          fill
          className="w-full h-full rounded-full cursor-pointer object-cover"
          src={transaltedSrc}
          alt="avatar"
        />
      ) : (
        <div
          className={clsx(
            'w-full h-full rounded-full cursor-pointer',
            className,
          )}
          style={{
            backgroundImage: `linear-gradient(${getRandomColor(
              walletAddress.toLowerCase(),
            )}, #fff)`,
          }}
          onClick={onClick}
        ></div>
      )}
    </div>
  );
};
