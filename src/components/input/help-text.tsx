import React from 'react';
import clsx from 'clsx';

interface Props {
  text?: string;
}

export const HelpText = ({ text }: Props) => {
  return (
    <div
      className={clsx('whitespace-nowrap typ-body py-1 text-[#DD2828]', {
        hidden: !text,
      })}
    >
      {text}
    </div>
  );
};
