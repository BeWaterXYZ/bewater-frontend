import { UserButton, useUser ,currentUser} from "@clerk/nextjs";
export default async function Home() {
  const user = await currentUser();
  console.log(user);
  return (
    <main className="">
      <UserButton afterSignOutUrl="/" />
    </main>
  );
}
