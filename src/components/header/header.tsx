import Link from 'next/link';
import { Nav } from './nav';
import dynamic from 'next/dynamic';
import { HeaderScrollHelper } from './scroll-helper';
import Image from 'next/image';

interface HeaderImplProps {
  logo: React.ReactNode;
  nav: React.ReactNode;
  user: React.ReactNode;
}

const UserArea = dynamic(() => import('./user'), {
  ssr: false,
});

export const HeaderImpl = ({ logo, nav, user }: HeaderImplProps) => {
  return (
    <header
      id="main-header"
      className="fixed z-10 min-h-[72px] top-0 left-0 right-0 text-black w-full flex flex-shrink-0 justify-center items-center"
    >
      <div className=" flex items-center justify-between container flex-wrap">
        <div className="w-1/2 order-1 md:w-1/5 flex justify-start">{logo}</div>
        <div className="w-full order-3 md:order-2 md:w-3/5 flex justify-center ">
          {nav}
        </div>
        <div className="w-1/2  order-2 md:order-3 md:w-1/5 flex justify-end">
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
        src="/logo/bewater_black.svg"
        width={140}
        height={40}
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
