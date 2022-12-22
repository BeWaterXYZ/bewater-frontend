'use client';
import clsx from 'clsx';
import { Cross2Icon } from '@radix-ui/react-icons';

const maps = {
  Designer: ['bg-[#831843]', 'border-[#BE185D]'],
  'Frontend Developer': ['bg-[#14532D]', 'border-[#15803D]'],
  'Backend Developer': ['bg-[#1E3A8A]', 'border-[#1D4ED8]'],
  'Blockchain Developer': ['bg-[#312E81]', 'border-[#4338CA]'],
};

type Roles = keyof typeof maps;

interface LabelRoleProps {
  label: Roles;
  onClick?: () => void;
}

export function LabelRole({ label, onClick }: LabelRoleProps) {
  return (
    <span
      className={clsx(
        'whitespace-nowrap inline-block rounded-sm h-6  border  body-4 px-2 py-1 my-1',
        maps[label],
      )}
    >
      {label}{' '}
      {onClick && (
        <Cross2Icon
          className="inline w-3 h-3 cursor-pointer"
          onClick={onClick}
        />
      )}
    </span>
  );
}
