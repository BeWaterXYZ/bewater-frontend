import clsx from 'clsx';

import Discord from '@/components/logos/discord.svg';
import Twitter from '@/components/logos/twitter.svg';

interface Props {
  className?: string;
}

export const Footer = ({ className }: Props) => {
  return (
    <footer id="main-footer" className={clsx('w-full heading-5  ', className)}>
      <div className="container mx-auto py-6 flex flex-col gap-2 justify-between items-center md:flex-row md:items-start">
        <div className="body-4 text-grey">
          © {new Date().getFullYear()} BeWater. All Rights Reserved.
        </div>
        <div className="opacity-70 flex flex-row gap-x-4 items-center justify-end">
          <Discord className="grayscale" />
          <Twitter className="grayscale" />
        </div>
      </div>
    </footer>
  );
};
