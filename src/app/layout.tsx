import "./globals.css";
import { JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryProvider } from "./query";
import { Dumpster } from "./dumpster";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-secondary",
  subsets: ["latin"],
  weight: "variable",
});

export const metadata = {
  title: "BeWater Host website",
  description: "BeWater Host website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <html lang="en">
          <body className={jetBrainsMono.className}>
           {children}
           <Dumpster />

          </body>
        </html>
      </QueryProvider>
    </ClerkProvider>
  );
}
