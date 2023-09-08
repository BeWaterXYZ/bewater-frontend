import { Header } from '@/components/header';
import { Dumpster } from './dumpster';

export default async function RootLayout({
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
      <Dumpster />
    </div>
  );
}
