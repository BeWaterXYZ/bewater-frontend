import clsx from 'clsx';
import Link from 'next/link';

import Discord from './footer-discord.svg';
import Twitter from './footer-twitter.svg';

interface Props {
  className?: string;
}

export const Footer = ({ className }: Props) => {
  return (
    <footer id="main-footer" className={clsx('w-full heading-5  ', className)}>
      <div className="container mx-auto py-8 flex flex-col gap-2 justify-between items-center md:flex-row md:items-start">
        <div className="body-4 text-grey-100">
          © {new Date().getFullYear()} BeWater. All Rights Reserved.
        </div>
        <div className="flex flex-row gap-x-4 items-center justify-end">
          <Link href="https://t.co/oPJUASWXjh" target="_blank">
            <Discord />
          </Link>
          <Link href="https://twitter.com/BeWaterOfficial" target="_blank">
            <Twitter />
          </Link>
        </div>
      </div>
    </footer>
  );
};
