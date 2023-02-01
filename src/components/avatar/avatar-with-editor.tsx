import clsx from 'clsx';

import { Avatar } from '@/components/avatar';

interface Props {
  src?: string;
  walletAddress?: string;
  className?: string;
}

export const AvatarWithEditor = ({ src, walletAddress, className }: Props) => {
  return (
    <div
      className={clsx(
        'inline-flex flex-col gap-y-4 items-center h-auto w-[216px]',
        className,
      )}
    >
      <Avatar src={src} className="w-48 h-48" walletAddress={walletAddress} />
      <button className="btn btn-secondary">
        {src ? 'Change Avatar' : 'Upload Avatar'}
      </button>
    </div>
  );
};
