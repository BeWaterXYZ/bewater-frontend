import clsx from 'clsx';
import Image from 'next/image';
import BeWater from '@/components/logos/bewater-white.svg';

export default function HomeHero() {
  return (
    <div
      data-block="hero"
      className={clsx('w-full h-screen overflow-hidden select-none')}
    >
      <div
        className={clsx(
          'w-full h-[162%] absolute -top-[82%] left-1/2 -translate-x-1/2',
          'bg-hero blur-[150px]',
        )}
      />
      <div
        className={clsx(
          'absolute top-0 left-0 z-10',
          'w-full h-full flex flex-col justify-center items-center gap-16',
        )}
      >
        <BeWater className="w-[138px] h-[148px] shrink-0" />
        <div
          className={clsx(
            'font-primary text-[24px] md:text-[32px] leading-normal font-bold',
            'shrink-0 bg-slogan bg-clip-text text-transparent',
          )}
        >
          {`I Builder Therefore I Am`}
        </div>
      </div>
      <Image
        width={32}
        height={32}
        className="w-8 h-8 absolute z-10 bottom-20 left-1/2 -translate-x-1/2"
        src="/home/hero-arrow-down.svg"
        alt="arrow-down"
      />
    </div>
  );
}
