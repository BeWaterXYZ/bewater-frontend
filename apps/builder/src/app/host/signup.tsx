import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';
import { dark } from '@clerk/themes';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="container my-4 pt-20 flex flex-col lg:flex-row justify-center items-center min-h-[100vh] gap-10 md:gap-20 ">
      <div>
        <div className="flex flex-col gap-10 ">
          <p className="text-xl font-bold text-day">
            Want to host something wonderful on BeWater?
          </p>
          <Link className="group relative flex" href="/sign-up">
            {/* 2 row 2 col grid */}
            <div className="w-full grid grid-cols-2 grid-rows-2 gap-3">
              <div className="flex items-center gap-3  py-4 bg-white/[0.05] border-[0.5px] border-white/10 rounded-[4px] justify-center">
                <Image
                  src="/assets/hackathon.png"
                  width={64}
                  height={64}
                  alt="hackathon"
                />
                <p className="text-white/50 text-base font-bold">Hackathon</p>
              </div>
              <div className="flex items-center gap-3 py-4 bg-white/[0.05] border-[0.5px] border-white/10 rounded-[4px] justify-center">
                <Image
                  src="/assets/demoday.png"
                  width={64}
                  height={64}
                  alt="demoday"
                />
                <p className="text-white/50 text-base font-bold">Demoday</p>
              </div>
              <div className="flex items-center gap-3  py-4 bg-white/[0.05] border-[0.5px] border-white/10 rounded-[4px] justify-center">
                <Image
                  src="/assets/workshop.png"
                  width={64}
                  height={64}
                  alt="workshop"
                />
                <p className="text-white/50 text-base font-bold">Workshop</p>
              </div>
              <div className="flex items-center gap-3  py-4 bg-white/[0.05] border-[0.5px] border-white/10 rounded-[4px] justify-center">
                <Image
                  src="/assets/other.png"
                  width={64}
                  height={64}
                  alt="other"
                />
                <p className="text-white/50 text-base font-bold">Others</p>
              </div>
            </div>
            <div className="absolute flex opacity-0 items-center justify-center z-10 w-full h-full rounded-[4px] bg-white/5 text-4xl backdrop-blur-sm group-hover:opacity-100 transition-opacity ease-out duration-300 text-day [text-shadow:0_0_6px_theme(colors.day)] uppercase">
              Sign up now
            </div>
          </Link>
        </div>
      </div>
      {/* responsive divider, vertical when wide screenm horizontal when small screen */}
      <div className="w-full h-px lg:w-px lg:h-[276px] bg-gray-800"></div>
      <Link href="/sign-up" className=" btn btn-primary ">
        Sign Up Now
      </Link>
    </div>
  );
}
