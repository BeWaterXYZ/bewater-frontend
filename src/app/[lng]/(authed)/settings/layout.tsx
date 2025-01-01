import { Nav } from "./nav";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  const { lng = "en" } = params || {};
  return (
    <div className="h-full container">
      <p className="body-1 border-b border-b-white/20 py-4">Account Settings</p>
      <div className="w-full inline-flex gap-8 flex-col lg:flex-row  ">
        <div className="w-full lg:w-[240px] lg:border-r  border-r-white/20 pr-0 lg:pr-8  pt-8 ">
          <Nav lng={lng} />
        </div>
        <div className="w-full lg:w-auto lg:flex-1 ">{children}</div>
      </div>
    </div>
  );
}
