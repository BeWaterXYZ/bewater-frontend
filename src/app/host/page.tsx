import { Dashboard } from "./dashboard";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import SignIn from "./signup";

export default function Page() {
  return (
    <div className="container my-4 pt-20 flex flex-1 ">
      <SignedIn>
        <Dashboard />
      </SignedIn>
      <SignedOut>
        <SignIn />
      </SignedOut>
    </div>
  );
}
