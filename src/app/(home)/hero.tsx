import clsx from 'clsx';
import Image from 'next/image';
import BeWater from '@/components/logos/bewater-white.svg';

export default function HomeHero() {
  return (
    <div
      data-block="hero"
      className={clsx('relative w-full h-screen overflow-hidden select-none')}
    >
      <div
        className={clsx(
          'w-[102.5vw] h-[102.5vw] rounded-full absolute -top-[72vw] left-1/2 -translate-x-1/2',
          'blur-[150px]',
          'bg-[linear-gradient(232.15deg,_#CE6A9C_14.72%,_#7949D0_31.61%,_#314AE8_67.38%,_#36C8FF_84.91%)]',
        )}
      />
      <div
        className={clsx(
          'relative z-10',
          'w-screen h-screen flex flex-col items-center gap-16',
        )}
      >
        <BeWater className="w-[138px] h-[148px] shrink-0 mt-[30vh]" />
        <div
          className={clsx(
            'font-primary text-[24px] md:text-[32px] leading-normal font-bold',
            'shrink-0 bg-[linear-gradient(180deg,_#FFFFFF_0%,_rgba(255,255,255,0.5)_100%)] bg-clip-text text-transparent',
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
