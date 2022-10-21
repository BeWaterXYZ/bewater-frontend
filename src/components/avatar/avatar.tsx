import clsx from 'clsx';

import { Button } from '../button';

interface Props {
  src: string;
  className?: string;
  isEditing: boolean;
}

export const Avatar = ({ src, isEditing, className }: Props) => {
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
      {isEditing && (
        <Button
          text={src ? 'Change Avatar' : 'Upload Avatar'}
          type="secondary"
        />
      )}
    </div>
  );
};
