import { getRandomColor } from '@/utils/random-color';
import clsx from 'clsx';
import Image from 'next/image';

interface Props {
  walletAddress?: string;
  src?: string;
  className?: string;
  onClick?: () => void;
}

export const Avatar = ({
  walletAddress = '',
  src,
  className,
  onClick,
}: Props) => {
  const randomColor = getRandomColor(walletAddress.toLowerCase());
  return (
    <div className={clsx('relative', className)}>
      {src ? (
        <Image
          fill
          className="w-full h-full rounded-full cursor-pointer object-cover"
          src={src}
          alt="avatar"
        />
      ) : (
        <div
          className={clsx(
            'w-full h-full rounded-full cursor-pointer',
            className,
          )}
          style={{ backgroundImage: `linear-gradient(${randomColor}, #fff)` }}
          onClick={onClick}
        ></div>
      )}
    </div>
  );
};
