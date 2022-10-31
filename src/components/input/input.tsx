import * as React from 'react';
import InputUnstyled, {
  InputUnstyledProps,
  InputUnstyledInputSlotProps,
} from '@mui/base/InputUnstyled';

import clsx from 'clsx';

const CustomInput = React.forwardRef(function CustomInput(
  props: InputUnstyledInputSlotProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  return (
    <input
      {...props}
      className={
        'typ-body py-1 px-4 h-8 box-border border border-solid bg-bw-back rounded-button w-full max-w-[400px] mr-4 transition duration-[.15s] focus:outline-none ease'
      }
      ref={ref}
    />
  );
});

interface Props {
  placeholder?: string;
  type: string;
  className?: string;
  helpText?: string;
}

export const Input = ({ placeholder, type, helpText, className }: Props) => {
  return (
    <div className="block items-center">
      <CustomInput
        placeholder={placeholder}
        type="text"
        disabled={type === 'disabled' ? true : false}
        error={type === 'error' ? true : false}
        multiline={type === 'multiline' ? true : false}
        className={clsx(
          '',
          {
            'border-[#E4E4E4] text-bw-fore text-opacity-30 bg-[#F7F7F7':
              type === 'disabled',
            'border-[#E4E4E4] text-bw-fore hover:border-[#d0d0d0] focus:border-[#999999]':
              type === 'normal',
            'border-[#EB7E7E] placeholder:text-[#DD2828]': type === 'error',
          },
          className,
        )}
      />
      {type === 'error' && (
        <a className="inline-block whitespace-nowrap typ-body py-1 text-[#DD2828]">
          {helpText}
        </a>
      )}
    </div>
  );
};
