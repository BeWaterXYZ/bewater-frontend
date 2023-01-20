import { Header } from '@/components/header';
import '../styles/index.css';
import { Dumpster } from './dumpster';
import { QueryProvider } from './query';
import { JetBrains_Mono } from '@next/font/google';
import localFont from '@next/font/local';
import { Footer } from '@/components/footer';
import Script from 'next/script';

const fontPrimary = localFont({
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

  variable: '--font-primary',
});
const fontSecondary = JetBrains_Mono({
  variable: '--font-secondary',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontSecondary.variable} ${fontPrimary.variable}`}
    >
      <head />
      <body>
        <QueryProvider>
          <div className="min-h-[100vh] flex flex-col bg-night">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
            <Dumpster />
          </div>
        </QueryProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-60J539690M"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
         
           gtag('config', 'G-60J539690M');
        `}
        </Script>
      </body>
    </html>
  );
}
