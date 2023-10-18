import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Sidebar } from './sidebar';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-80px)] grid grid-cols-[200px,_1fr] gap-4">
      <Sidebar />
      <div>{children}</div>
    </div>
  );
}
