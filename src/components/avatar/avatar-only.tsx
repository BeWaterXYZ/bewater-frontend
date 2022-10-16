import clsx from 'clsx';

import { useRandomColor } from '@/hooks/useRandomColor';

interface Props {
  walletAddress?: string;
  imageUrl?: string;
  size?: 'large' | 'small';
  onClick?: () => void;
}

export const AvatarOnly = ({
  walletAddress = '',
  size = 'large',
  imageUrl,
  onClick,
}: Props) => {
  const randomColor = useRandomColor(walletAddress);
  return (
    <div
      className={clsx({
        'w-40 h-40': size === 'large',
        'w-10 h-10': size === 'small',
      })}
    >
      {imageUrl ? (
        <img
          className="w-full h-full rounded-full cursor-pointer object-cover"
          src={imageUrl}
          alt="avatar"
        />
      ) : (
        <div
          className="w-full h-full rounded-full cursor-pointer"
          style={{ backgroundImage: `linear-gradient(${randomColor}, #fff)` }}
          onClick={onClick}
        ></div>
      )}
    </div>
  );
};
