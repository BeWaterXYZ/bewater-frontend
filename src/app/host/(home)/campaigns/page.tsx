import { Dashboard } from "./dashboard";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import SignIn from "../../signup";

export default function Page() {
  return (
    <div className="font-secondary w-[856px] my-[72px] mx-auto">
      <Dashboard />
    </div>
  );
}
