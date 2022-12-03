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
      className={clsx(
        'body-1 font-body_small w-auto',
        {
          'before:content-["#"]': isSkill,
        },
        className,
      )}
    >
      {name}
    </p>
  );
};
