import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full container">
      <p className="heading-6 border-b border-b-white/20 py-4 mb-8">
        Notification Center
      </p>

      <div className="flex gap-6 flex-wrap">
        <div className="flex-1 lg:border-r  border-r-white/20 pr-8">
          <nav className=" h-full w-full  ">
            <Link
              href="/user/notifications/requests/received"
              className="body-3 p-4 bg-[#0F172A] inline-block w-full"
            >
              Invitation & Application
            </Link>
          </nav>
        </div>
        <div className="flex-1 lg:flex-[3]">{children}</div>
      </div>
    </div>
  );
}
