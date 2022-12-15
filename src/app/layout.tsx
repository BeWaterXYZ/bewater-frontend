import { Header } from '@/components/header';
import '../styles/index.css';
import { Dumpster } from './dumpster';
import { QueryProvider } from './query';
import { JetBrains_Mono } from '@next/font/google';
import localFont from '@next/font/local';
import { Footer } from '@/components/footer';

const fontSans = JetBrains_Mono({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});
const fontSerif = localFont({
  src: [
    {
      path: '../font/BasementGrotesque-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../font/BasementGrotesque-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../font/BasementGrotesque-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],

  variable: '--font-serif',
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
