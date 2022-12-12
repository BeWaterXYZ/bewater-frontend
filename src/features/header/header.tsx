import dynamic from 'next/dynamic';
import Link from 'next/link';

import Logo from '@/components/logos/bewater_black.svg';

import { Nav } from './nav';
import { nav } from './linkts';

const UserArea = dynamic(() => import('./user'), {
  ssr: false,
});

interface HeaderImplProps {
  logo: React.ReactNode;
  nav: React.ReactNode;
  user: React.ReactNode;
}

export const HeaderImpl = ({ logo, nav, user }: HeaderImplProps) => {
  return (
    <div className="sticky min-h-[80px] top-0 left-0 right-0 text-black   w-full  flex  flex-shrink-0 justify-center items-center border-titanium  border-solid">
      <div className=" flex items-center justify-between container flex-wrap">
        <div className="w-1/2 order-1 md:w-1/5 flex justify-start">{logo}</div>
        <div className="w-full order-3 md:order-2 md:w-3/5 flex justify-center ">
          {nav}
        </div>
        <div className="w-1/2  order-2 md:oirder-3 md:w-1/5 flex justify-end">
          {user}
        </div>
      </div>
    </div>
  );
};

const BeWaterLogo = () => {
  return (
    <Link href="/">
      <a>
        <Logo className="object-contain shrink-0 cursor-pointer " />
      </a>
    </Link>
  );
};

export const Header = () => {
  return (
    <HeaderImpl
      logo={<BeWaterLogo />}
      nav={<Nav items={nav} />}
      user={<UserArea />}
    />
  );
};
