import Link from 'next/link';
import { Nav } from './nav';
import dynamicLoad from 'next/dynamic';
import { HeaderScrollHelper } from './scroll-helper';
import Image from 'next/image';

interface HeaderImplProps {
  logo: React.ReactNode;
  nav: React.ReactNode;
  user: React.ReactNode;
}

const UserArea = dynamicLoad(() => import('./user'), {
  ssr: false,
});

export const HeaderImpl = ({ logo, nav, user }: HeaderImplProps) => {
  return (
    <header
      id="main-header"
      className="fixed z-[11]  top-0 left-0 right-0 text-black w-full flex flex-shrink-0 justify-center items-center transition-colors"
    >
      <div className=" flex items-center justify-between container flex-wrap">
        <div className="w-1/2 order-1 md:w-1/5 flex justify-start h-[72px] items-center">
          {logo}
        </div>
        {/* <div className="w-full order-3 md:order-2 md:w-3/5 hidden md:flex justify-center ">
          {nav}
        </div> */}
        <div className="w-1/2  order-2 md:order-3 md:w-1/5 flex justify-end h-[72px] items-center">
          {user}
        </div>
      </div>
      <HeaderScrollHelper />
    </header>
  );
};

const BeWaterLogo = () => {
  return (
    <Link href="/" className="flex flex-row relative">
      <Image
        src="/logo/bewater-h.svg"
        width={120}
        height={24}
        alt="bewater logo"
      />
      <div className="body-5 text-day absolute left-full top-[-12px] rounded-full p-[1px] bg-gradient-108 from-[#057382] to-[#66FFFF]">
        <div className="bg-night rounded-full px-[5px] leading-[12px]">
          Alpha
        </div>
      </div>
      <div className="absolute left-[164px] hidden sm:flex flex-row gap-2 items-center">
        <div className="text-white body-2 font-bold">/</div>
        <div className="text-day body-2 font-bold uppercase [text-shadow:0_0_6px_theme(colors.day)]">
          Challenges
        </div>
      </div>
    </Link>
  );
};

export const Header = () => {
  return (
    <HeaderImpl logo={<BeWaterLogo />} nav={<Nav />} user={<UserArea />} />
  );
};
