import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[100vh] flex flex-col bg-night">
      <Header />
      <div className="flex-1 flex flex-col"> {children}</div>
      <Footer />
    </div>
  );
}
