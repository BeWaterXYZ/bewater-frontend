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
          'inline-flex body1 py-1 px-4 border border-solid rounded-md cursor-pointer w-auto h-8 box-border hover:brightness-90 transition duration-[.15s] ease-out',
          {
            'border-black bg-black text-white': type === 'primary',
            'border-black bg-white text-black': type === 'secondary',
            'border-danger bg-white text-danger': type === 'dangepr',
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
