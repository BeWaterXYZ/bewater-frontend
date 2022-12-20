import clsx from 'clsx';
import Image from 'next/image';
import { useRandomColor } from '@/hooks/useRandomColor';

interface Props {
  walletAddress?: string;
  src?: string;
  size?: 'large' | 'small';
  className?: string;
  onClick?: () => void;
}

export const Avatar = ({
  walletAddress = '',
  size = 'large',
  src,
  className,
  onClick,
}: Props) => {
  const randomColor = useRandomColor(walletAddress.toLowerCase());
  return (
    <div
      className={clsx({
        'w-40 h-40': size === 'large',
        'w-10 h-10': size === 'small',
        className,
      })}
    >
      {src ? (
        <Image
          width={size === 'large' ? 160 : 40}
          height={size === 'large' ? 160 : 40}
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
