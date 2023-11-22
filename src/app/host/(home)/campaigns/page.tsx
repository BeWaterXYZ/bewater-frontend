import { Dashboard } from "./dashboard";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import SignIn from "../../signup";

export default function Page() {
  return (
    <div className="container my-4 pt-8 flex flex-1 ">
       <Dashboard />
    </div>
  );
}
