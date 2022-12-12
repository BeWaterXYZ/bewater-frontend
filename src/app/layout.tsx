import { Footer } from '@/features/footer';
import { Header } from '@/features/header';
import '../styles/index.css';
import { Dumpster } from './dumpster';
import { QueryProvider } from './query';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <QueryProvider>
          <div className="h-[100vh] flex flex-col bg-night">
            <Header />
            <div className="flex-1 ">{children}</div>
            <Footer />
            <Dumpster />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
