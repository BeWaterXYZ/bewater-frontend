import { Header } from '@/components/header';

export default function RootLayout({
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
    </div>
  );
}
