import "./globals.css";
import { JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

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
      <html lang="en">
        <body className={jetBrainsMono.className}>
          <div className="min-h-[100vh] flex flex-col bg-night">
            <Header />
            <div className="flex-1 flex flex-col"> {children}</div>
            <Footer />

          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
