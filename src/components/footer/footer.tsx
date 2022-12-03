import clsx from 'clsx';

import Discord from '@/components/logos/discord.svg';
import Twitter from '@/components/logos/twitter.svg';

interface Props {
  className?: string;
}

export const Footer = ({ className }: Props) => {
  return (
    <footer
      className={clsx('w-full heading5 text-black bg-bw-back', className)}
    >
      <div className="container mx-auto py-6 flex flex-col gap-2 justify-between items-center md:flex-row md:items-start">
        <div>© {new Date().getFullYear()} BeWater. All Rights Reserved.</div>
        <div className="opacity-70 flex flex-row gap-x-4 items-center justify-end">
          {/* TODO: add link here */}
          <Discord className="grayscale" />
          <Twitter className="grayscale" />
        </div>
      </div>
    </footer>
  );
};
