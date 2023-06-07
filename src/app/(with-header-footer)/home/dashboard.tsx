import Link from "next/link";

export function Dashboard() {
  return (
    <div className="w-full">
      <div className="w-full flex justify-between">
        <div>filters</div>
        <div>
          <Link href="/challenges/new" className="btn btn-primary">
            + Draft a new campaign
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-16">
        <div>
          <Link href="/challenges/63c82bd12ddc570f32ada869">Challenge 1</Link>
        </div>
        <div>right</div>
      </div>
    </div>
  );
}
