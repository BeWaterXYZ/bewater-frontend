import clsx from 'clsx';

interface Props {
  title: string;
  description: string;
  type: string;
  className?: string;
}

export const StatsItem = ({ title, description, type, className }: Props) => {
  return (
    <div
      className={clsx(
        'flex flex-col gap-2 py-3 px-4 box-border border border-[#E4E4E4] border-solid bg-bw-back rounded-md w-full max-w-[192px] h-20 transition duration-[.15s] ease',
        className,
      )}
    >
      <div className="body-1">{title}</div>
      {type === 'number' ? (
        <div className="typ-number">{description}</div>
      ) : (
        <div className="body-1">{description}</div>
      )}
    </div>
  );
};
