import '@/styles/index.css';
import { QueryProvider } from './[lng]/query';
import { JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import Script from 'next/script';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Dumpster } from './[lng]/dumpster';
import { Metadata } from 'next';
import { dir } from 'i18next';
import { languages } from './i18n/settings';
import { ClerkProvider } from '@clerk/nextjs';
export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    icons: '/icons/favicon.png',
    title: 'BeWater - I Build Therefore I Am',
    description:
      'BeWater is the ultimate builder community based on the SOP management system we built for open innovation campaigns including hackathon, design contest, demo day and more. It serves cutting-edge fields and also connects traditional industries. BeWater engages builders with different skill sets to build a better future together.',
  };
}

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
  weight: 'variable',
});

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  const { lng = 'en' } = params || {};
  return (
    <ClerkProvider>
      <html
        lang={lng}
        dir={dir(lng)}
        className={`${fontSecondary.variable} ${fontPrimary.variable}`}
      >
        <head />
        <body>
          <QueryProvider>
            <div className="min-h-[100vh] flex flex-col bg-night">
              <Header lng={lng} />
              <div className="flex-1">{children}</div>
              <Footer />
              <Dumpster lng={lng} />
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
    </ClerkProvider>
  );
}
