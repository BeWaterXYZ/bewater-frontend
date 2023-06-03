import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
export default async function Home() {
  return (
    <main className="">
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        go to <Link href="/dashboard">dashboard</Link>
      </SignedOut>
    </main>
  );
}
