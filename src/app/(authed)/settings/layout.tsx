import { Nav } from './nav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full container">
      <p className="body-1 border-b border-b-white/20 py-4">Account Setting</p>

      <div className="flex gap-8 flex-wrap  ">
        <div className="w-full lg:w-[240px] lg:border-r  border-r-white/20 pr-0 lg:pr-8  pt-8 ">
          <Nav />
        </div>
        <div className="w-full lg:w-auto lg:flex-1 ">{children}</div>
      </div>
    </div>
  );
}
