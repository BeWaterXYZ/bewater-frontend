import clsx from 'clsx';

interface Props {
  text: string;
  type: string;
  className?: string;
  onClick?: () => void;
}

export const Button = ({ text, type, className, ...props }: Props) => {
  return (
    <button
      className={clsx(
        'inline-flex typ-body py-1 px-4 border border-solid rounded-button cursor-pointer w-auto h-8 box-border hover:brightness-90 transition duration-[.15s] ease-out',
        {
          'border-bw-fore bg-bw-fore text-bw-back': type === 'primary',
          'border-bw-fore bg-bw-back text-bw-fore': type === 'secondary',
          'border-[#DD2828] bg-bw-back text-[#DD2828]': type === 'danger',
        },
        className,
        { ...props },
      )}
    >
      {text}
    </button>
  );
};
