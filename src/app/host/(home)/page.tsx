"use client";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Summary from "./summary";

export default function Page() {
  let { user } = useUser();
  let isAdmin = user?.publicMetadata?.teamMember ?? false;
  return isAdmin ? (
    <Summary />
  ) : (
    <>
      <div className="container my-4 pt-20">
        <p className="heading-1">Summary</p>
        <Link href="/host/campaigns/new" className="btn btn-primary">
          + Draft a new campaign
        </Link>
      </div>
    </>
  );
}
