import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Callout } from "@/components/callout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <Callout />
      {children}
      {/* <Footer lng={"en"} fullWidth /> */}
    </div>
  );
}
