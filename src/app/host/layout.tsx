import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SignIn, SignedIn, SignedOut } from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedIn>
        <div className=" ">
          {children}
          <Footer lng={"en"} />
        </div>
      </SignedIn>
      <SignedOut>
        <SignIn />
      </SignedOut>
    </>
  );
}
