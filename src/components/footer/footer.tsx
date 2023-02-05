import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

interface Props {}

export const Footer = ({}: Props) => {
  return (
    <footer id="main-footer" className={clsx('w-full heading-5  ')}>
      <div className="container mx-auto py-8 flex flex-col gap-2 justify-between items-center md:flex-row md:items-start">
        <div className="body-4 text-gray-100">
          © {new Date().getFullYear()} BeWater. All Rights Reserved.
        </div>
        <div className="flex flex-row gap-x-4 items-center justify-end">
          <Link href="https://t.co/oPJUASWXjh" target="_blank">
            <Image
              src="/icons/footer-discord.svg"
              width={24}
              height={24}
              alt="discord"
            />
          </Link>
          <Link href="https://twitter.com/BeWaterOfficial" target="_blank">
            <Image
              src="/icons/footer-twitter.svg"
              width={24}
              height={24}
              alt="twitter"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};
