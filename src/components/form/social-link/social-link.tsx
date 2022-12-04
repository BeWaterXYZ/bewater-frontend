import clsx from 'clsx';

import { Logo } from '@/components/logos';

interface Props {
  className?: string;
  name: 'github' | 'discord' | 'twitter';
  label: string;
  value?: string;
}

export function SocialLink({ className, name, label, value }: Props) {
  return (
    <div className={clsx('block pb-4', className)}>
      <label className="block body-3 w-auto text-black py-1">{label}</label>
      <div className="flex flex-row gap-x-4 items-center justify-between">
        <div className="flex flex-row gap-x-2 items-center w-full">
          {value ? (
            <>
              <Logo className="w-4 h-4 grayscale" code={name} />
              <a className="body-1 py-1 text-black">{value}</a>
            </>
          ) : (
            <button className="btn btn-secondary">Connect {label}</button>
          )}
        </div>
        {/* TODO: add disconnect function */}
        {value && <button className="btn btn-danger">Disconnect</button>}
      </div>
    </div>
  );
}
