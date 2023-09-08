import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  const { lng = 'en' } = params || {};
  return (
    <div>
      <Header lng={lng} />
      <div>{children}</div>
      <Footer lng={lng} />
    </div>
  );
}
