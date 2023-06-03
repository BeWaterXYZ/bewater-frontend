import { Nav } from './nav';

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  let { lng = 'en' } = params || {};
  return (
    <div className="h-full container">
      <p className="heading-6 border-b border-b-white/20 py-4 mb-8">
        Notification Center
      </p>

      <div className="flex gap-6 flex-wrap  ">
        <div className="w-full lg:w-[270px] lg:border-r  border-r-white/20 pr-0 lg:pr-8  sticky top-[86px] ">
          <Nav lng={lng} />
        </div>
        <div className="w-full lg:w-auto lg:flex-1 ">{children}</div>
      </div>
    </div>
  );
}
