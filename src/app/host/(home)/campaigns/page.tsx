import { Dashboard } from "./dashboard";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import SignIn from "../../signup";

export default function Page() {
  return (
    <div className="font-secondary my-[72px] flex justify-center">
      <Dashboard />
    </div>
  );
}
