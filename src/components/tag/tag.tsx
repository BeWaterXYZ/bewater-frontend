'use client';
import clsx from 'clsx';
import { Cross2Icon } from '@radix-ui/react-icons';

export interface TagProps {
  label: string;
  classes: string;
  onClick?: () => void;
}

export function Tag({ label, classes, onClick }: TagProps) {
  return (
    <div
      className={clsx(
        'whitespace-nowrap inline-block rounded-sm h-6  border  text-white px-2 py-1 my-1',
        classes,
      )}
    >
      {label}{' '}
      {onClick && (
        <Cross2Icon
          className="inline w-3 h-3 cursor-pointer"
          onClick={onClick}
        />
      )}
    </div>
  );
}
