import { SignedIn, SignedOut } from "@clerk/nextjs";
import { SignedOutHome } from "./home/signed-out";
import { Dashboard } from "./home/dashboard";
export default async function Home() {
  return (
    <div className="container my-4 pt-20 flex flex-1 ">
      <SignedIn>
          <Dashboard />
      </SignedIn>
      <SignedOut>
        <SignedOutHome />
      </SignedOut>
    </div>
  );
}
