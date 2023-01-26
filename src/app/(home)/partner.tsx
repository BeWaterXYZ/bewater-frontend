import clsx from 'clsx';
import Image from 'next/image';

const logos = [
  {
    name: 'abcde',
    url: '/home/partner-abcde.svg',
    w: 185.12,
    h: 64,
  },
  {
    name: 'metatrust-labs',
    url: '/home/partner-metatrust-labs.svg',
    w: 269.81,
    h: 56,
  },
  {
    name: 'scalingx',
    url: '/home/partner-scalingx.svg',
    w: 219,
    h: 48,
  },
  {
    name: 'contentos',
    url: '/home/partner-contentos.svg',
    w: 201.52,
    h: 44,
  },
];

export default function HomePartner() {
  return (
    <div
      data-block="partner"
      className={clsx('w-full xl:w-[1200px] mx-auto py-12', 'select-none')}
    >
      <div className="heading-6 opacity-30 pb-5 text-center">
        Envision The Future With Our Valued Partners
      </div>
      <div className="w-full flex flex-row flex-wrap justify-center gap-10">
        {logos.map((logo, i) => (
          <div
            // height of the container should be the largest one of the logos
            className="h-[64px] flex justify-center items-center relative"
            key={logo.name}
          >
            <Image
              width={logo.w}
              height={logo.h}
              className="object-contain"
              src={logo.url}
              alt={logo.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
