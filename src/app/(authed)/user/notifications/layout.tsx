import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full container">
      <p className="heading-6 border-b border-b-white/20 py-4 mb-8">
        Notification Center
      </p>

      <div className="flex gap-6 flex-wrap  ">
        <div className="w-full lg:w-[240px] lg:border-r  border-r-white/20 pr-0 lg:pr-8  sticky top-[86px] ">
          <nav className=" w-full  lg:sticky  lg:top-[72px] ">
            <Link
              href="/user/notifications/requests/received"
              className="body-3 p-4 bg-[#0F172A] inline-block w-full"
            >
              Invitation & Application
            </Link>
          </nav>
        </div>
        <div className="w-full lg:w-auto lg:flex-1 ">{children}</div>
      </div>
    </div>
  );
}
