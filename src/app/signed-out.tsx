import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

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

        <SignIn />
      </div>
    </div>
  );
}
