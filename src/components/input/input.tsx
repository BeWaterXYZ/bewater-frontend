import clsx from 'clsx';

interface Props {
  placeholder?: string;
  type: string;
  className?: string;
}

export const Input = ({ placeholder, type, className }: Props) => {
  return (
    <input
      placeholder={placeholder}
      className={clsx(
        'typ-body py-1 px-4 border border-solid bg-bw-back rounded-[7px] w-full max-w-[400px]  transition duration-[.15s] focus:outline-none ease',
        {
          'border-[#E4E4E4] cursor-not-allowed pointer-events-none text-bw-fore text-opacity-30':
            type === 'disabled',
          'border-[#E4E4E4] text-bw-fore hover:border-[#d0d0d0] focus:border-[#999]':
            type === 'normal',
          'border-[#EB7E7E] placeholder:text-[#DD2828]': type === 'error',
        },
        className,
      )}
    ></input>
  );
};
