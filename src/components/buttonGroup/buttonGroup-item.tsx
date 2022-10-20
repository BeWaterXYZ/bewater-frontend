import clsx from 'clsx';

import Discord from '@/components/logos/discord.svg';

interface Props {
  name: string;
  className?: string;
}

export const ButtonGroupItem = ({ name, className }: Props) => {
  return (
    <li
      className={clsx(
        'flex gap-x-4 items-center bg-bw-back py-3 pl-4 w-full border-b border-solid border-[#E4E4E4] hover:bg-[#E4E4E4] transition duration-[.15s] ease-out first-of-type:rounded-t-button last-of-type:rounded-b-button cursor-pointer',
        className,
      )}
    >
      {/* To do: 16x16 icon should change according to name */}
      <Discord />
      <span className="text-bw-fore typ-body">{name}</span>
    </li>
  );
};
