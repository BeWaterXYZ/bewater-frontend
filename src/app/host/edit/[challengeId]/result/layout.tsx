import { segmentSchema } from "@/app/host/segment-params";
import { getChallengeTProjects } from "@/services/project";
import { CaretRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

let icon1 = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="none"
    viewBox="0 0 32 32"
  >
    <path
      fill="url(#paint0_linear_5465_158064)"
      d="M13.114 2.712c.15.051.297.112.44.182l1.71.842a1.667 1.667 0 001.472 0l1.71-.842a3.667 3.667 0 014.91 1.67l.097.216.084.222.614 1.805c.167.49.551.875 1.041 1.041l1.805.614a3.667 3.667 0 012.109 5.091l-.842 1.71a1.666 1.666 0 000 1.473l.842 1.71a3.667 3.667 0 01-2.109 5.091l-1.805.614c-.49.167-.874.551-1.04 1.041l-.615 1.805a3.667 3.667 0 01-5.09 2.109l-1.711-.842a1.666 1.666 0 00-1.473 0l-1.71.842a3.667 3.667 0 01-5.09-2.109l-.615-1.805a1.667 1.667 0 00-1.04-1.04l-1.806-.615a3.667 3.667 0 01-2.108-5.09l.842-1.711a1.667 1.667 0 000-1.473l-.842-1.71a3.667 3.667 0 012.108-5.09l1.805-.615c.49-.166.875-.55 1.041-1.04l.614-1.806a3.667 3.667 0 014.652-2.29zm7.512 9.247L13.4 19.185l-2.632-3.159a1 1 0 10-1.537 1.28l3.334 4a1 1 0 001.475.067l8-8a1 1 0 00-1.414-1.414z"
    ></path>
    <defs>
      <linearGradient
        id="paint0_linear_5465_158064"
        x1="-9.551"
        x2="16.136"
        y1="16.136"
        y2="41.824"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FBDA61"></stop>
        <stop offset="1" stopColor="#F76B1C"></stop>
      </linearGradient>
    </defs>
  </svg>
);

let icon2 = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="none"
    viewBox="0 0 32 32"
  >
    <path
      fill="url(#paint0_linear_5465_158047)"
      d="M8 6H6.994a3 3 0 00-3 3v2a5.005 5.005 0 004.243 4.942A8.007 8.007 0 0015 21.938V24h-3a4 4 0 00-4 4v1.007a1 1 0 001 1h14a1 1 0 001-1V28a4 4 0 00-4-4h-3v-2.062a8.008 8.008 0 006.763-5.996A5.002 5.002 0 0028 11V9a3 3 0 00-3-3h-1a4 4 0 00-4-4h-8a4 4 0 00-4 4zm16 2h1a1 1 0 011 1v2a3.002 3.002 0 01-2 2.829V8zM8 8v5.83A3.004 3.004 0 015.994 11V9a1 1 0 011-1H8z"
    ></path>
    <defs>
      <linearGradient
        id="paint0_linear_5465_158047"
        x1="-7.629"
        x2="19.172"
        y1="15.56"
        y2="38.533"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#A1FF8B"></stop>
        <stop offset="1" stopColor="#3F93FF"></stop>
      </linearGradient>
    </defs>
  </svg>
);

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const { challengeId } = segmentSchema.challengeId.parse(params);
  const projects = await getChallengeTProjects(challengeId);
  return (
    <div className="container my-8">
      <div className="flex gap-4">
        <Link
          className="flex-1"
          href={`/host/edit/${challengeId}/result/shortlist`}
        >
          <div className="h-24 p-4 rounded flex items-center bg-gradient-to-b from-[#53514E] to-[#131928]">
            <div className="mb-5 mr-4">{icon1}</div>
            <div className="mr-4 flex-1">
              <p className="body-1 font-bold mb-1">Shortlist</p>
              <p className="font-secondary text-xs text-[#94A3B8] h-8">
                Shortlisted projects and participate in the judges’ scoring
              </p>
            </div>
            <div className="font-secondary text-sm text-[#CBD5E1] whitespace-nowrap">
              {projects.length > 0 ? `${projects.length} Projects` : "Edit"}
            </div>
            <div className="scale-[1.333]">
              <CaretRightIcon className="text-white/30" />
            </div>
          </div>
        </Link>
        <Link
          className="flex-1"
          href={`/host/edit/${challengeId}/result/final`}
        >
          <div className="h-24 p-4 rounded bg-gradient-to-b from-[#3C576A] to-[#131628] flex items-center">
            <div className="mb-5 mr-4">{icon2}</div>
            <div className="mr-4 flex-1">
              <p className="body-1 font-bold mb-1">Final Result</p>
              <p className="font-secondary text-xs text-[#94A3B8] h-8">
                The projects that finally won the competition prize
              </p>
            </div>
            <div className="font-secondary text-sm text-[#CBD5E1] whitespace-nowrap">
              Edit
            </div>
            <div className="scale-[1.333]">
              <CaretRightIcon className="text-white/30" />
            </div>
          </div>
        </Link>
      </div>
      {children}
    </div>
  );
}
