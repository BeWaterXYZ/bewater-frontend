import clsx from 'clsx';
import * as React from 'react';

interface Props {
  text: string;
  type: string;
  href?: string;
  className?: string;
  onClick?: () => void;
}

export const Button = React.forwardRef(function Button(
  { text, type, className, href, ...props }: Props,
  ref: React.ForwardedRef<HTMLAnchorElement>,
) {
  const renderButton = () => {
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
  return href ? (
    <a href={href} ref={ref}>
      {renderButton()}
    </a>
  ) : (
    renderButton()
  );
});
