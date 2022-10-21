import clsx from 'clsx';

import { Button } from '../button';

interface Props {
  src: string;
  className?: string;
}

export const Avatar = ({ src, className }: Props) => {
  return (
    <div
      className={clsx(
        'inline-flex flex-col gap-y-4 w-[216px] items-center',
        className,
      )}
    >
      {src ? (
        <img
          src={src}
          alt="avatar"
          className={clsx('rounded-full object-fill  w-40 h-40', className)}
        />
      ) : (
        <div className="rounded-full w-40 h-40 bg-bw-fore" />
      )}
      {src ? (
        <Button text="Change Avatar" type="secondary" />
      ) : (
        <Button text="Upload Avatar" type="secondary" />
      )}
    </div>
  );
};
