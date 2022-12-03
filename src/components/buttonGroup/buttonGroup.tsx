import clsx from 'clsx';

import { ButtonGroupItem } from './buttonGroup-item';

interface Props {
  name1: string;
  name2: string;
  name3: string;
  className?: string;
}

export const ButtonGroup = ({ name1, name2, name3, className }: Props) => {
  return (
    <ul
      className={clsx(
        'w-80 list-none border border-solid border-[#E4E4E4] rounded-md ',
        className,
      )}
    >
      <ButtonGroupItem name={name1} />
      <ButtonGroupItem name={name2} />
      <ButtonGroupItem name={name3} />
    </ul>
  );
};
