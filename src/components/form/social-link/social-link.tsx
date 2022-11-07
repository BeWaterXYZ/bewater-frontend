import clsx from 'clsx';

import { Logo } from '@/components/logos';
import { Button } from '@/components/button';

interface Props {
  className?: string;
  name: 'github' | 'discord' | 'twitter';
  label: string;
  value?: string;
}

export function SocialLink({ className, name, label, value }: Props) {
  return (
    <div className={clsx('block pb-4', className)}>
      <label className="block typ-label w-auto text-bw-fore py-1">
        {label}
      </label>
      <div className="flex flex-row gap-x-4 items-center justify-between">
        <div className="flex flex-row gap-x-2 items-center w-full">
          {value ? (
            <>
              <Logo className="w-4 h-4 grayscale" code={name} />
              <a className="typ-body py-1 text-bw-fore">{value}</a>
            </>
          ) : (
            // TODO: Add connect function
            <Button text={`Connect ${label}`} type="secondary" />
          )}
        </div>
        {/* TODO: add disconnect function */}
        {value && <Button text="Disconnect" type="danger" />}
      </div>
    </div>
  );
}
