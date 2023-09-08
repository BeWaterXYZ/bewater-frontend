import { Header } from '@/components/header';
import { Dumpster } from '../[lng]/dumpster';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lng = "";
  return (
    <div>
      <Header lng={lng} />
      <div>{children}</div>
      <Dumpster />
    </div>
  );
}
