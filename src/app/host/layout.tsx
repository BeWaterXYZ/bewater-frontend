import { Header } from '@/components/header';

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
    </div>
  );
}
