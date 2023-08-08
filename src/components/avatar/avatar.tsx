'use client';
import clsx from 'clsx';

interface Props {
  src?: string;
  className?: string;
  onClick?: () => void;
}

export const Avatar = ({
  src,
  className,
  onClick,
}: Props) => {

  return (
    <div className={clsx('relative', className)}>
      <img
        width={200}
        height={200}
        className="w-full h-full rounded-full cursor-pointer object-cover hover:opacity-75 transition-opacity ease-out"
        src={src}
        alt="avatar"
      />
    </div>
  );
};
