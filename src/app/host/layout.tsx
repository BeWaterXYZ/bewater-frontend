import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" ">
      {children}
      {/* <Footer lng={"en"} fullWidth /> */}
    </div>
  );
}
