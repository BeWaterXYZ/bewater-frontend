import Link from 'next/link';
import { Nav } from './nav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="sticky top-[135px] lg:top-[72px]">
        <Nav />
      </div>
      <div>{children}</div>
    </div>
  );
}
