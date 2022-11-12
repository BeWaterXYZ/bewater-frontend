import clsx from 'clsx';

import { Button } from '@/components/button';
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
      <Avatar src={src} size="large" walletAddress={walletAddress} />
      <Button text={src ? 'Change Avatar' : 'Upload Avatar'} type="secondary" />
    </div>
  );
};
