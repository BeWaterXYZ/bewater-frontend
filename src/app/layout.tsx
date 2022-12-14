import { Footer } from '@/features/footer';
import { Header } from '@/features/header';
import '../styles/index.css';
import { Dumpster } from './dumpster';
import { QueryProvider } from './query';
import { Space_Grotesk, Space_Mono } from '@next/font/google';

const fontSans = Space_Grotesk({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});
const fontSerif = Space_Mono({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontSerif.variable}`}>
      <head />
      <body>
        <QueryProvider>
          <div className="min-h-[100vh] flex flex-col bg-night">
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
