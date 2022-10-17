import clsx from 'clsx';

interface Props {
  text: string;
  type: string;
  className?: string;
}

export const Button = ({ text, type, className }: Props) => {
  return (
    <button
      className={clsx(
        'inline-flex typ-body py-1 px-4 border-2 border-solid rounded-[7px] cursor-pointer w-auto hover:brightness-90 transition duration-[.15s] ease-out',
        {
          'border-bw-fore bg-bw-fore text-bw-back': type === 'primary',
          'border-bw-fore bg-bw-back text-bw-fore': type === 'secondary',
          'border-[#DD2828] bg-bw-back text-[#DD2828]': type === 'danger',
        },
        className,
      )}
    >
      {text}
    </button>
  );
};
