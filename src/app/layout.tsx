import '../styles/index.css';
import { QueryProvider } from './query';
import { JetBrains_Mono, Manrope } from '@next/font/google';
import localFont from '@next/font/local';
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
const fontThird = Manrope({
  variable: '--font-third',
  subsets: ['latin'],
  weight: ['400'],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontSecondary.variable} ${fontPrimary.variable} ${fontThird.variable}`}
    >
      <head />
      <body>
        <QueryProvider>{children}</QueryProvider>
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
