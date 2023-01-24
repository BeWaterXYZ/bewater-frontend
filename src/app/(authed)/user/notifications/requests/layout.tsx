import Link from 'next/link';
import { Nav } from './nav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>
        <Nav />
      </div>
      <div>{children}</div>
    </div>
  );
}
