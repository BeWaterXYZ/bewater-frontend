import { Header } from "./header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <p className="body-1 p-8">Organization Settings</p>
      <Header />
      <div className="p-8">{children}</div>
    </div>
  );
}
