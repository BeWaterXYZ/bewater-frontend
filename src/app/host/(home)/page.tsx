import Link from "next/link";

export default function Page() {
  return (
    <div className="container my-4 pt-20  ">
      <p className="heading-1">Summary</p>
      <Link href="/host/campaigns/new" className="btn btn-primary">
        + Draft a new campaign
      </Link>
    </div>
  );
}
