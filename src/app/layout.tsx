import "@/styles/index.css";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import { Metadata } from "next";
import { languages } from "./i18n/settings";
import { ClerkProvider } from "@clerk/nextjs";
import { Dumpster } from "./[lng]/dumpster";
import { Suspense } from "react";

import { Providers } from "@/lib/providers";


export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    icons: "/logo/favicon.png",
    title: "BeWater - I Build Therefore I Am",
    description:
      "BeWater is the ultimate builder community based on the SOP management system we built for open innovation campaigns including hackathon, design contest, demo day and more. It serves cutting-edge fields and also connects traditional industries. BeWater engages builders with different skill sets to build a better future together.",
  };
}

const fontPrimary = localFont({
  src: [
    {
      path: "../font/BasementGrotesque-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../font/BasementGrotesque-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../font/BasementGrotesque-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-primary",
});

const fontSecondary = JetBrains_Mono({
  variable: "--font-secondary",
  subsets: ["latin"],
  weight: "variable",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      dynamic
      clerkJSUrl={process.env.NEXT_PUBLIC_CLERK_JS_URL as string}
    >
      
        <html className={`${fontSecondary.variable} ${fontPrimary.variable}`}>
          <head />
          <body>
            <Providers>
              <div className="min-h-[100vh] flex flex-col bg-night">
                <div className="flex-1">
                  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
                </div>
                <Dumpster />
              </div>
            </Providers>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-1FYW2MFVEG"
              async
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1FYW2MFVEG');
              `}
            </Script>
            <Script id="prevent-iframe" strategy="afterInteractive">
              {`
              if (window.top != window.self) {
                window.top.location = window.self.location;
              }
              `}
            </Script>
          </body>
        </html>
    </ClerkProvider>
  );
}
