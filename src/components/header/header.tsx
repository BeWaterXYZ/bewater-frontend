import { BeWaterLogo } from './logo'
import { Nav } from './nav';
import { Lng } from './lng';
import dynamicLoad from 'next/dynamic';
import { HeaderScrollHelper } from './scroll-helper';

interface HeaderImplProps {
  logo: React.ReactNode;
  nav: React.ReactNode;
  lang: React.ReactNode;
  user: React.ReactNode;
}

const UserArea = dynamicLoad(() => import('./user'), {
  ssr: false,
});

const HeaderImpl = ({ logo, nav, lang, user }: HeaderImplProps) => {
  return (
    <header
      id="main-header"
      className="fixed z-[11]  top-0 left-0 right-0 text-black w-full flex flex-shrink-0 justify-center items-center transition-colors"
    >
      <div className="flex items-center justify-between container flex-wrap">
        <div className="w-1/2 order-1 md:w-1/5 flex justify-start h-[72px] items-center">
          {logo}
        </div>
        <div className="w-1/2 order-2 md:order-3 md:w-auto flex justify-end h-[72px] items-center">
          {lang}
          {user}
        </div>
      </div>
      <HeaderScrollHelper />
    </header>
  );
};

export const Header = ({ lng }: { lng: string }) => {
  return (
    <HeaderImpl
      logo={<BeWaterLogo lng={lng} />}
      nav={<Nav />}
      lang={<Lng lng={lng} />}
      user={<UserArea lng={lng} />}
    />
  );
};
