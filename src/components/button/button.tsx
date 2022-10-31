import * as React from 'react';
import ButtonUnstyled, { ButtonUnstyledProps } from '@mui/base/ButtonUnstyled';

import clsx from 'clsx';

const CustomButton = React.forwardRef(function CustomButton(
  props: ButtonUnstyledProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <ButtonUnstyled
      {...props}
      componentsProps={{
        root: () => ({
          className: `inline-flex typ-body py-1 px-4 border border-solid rounded-button cursor-pointer w-auto h-8 box-border hover:brightness-90 transition duration-[.15s] ease-out`,
        }),
      }}
      ref={ref}
    />
  );
});

interface Props {
  text: string;
  type: string;
  className?: string;
}

export const Button = ({ text, type, className }: Props) => {
  return (
    <CustomButton
      className={clsx(
        {
          'border-bw-fore bg-bw-fore text-bw-back': type === 'primary',
          'border-bw-fore bg-bw-back text-bw-fore': type === 'secondary',
          'border-[#DD2828] bg-bw-back text-[#DD2828]': type === 'danger',
        },
        className,
      )}
    >
      {text}
    </CustomButton>
  );
};
