"use client";
import { UserButton } from "@clerk/nextjs";

export default function UserArea() {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
