import clsx from 'clsx';
import Bewater from '@/components/logos/bewater-white-x.svg';
import HomeForm from './form';
import Link from 'next/link';

export default function HomeFooter() {
  return (
    <div
      data-block="footer"
      className={clsx('relative overflow-hidden w-full h-[466px]')}
    >
      <div
        className={clsx(
          'absolute top-[297px] left-1/2 -translate-x-1/2 w-[92vw] h-[92vw]',
          'bg-[linear-gradient(232.15deg,_#CE6A9C_14.72%,_#7949D0_31.61%,_#314AE8_67.38%,_#36C8FF_84.91%)] blur-[135.938px] rounded-full',
        )}
      />
      <div
        data-block="social-and-email"
        className={clsx(
          'flex flex-row justify-between items-center gap-4 xl:gap-[16%]',
          'xl:w-[910px] h-[411px] mx-auto py-[120px] body-1 z-20 relative',
        )}
      >
        <div className="w-full xl:w-[22%] select-none">
          <Bewater className="w-[192px] mb-8" alt="bewater logo" />
          <div className="flex flex-row gap-5">
            <Link href="https://twitter.com/BeWaterOfficial" target="_blank">
              <img
                className="w-9 h-9"
                src="/home/social-twitter.svg"
                alt="bewater twitter"
              />
            </Link>
            <Link href="https://t.co/oPJUASWXjh" target="_blank">
              <img
                className="w-9 h-9"
                src="/home/social-discord.svg"
                alt="bewater discord"
              />
            </Link>
            <Link href="https://t.co/9ZWZzzYdVq" target="_blank">
              <img
                className="w-9 h-9"
                src="/home/social-telegram.svg"
                alt="bewater telegram"
              />
            </Link>
          </div>
        </div>
        <div className="w-full xl:w-[62%]">
          <HomeForm />
        </div>
      </div>
      <div
        className={clsx(
          'relative z-10 w-full xl:w-[1200px] mx-auto opacity-50',
          'flex flex-row justify-between items-center pt-4 pb-5',
          'border-t-[1px] border-solid border-white/20 desc-3',
        )}
      >
        <div>2022 BeWater. All Rights Reserved.</div>
        <div>
          Privacy Policy<span className="px-3">|</span>Terms of Use
        </div>
      </div>
    </div>
  );
}
