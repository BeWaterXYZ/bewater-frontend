import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Dumpster } from '../dumpster';

export default function WithHeaderFooterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[100vh] flex flex-col bg-night">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
      <Dumpster />
    </div>
  );
}
