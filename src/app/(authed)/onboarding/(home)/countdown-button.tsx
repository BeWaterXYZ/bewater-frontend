'use client';
import { MouseEventHandler, useState } from 'react';
import clsx from 'clsx';

export function CountdownButton(
  props: React.ComponentPropsWithoutRef<'button'>,
) {
  const copy = 'Send Code';
  const waitingCopy = 'Resend';
  const [countdown, setCountdown] = useState(0);
  const onClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    if (countdown > 0) return;
    let res = await props.onClick?.(e);
    if (!res) return;
    setCountdown(60);
    let i = window.setInterval(() => {
      setCountdown((cd) => {
        if (cd === 1) {
          window.clearInterval(i);
        }
        return cd - 1;
      });
    }, 1000);
  };
  return (
    <button
      className={clsx('btn btn-secondary', { 'text-grey-400': countdown > 0 })}
      type="button"
      onClick={onClick}
    >
      {countdown === 0 ? copy : `${waitingCopy}(${countdown}s)`}
    </button>
  );
}
