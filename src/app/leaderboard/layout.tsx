import { Footer } from "@/components/footer";
import Header from "./header";

export default function Leaderboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-[960px] font-secondary">
      <Header />
      {children}
      <Footer lng="en" />
    </div>
  );
}
