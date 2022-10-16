import clsx from 'clsx';

interface Props {
  name: string;
  color?: string;
  isSkill: boolean;
  className?: string;
}

export const Tag = ({ name, isSkill, className }: Props) => {
  return (
    <p
      className={clsx('typ-body w-auto', {
        'before:content-["#"]': isSkill,
      })}
    >
      {name}
    </p>
  );
};
