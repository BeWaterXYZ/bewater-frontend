import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lng = "";
  return (
    <div>
      <Header lng={lng} />
      <div>{children}</div>
      <Footer lng={"en"} />
    </div>
  );
}
