import Link from 'next/link';

import Logo from '@/components/logos/bewater_black.svg';

import { Nav } from './nav';
import dynamic from 'next/dynamic';
import { HeaderScrollHelper } from './scroll-helper';

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
      className="fixed z-10  min-h-[80px] top-0 left-0 right-0 text-black   w-full  flex  flex-shrink-0 justify-center items-center"
    >
      <div className=" flex items-center justify-between container flex-wrap">
        <div className="w-1/2 order-1 md:w-1/5 flex justify-start">{logo}</div>
        <div className="w-full order-3 md:order-2 md:w-3/5 flex justify-center ">
          {nav}
        </div>
        <div className="w-1/2  order-2 md:oirder-3 md:w-1/5 flex justify-end">
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
      <Logo className="object-contain shrink-0 cursor-pointer " />
    </Link>
  );
};

export const Header = () => {
  return (
    <HeaderImpl logo={<BeWaterLogo />} nav={<Nav />} user={<UserArea />} />
  );
};
