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
      className="fixed z-10  top-0 left-0 right-0 text-black w-full flex flex-shrink-0 justify-center items-center"
    >
      <div className=" flex items-center justify-between container flex-wrap">
        <div className="w-1/2 order-1 md:w-1/5 flex justify-start h-16 items-center">
          {logo}
        </div>
        <div className="w-full order-3 md:order-2 md:w-3/5 flex justify-center ">
          {nav}
        </div>
        <div className="w-1/2  order-2 md:order-3 md:w-1/5 flex justify-end h-16 items-center">
          {user}
        </div>
      </div>
      <HeaderScrollHelper />
    </header>
  );
};

const BeWaterLogo = () => {
  return (
    <Link href="/">
      <Image
        src="/logo/bewater-h.svg"
        width={120}
        height={24}
        alt="bewater logo"
      />
    </Link>
  );
};

export const Header = () => {
  return (
    <HeaderImpl logo={<BeWaterLogo />} nav={<Nav />} user={<UserArea />} />
  );
};
