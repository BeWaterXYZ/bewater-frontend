import Image from "next/image";
import Link from "next/link";

export function SignedOutHome() {
  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="flex flex-col md:flex-row m-auto gap-8">
        <div>
          <Image
            src="/assets/host-something.png"
            width={430}
            height={313}
            alt="host something"
          />
        </div>
        <div className="flex items-center">
          <Link href="/sign-in" className="btn btn-primary w-64 h-12">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
