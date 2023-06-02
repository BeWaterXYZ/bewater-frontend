import { UserButton } from "@clerk/nextjs";
export default async function Home() {
  return (
    <main className="">
      <UserButton afterSignOutUrl="/" />
    </main>
  );
}